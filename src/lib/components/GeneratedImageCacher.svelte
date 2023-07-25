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

        // @TODO find out whether this can be in <svelte:head>
        // @TODO check for the style element and delete it if already present
        const style = document.createElement('style');
        style.id = `generated-style-node-${desc.name}`;

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
        console.log(css);
        style.innerHTML = css;

        document.head.appendChild(style);
      });
    }
  });
</script>

<div class="offscreen">
  <slot />

  <canvas bind:this={canvas} />
</div>

<style lang="postcss">
  .offscreen {
    position: fixed;
    height: 80vh;
    width: 80vh;
    top: -100vh;
  }
</style>
