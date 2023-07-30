<script lang="ts">
  import '../app.postcss';
  import GeneratedImageCacher from '$lib/components/GeneratedImageCacher.svelte';
  import { onMount } from 'svelte';
  import Portal from '$lib/components/Portal.svelte';
  import { modalShown } from './chosen-one/stores';

  const cacheDescriptors = [
    {
      name: 'worn-text',
      width: 250,
      height: 75,
      applyToProperties: ['mask-image', '-webkit-mask-image']
    }
  ];

  let planner: HTMLDivElement;
  let devicePixelRatio: number;
  let oldRatio: number;
  let hidden = true;

  let canvas: HTMLCanvasElement;

  function renderOverLay() {
    if (!canvas) {
      return;
    }
    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.filter = 'url(#variance)';
    ctx.beginPath();
    ctx.moveTo(-100, -100);
    ctx.lineTo(-50, -50);
    ctx.stroke();
    ctx.filter = 'url(#grain)';
    ctx.beginPath();
    ctx.moveTo(-100, -100);
    ctx.lineTo(-50, -50);
    ctx.stroke();
  }

  $: {
    if (devicePixelRatio !== oldRatio) {
      oldRatio = devicePixelRatio;
    } else {
      renderOverLay();
    }
  }

  onMount(() => {
    oldRatio = devicePixelRatio;
    renderOverLay();

    // This allows zooming to happen by freezing the font-size
    setTimeout(() => {
      let cfs = getComputedStyle(document.documentElement).fontSize;
      document.documentElement.style.fontSize = cfs;
      document.documentElement.style.setProperty(
        '--rem-ratio',
        cfs.replace('px', '')
      );
    }, 1);
  });
</script>

<svelte:window
  bind:devicePixelRatio
  on:load={() => (hidden = false)}
/>

<div id="modals" />
<div class="app">
  <div
    id="planner"
    bind:this={planner}
    {hidden}
    inert={$modalShown}
  >
    <div class="page">
      <slot />
    </div>
  </div>
</div>

<Portal target=".app">
  <div class="overlay">
    <canvas bind:this={canvas} />
  </div>
</Portal>

<GeneratedImageCacher {cacheDescriptors}>
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
</GeneratedImageCacher>

<style lang="postcss">
  #modals {
    font-family: var(--terminal-font);
  }
  .app {
    font-family: var(--terminal-font);
    background-color: hsl(var(--bg));
    /* filter: brightness(1.3); */
    position: relative;
    width: fit-content;
    min-width: 100vw;
    height: fit-content;
    min-height: 100vh;
  }

  #planner {
    font-family: var(--terminal-font);
    font-size: 10rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    position: relative;
    background-color: hsl(var(--bg));
    border: 0;
    margin: 0 auto;
    width: fit-content;
    min-height: 100vh;
  }

  .page {
    /* this maintains an aspect ratio similar to the original game */
    width: 855rem;
    min-width: 855rem;
    height: 641.25rem;
    min-height: 641.25rem;

    position: relative;
  }

  .overlay {
    position: absolute;
    z-index: 4;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    mix-blend-mode: overlay;
    canvas {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
