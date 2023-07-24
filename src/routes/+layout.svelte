<script lang="ts">
  import '../lib/scss/_global.scss';
  import GeneratedImageCacher from '$lib/components/GeneratedImageCacher.svelte';
  import { onMount } from 'svelte';

  const cacheDescriptors = [
    {
      name: 'worn-text',
      width: 250,
      height: 75,
      applyToProperties: ['mask-image', '-webkit-mask-image']
    }
  ];

  let innerWidth: number;
  let innerHeight: number;
  let planner: HTMLDivElement;
  let width: number;
  let height: number;
  let dom: HTMLHtmlElement;

  let canvas: HTMLCanvasElement;

  function originalFontSizeScaled(width: number) {
    // @TODO re-balance around 640x480 at some time (width / 64)
    // also requires redefinition of scss px() function
    return width / 85;
  }

  function renderOverLay() {
    if (!canvas) {
      return;
    }
    canvas.width = innerWidth;
    canvas.height = innerHeight;
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
    renderOverLay();
    if (planner) {
      let maxWidth = Math.max(innerWidth, 640);
      let maxHeight = Math.max(innerHeight, 480);

      // maintains the aspect ratio I desire for the "window"
      if (maxWidth * (4 / 5) > maxHeight) {
        width = maxHeight * 1.25;
        height = maxHeight;
      } else {
        width = maxWidth;
        height = maxWidth * (4 / 5);
      }
      planner.style.width = width + 'px';
      planner.style.height = height + 'px';

      if (!dom) {
        dom = document.querySelector('html') as HTMLHtmlElement;
      }

      if (dom) {
        // allows me to scale things with rems later on
        dom.style.setProperty(
          'font-size',
          originalFontSizeScaled(width) + 'px'
        );
      }
    }
  }

  onMount(renderOverLay);
</script>

<svelte:window
  bind:innerWidth
  bind:innerHeight
/>

<div
  class="planner"
  bind:this={planner}
>
  <div class="page">
    <slot />
  </div>
</div>

<div class="overlay">
  <canvas bind:this={canvas} />
</div>

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

<style lang="scss">
  .planner {
    font-family: terminal-font();
    display: flex;
    flex-flow: column;
    justify-content: center;
    position: relative;
    background-color: hsl(var(--bg));
    border: 0;
    margin: 0 auto;
  }
  .page {
    // this maintains an aspect ratio similar to the original game
    width: px(855);
    height: px(855 * 0.75);

    position: relative;
  }

  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    mix-blend-mode: multiply;
  }
  :root {
    --bg-hs: 40, 27.3%;
    --bg-l: 17.3%;
    --bg: var(--bg-hs), var(--bg-l);
    --title-color-hs: 48, 67.6%;
    --title-color-l: 29%;
    --title-color: var(--title-color-hs), var(--title-color-l);
    --title-bg-hs: 0, 0%;
    --title-bg-l: 22%;
    --title-bg: var(--title-bg-hs), var(--title-bg-l);
    --terminal-bg-hs: 100, 100%;
    --terminal-bg-l: 2.4%;
    --terminal-bg: var(--terminal-bg-hs), var(--terminal-bg-l);
    --terminal-color-hs: 105.5, 100%;
    --terminal-color-l: 48.6%;
    --terminal-color: var(--terminal-color-hs), var(--terminal-color-l);
    --terminal-selected-hs: 0, 0%;
    --terminal-selected-l: 62.7%;
    --terminal-selected: var(--terminal-selected-hs), var(--terminal-selected-l);
    --terminal-faded: #183018;
    --terminal-color-active: #fcfc7c;
    --terminal-selected-active: #fcfcfc;
    --terminal-faded-active: #707820;
  }
  :global(:root),
  :global(html),
  :global(body) {
    border: 0;
    margin: 0;
    padding: 0;
    background-color: hsl(var(--bg));
  }
</style>
