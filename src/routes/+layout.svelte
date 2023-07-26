<script lang="ts">
  import '../app.postcss';
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
    // @TODO re-balance around 640x480 at some time
    return width / 855;
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

<style lang="postcss">
  .planner {
    font-family: var(--terminal-font);
    font-size: 10rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    position: relative;
    background-color: hsl(var(--bg));
    border: 0;
    margin: 0 auto;
  }

  .page {
    /* this maintains an aspect ratio similar to the original game */
    width: 855rem;
    height: 641.25rem;

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

  /* prettier-ignore */
  :root {
    /* colors (only) */
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
    --terminal-faded-hs: 120, 33.3%;
    --terminal-faded-l: 14.1%;
    --terminal-faded: var(--terminal-faded-hs), var(--terminal-faded-l);
    --terminal-color-active-hs: 60, 95.5%;
    --terminal-color-active-l: 73.7%;
    --terminal-color-active: var(--terminal-color-active-hs), var(--terminal-color-active-l);
    --terminal-selected-active-hs: 0, 0%;
    --terminal-selected-active-l: 98.8%;
    --terminal-selected-active: var(--terminal-selected-active-hs), var(--terminal-selected-active-l);
    --terminal-faded-active-hs: 65.5, 57.9%;
    --terminal-faded-active-l: 29.8%;
    --terminal-faded-active: var(--terminal-faded-active-hs), var(--terminal-faded-active-l);
  }

  /* prettier-ignore */
  :root {
    /* fonts (only) */
    --title-font: 'Lilita One', sans-serif;
    --terminal-font: 'Bruno Ace', sans-serif;
    --label-font: 'Saira Extra Condensed', sans-serif;
  }

  /* prettier-ignore */
  :root {
    /* named box-shadow segments (only) */
    --shadow-border-width: 1;
    --shadow-border-color: #000;
    --shadow-border:
      0 0 0 calc(var(--shadow-border-width) * 1rem) var(--shadow-border-color);
    --light-source:
      calc(-5 * 1rem) calc(5 * 1rem) calc(5 * 1rem) calc(-5 * 1rem) rgba(255, 255, 255, 0.7) inset,
      calc(5 * 1rem) calc(-5 * 1rem) calc(5 * 1rem) calc(-3 * 1rem) rgba(0, 0, 0, 0.5) inset;
    --sharp-light-source:
      calc(-2 * 1rem) calc(2 * 1rem) calc(2 * 1rem) calc(-1 * 1rem) rgba(255, 255, 255, 0.5) inset,
      calc(2 * 1rem) calc(-2 * 1rem) calc(2 * 1rem) 0 rgba(0, 0, 0, 0.9) inset;
    --light-source-clear:
      0 0 0 0 rgba(255, 255, 255, 0) inset,
      0 0 0 0 rgba(0, 0, 0, 0) inset;
    --sunken:
      calc(-5 * 1rem) calc(5 * 1rem) calc(5 * 1rem) rgba(0, 0, 0, 0.75) inset,
      calc(5 * 1rem) calc(-5 * 1rem) calc(5 * 1rem) rgba(0, 0, 0, 0.75) inset;
    --sunken-clear:
      0 0 0 rgba(0, 0, 0, 0) inset, 0 0 0 rgba(0, 0, 0, 0) inset;
    --cast-shadow:
      calc(-5 * 1rem) calc(5 * 1rem) calc(5 * 1rem) rgba(0, 0, 0, 0.75);
    --cast-shadow-clear:
      0 0 0 0 rgba(0, 0, 0, 0);
    --inset:
      calc(2 * 1rem) calc(-2 * 1rem) calc(2 * 1rem) calc(-1 * 1rem) rgba(0, 0, 0, 0.5),
      calc(-2 * 1rem) calc(2 * 1rem) calc(2 * 1rem) calc(-1 * 1rem) rgba(255, 255, 255, 0.5);
    --underbelly-shadow:
      0 calc(-4 * 1rem) calc(2 * 1rem) 0 rgba(0, 0, 0, 0.4) inset;
    --basic-box-shadow:
      calc(-4 * 1rem) calc(4 * 1rem) calc(2 * 1rem) calc(-3 * 1rem) rgba(255, 255, 255, 0.25) inset,
      calc(4 * 1rem) calc(-4 * 1rem) calc(5 * 1rem) calc(-5 * 1rem) rgba(0, 0, 0, 0.3) inset;
  }

  :global(:root),
  :global(html),
  :global(body) {
    border: 0;
    margin: 0;
    padding: 0;
    background-color: hsl(var(--bg));
  }

  :global(.terminal-font-defaults) {
    font-family: var(--terminal-font);
    line-height: 1.7;
    color: hsl(var(--terminal-color));
    font-weight: 700;
    text-rendering: geometricPrecision;
  }

  :global(.slate) {
    background-color: hsl(var(--bg));
    box-shadow: var(--basic-box-shadow);
  }

  :global(.checkbox-button) {
    appearance: none;
    transition: box-shadow 0.1s linear;
    margin: 1rem 9rem;
    padding: 0;
    box-sizing: border-box;
    background-color: #580000;
    /* @TODO figure this out */
    /* prettier-ignore */
    box-shadow: 
      -2rem 2rem 1rem -1rem rgba(255, 255, 255, 0.25) inset,
      1rem -1rem 1rem 0 rgba(0, 0, 0, 0.25) inset,
      -6rem -3rem 0 0 #2d2b25 inset,
      6rem 3rem 0 0 #2d2b25 inset,
      6rem -3rem 1rem 1rem rgba(255, 255, 255, 0.25) inset,
      0 0 0 1rem rgba(0, 0, 0, 0.25);
    width: 20rem;
    height: 12rem;
    border-radius: 3rem;
    border: 1rem solid #040c00;
    &:active {
      background-color: #fc3030;
      /* prettier-ignore */
      box-shadow: 
        0 0 1rem -1rem rgba(255, 255, 255, 0.25) inset,
        1rem -1rem 1rem 0 rgba(0, 0, 0, 0.25) inset,
        -6rem -3rem 0 0 #2d2b25 inset,
        6rem 3rem 0 0 #2d2b25 inset,
        6rem -3rem 1rem 1rem rgba(255, 255, 255, 0.25) inset,
        0 0 0 0 rgba(0, 0, 0, 0.25);
    }
  }

  :global(.dorky-border) {
    border-top: 3rem solid hsl(var(--bg-hs), calc(var(--bg-l) - 10%));
    border-left: 4rem solid hsl(var(--bg-hs), calc(var(--bg-l) + 45%));
    border-right: 4rem solid hsl(var(--bg-hs), calc(var(--bg-l) + 5%));
    border-bottom: 3rem solid hsl(var(--bg-hs), calc(var(--bg-l) + 25%));
  }

  :global(body) {
    height: 100vh;
    filter: brightness(1.3);
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(.worn-text) {
    user-select: none;
    font-family: var(--title-font);
    -webkit-mask-image: url('/generated/worn-text.png');
    mask-image: url('/generated/worn-text.png');
    color: hsl(var(--title-color));
    font-weight: 400;
    text-transform: uppercase;
  }
</style>
