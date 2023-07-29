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
      ctx.filter = 'url()';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = desc.width;
      canvas.height = desc.height;

      const rq = new Request(`/generated/${desc.name}.png`);

      let found = await cache.match(rq);

      if (found !== undefined) {
        continue;
      }

      ctx.filter = `url(#${desc.name})`;
      ctx.fillRect(desc.width, desc.height, desc.width, desc.height);
      canvas.toBlob(async (blob) => {
        if (!blob) {
          return;
        }
        let resp = new Response(blob, { status: 200, statusText: 'OK' });
        await cache.put(rq, resp);

        if (!desc.applyToProperties) {
          return;
        }

        const dataURL = await blobToDataURL(blob);
        const css = `
        .${desc.name} {
          ${(() => {
            let result = '';
            for (let property of desc.applyToProperties) {
              result += `${property}: url('${dataURL}') !important;\n`;
            }
            return result;
          })()}
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

<style lang="postcss">
  .offscreen {
    position: fixed;
    height: 100vh;
    width: 100vh;
    top: -200vh;
  }
</style>
