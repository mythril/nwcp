<script lang="ts">
  import { onMount } from 'svelte';
  import { version } from '$app/environment';

  let canvas: HTMLCanvasElement;
  const cacheDescriptors = [
    {
      name: 'worn-text',
      width: 250,
      height: 75
    },
  ];

  onMount(async () => {
    let cache = await window.caches.open('cache-' + version);

    let ctx = canvas.getContext('2d');
    if (ctx === null) {
        return;
      }

    for(const desc of cacheDescriptors) {
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
        cache.put(rq, new Response(blob, { status: 200, statusText: 'OK' }));
      });
    }
  });
</script>

<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="worn-text">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.09"
        numOctaves="6"
        stitchTiles="stitch"
        seed="1"
      />
      <feBlend
        in="SourceGraphic"
        in2="worn-text"
        mode="multiply"
      />
      <feMorphology
        operator="dilate"
        radius="1"
      />
      <feColorMatrix type="luminanceToAlpha" />
      <feComponentTransfer>
        <feFuncA
          type="table"
          tableValues="-50 0.5 1 -1"
        />
      </feComponentTransfer>
    </filter>
  </defs>
</svg>

<canvas bind:this={canvas} />
