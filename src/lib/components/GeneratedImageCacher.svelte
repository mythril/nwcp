<script lang="ts">
  import { onMount } from 'svelte';
  import { version } from '$app/environment';

  let canvas: HTMLCanvasElement;

  export let cacheDescriptors: {
    name: string;
    width: number;
    height: number;
  }[];

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
        let resp = new Response(blob, { status: 200, statusText: 'OK' });
        await cache.put(rq, resp);

        //sketch, but no other solution was working
        window.location.reload();
      });
    }
  });
</script>

<div class="offscreen">
  <slot />

  <canvas bind:this={canvas} />
</div>

<style lang="scss">
  .offscreen {
    position: fixed;
    height: 80vh;
    width: 80vh;
    top: -100vh;
  }
</style>
