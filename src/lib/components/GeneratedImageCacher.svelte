<script lang="ts">
  import { onMount } from 'svelte';
  import { version } from '$app/environment';
  import { blobToDataURL } from '$lib/utils';

  let canvas: HTMLCanvasElement;

  type CacheDescriptor = {
    name: string;
    width: number;
    height: number;
    applyToProperties: string[] | undefined;
  };

  export let cacheDescriptors: CacheDescriptor[];
  let styles: string[] = [];

  onMount(async () => {
    let cache = await window.caches.open('cache-' + version);

    let ctx = canvas.getContext('2d');
    if (ctx === null) {
      return;
    }

    for (const desc of cacheDescriptors) {
      const rq = new Request(`/generated/${desc.name}.png`);

      let found = await cache.match(rq);

      if (found !== undefined) {
        if ('serviceWorker' in navigator) {
          if (navigator.serviceWorker.controller) {
            if (!desc.applyToProperties || desc.applyToProperties.length < 1) {
              continue;
            }
            const generateRules = () => {
              if (!desc.applyToProperties) {
                return '';
              }
              let result = '';
              for (let property of desc.applyToProperties) {
                result += `${property}: url('/generated/${desc.name}.png');\n`;
              }
              return result;
            };
            const css = `
            .${desc.name} {
              ${generateRules()}
            }
            `;
            styles.push(css);
            styles = styles;
            continue;
          } else {
            // navigator.serviceWorker.controller is null after a hard refresh
            // which means that the attempt to load generated images will 404
            // so instead we treat it the same as a first load: render it,
            // stuff it in the cache it and use it as a data blob in the
            // generated css rule (see below)
          }
        }
      }

      ctx.filter = 'url()';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = desc.width;
      canvas.height = desc.height;

      // probably need to wrap this in a callback to allow generated images to
      // customize the results beyond drawing a svg filter to a canvas
      ctx.filter = `url(#${desc.name})`;
      ctx.fillRect(desc.width, desc.height, desc.width, desc.height);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          return;
        }
        let resp = new Response(blob, { status: 200, statusText: 'OK' });
        await cache.put(rq, resp);

        if (!desc.applyToProperties || desc.applyToProperties.length < 1) {
          return;
        }
        let generateRules = () => {
          if (!desc.applyToProperties) {
            return '';
          }
          let result = '';
          for (let property of desc.applyToProperties) {
            result += `${property}: url('${dataURL}');\n`;
          }
          return result;
        };
        const dataURL = await blobToDataURL(blob);
        const css = `
        .${desc.name} {
          ${generateRules()}
        }
        `;
        styles.push(css);
        styles = styles;
      });
    }
  });
</script>

<svelte:head>
  {#if styles.length > 0}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html `
      <style type="text/css">
        ${styles.join('\n')}
      </style>
    `}
  {/if}
</svelte:head>

<div class="offscreen">
  <slot />

  <canvas bind:this={canvas} />
</div>
