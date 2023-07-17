/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope} */ /** @type {unknown} */ self;
declare var self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
  ...build, // the app itself
  ...files // everything in `static`
];

self.addEventListener('install', (event) => {
  // Create a new cache and add all files to it
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
  }

  event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
  // Remove previous cached data from disk
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key);
    }
  }

  event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
  async function orUnavailable(p: Promise<Response | undefined>) {
    let r = await p;
    if (r !== undefined) {
      return r;
    }
    return new Response('', { status: 503, statusText: 'Service Unavailable' });
  }

  const url = new URL(event.request.url);

  // ignore POST requests etc
  if (event.request.method !== 'GET') return;

  async function respond() {
    const cache = await caches.open(CACHE);

    // `build`/`files` can always be served from the cache
    if (ASSETS.includes(url.pathname)) {
      return orUnavailable(cache.match(url.pathname));
    }

    if (url.pathname.startsWith('/generated/')) {
      return orUnavailable(cache.match(url.pathname));
    }

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
