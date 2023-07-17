<script lang="ts">
  // import mask from '$lib/images/mask.svg';
  import { onMount } from 'svelte';
  import { version } from '$app/environment';

  let canvas: HTMLCanvasElement;
  // type Img = {
  //   img: HTMLImageElement;
  //   width: number;
  //   height: number;
  // };

  // async function loadImage(url: string): Promise<Img> {
  //   const img: Img = {
  //     img: new Image(),
  //     width: -1,
  //     height: -1
  //   };
  //   return new Promise((resolve, reject) => {
  //     img.img.onload = () => {
  //       try {
  //         document.body.appendChild(img.img);
  //         img.width = img.img.width;
  //         img.height = img.img.height;
  //         document.body.removeChild(img.img);
  //         resolve(img);
  //       } catch (e) {
  //         reject(e);
  //       }
  //     };
  //     img.img.src = url;
  //   });
  // }

  onMount(async () => {
    // let svg = await loadImage(mask);
    let cache = await window.caches.open('cache-' + version);
    canvas.width = 250;
    canvas.height = 75;
    let ctx = canvas.getContext('2d');
    if (ctx === null) {
      return;
    }

    const rq = new Request('/generated/worn-text.png');

    let found = await cache.match(rq);

    if (found !== undefined) {
      return;
    }
    
    ctx.filter = 'url(#worn-mask)';
    ctx.fillRect(250, 75, 250, 75);
    canvas.toBlob(async (blob) => {
      cache.put(
        rq,
        new Response(blob, {status:200, statusText: "OK"})
      );
    });
  });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 250 75"
>
  <defs>
    <filter id="worn-mask">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.09"
        numOctaves="6"
        stitchTiles="stitch"
        seed="1"
      />
      <feBlend
        in="SourceGraphic"
        in2="worn-mask"
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

<canvas
  bind:this={canvas}
/>

