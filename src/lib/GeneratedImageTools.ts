import { version } from '$app/environment';
import { blobToDataURL } from '$lib/utils';

let cache: Cache;

export const getCached = async (name: string) => {
  if (!cache) {
    cache = await window.caches.open('cache-' + version);
  }
  const rq = new Request(`/generated/${name}.png`);
  const found = await cache.match(rq);
  return found;
};

export const putCached = async (name: string, response: Response) => {
  if (!cache) {
    cache = await window.caches.open('cache-' + version);
  }
  const rq = new Request(`/generated/${name}.png`);
  return await cache.put(rq, response);
};

const generateRules = (properties: string[] | undefined, data: string) => {
  if (!properties) {
    return '';
  }
  let result = '';
  for (const property of properties) {
    result += `${property}: url('${data}');\n`;
  }
  return result;
};

export const generateCachedCSS = (
  name: string,
  properties: string[] | undefined
) => {
  return `.${name} {
    ${generateRules(properties, `/generated/${name}.png`)}
  }
  `;
};

export const generateDataUrlCSS = (
  name: string,
  properties: string[] | undefined,
  dataURL: string
) => {
  return `.${name} {
    ${generateRules(properties, dataURL)}  
  }
  `;
};

export const cacheCanvasSnapshotGetData = async (
  canvas: HTMLCanvasElement,
  name: string
) => {
  return await new Promise<string>((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(blob);
        return;
      }
      const resp = new Response(blob, { status: 200, statusText: 'OK' });
      putCached(name, resp);
      const dataUrl = await blobToDataURL(blob);
      resolve(dataUrl);
    });
  });
};

export const canRelyOnServiceWorker = () => {
  if (!('serviceWorker' in navigator)) {
    return false;
  }
  if (!navigator.serviceWorker.controller) {
    return false;
  }
  return true;
};
