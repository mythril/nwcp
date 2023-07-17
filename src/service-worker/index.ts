/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

console.log('loaded');

const sw = /** @type {ServiceWorkerGlobalScope} */ /** @type {unknown} */ self;
declare var self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';
// import { saveGenerated } from './saveGenerated';
// import { generateWearMaskImageBlob } from './wearMaskImage';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
  ...build, // the app itself
  ...files // everything in `static`
];

self.addEventListener('install', (event) => {
  console.log('install');
  // Create a new cache and add all files to it
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
  }

  event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
  console.log('activate');
  // Remove previous cached data from disk
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key);
    }
  }

  event.waitUntil(deleteOldCaches());
});

// async function generatedAssets(path: string): Promise<Response> {
//     switch(path) {
//         case "worn-text.png":
//             return new Response(await generateWearMaskImageBlob(), {status: 200, statusText: "OK"});
//     }
//     return new Response("", { status: 404, statusText: "Not found." });
// }

self.addEventListener('fetch', (event) => {
  console.log('fetch');
  async function orUnavailable(p: Promise<Response | undefined>) {
    let r = await p;
    if (r !== undefined) {
      return r;
    }
    return new Response('', { status: 503, statusText: 'Service Unavailable' });
  }

  const url = new URL(event.request.url);
  console.log(url);

  // ignore POST requests etc
  if (
    event.request.method !== 'GET' &&
    !(event.request.method === 'POST' && url.pathname.startsWith('/generated/'))
  )
    return;

  async function respond() {
    const cache = await caches.open(CACHE);

    // if (event.request.method === 'POST' && url.pathname.startsWith('/generated/')) {
    //     console.log('intercepted');
    //     const generated = await saveGenerated(event.request.clone(), url.pathname.slice(11));
    //     if (generated.status === 201) {
    //         cache.put(new Request(url, {method: "GET"}), generated.clone());
    //     }
    //     return generated;
    // }

    // `build`/`files` can always be served from the cache
    if (ASSETS.includes(url.pathname)) {
      return orUnavailable(cache.match(url.pathname));
    }

    if (url.pathname.startsWith('/generated/')) {
      console.log('/generated/ detected, loading:');
      console.log(url.toString());
      return orUnavailable(cache.match(url.pathname));
    }

    // if (url.pathname.startsWith("/generated/")) {
    //     const asset = await generatedAssets(url.pathname.slice(11));

    //     if (asset.status === 200) {
    //         cache.put(event.request, asset.clone());
    //     }

    //     return asset;
    // }

    // for everything else, try the network first, but
    // fall back to the cache if we're offline
    try {
      const response = await fetch(event.request.clone());

      if (response.status === 200) {
        cache.put(event.request.clone(), response.clone());
      }

      return response;
    } catch (e) {
      console.error(e);
      return orUnavailable(cache.match(event.request.clone()));
    }
  }

  event.respondWith(respond());
});
