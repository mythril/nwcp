<script lang="ts">
  import '../lib/scss/_global.scss';
  import { page } from '$app/stores';
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
      let maxWidth = Math.max(innerHeight, innerWidth);
      let maxHeight = Math.min(innerHeight, innerWidth);

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
  const games: { [key: string]: [string, string] } = {
    VaultDweller: ['Classic', 'VaultDweller'],
    ChosenOne: ['2', 'Chosen One'],
    LoneWanderer: ['3', 'Lone Wanderer'],
    Courier: ['NV', 'The Courier'],
    SoleSurvivor: ['4', 'VaultDweller 4']
  };

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
  <div class="root">
    <div class="chosen">
      <h1 class:selected={true}>
        {games['ChosenOne'][1]}
      </h1>
    </div>
    <div class="chooser">
      {#each Object.keys(games) as value (value)}
        <a
          class:label={true}
          href={'/' + value}
          class:selected={$page.url.pathname === '/' + value}
        >
          {games[value][0]}
        </a>
      {/each}
    </div>
    <div class="page">
      <slot />
    </div>
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
    display: block;
    position: relative;
    background-color: $root-bg;
    border: 0;
    margin: 0 auto;
  }
  .root {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(33, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .chooser {
    width: 100%;
    font-size: px(36);
    text-transform: uppercase;
    grid-area: 1 / 4 / 2 / 6;
    display: flex;
    justify-content: right;
  }
  .chooser .label {
    text-decoration: none;
    @include big-button-style();
  }

  .chooser .label:hover,
  .chooser .label.selected {
    @include big-button-style-hover();
  }

  .chooser .label:active {
    @include big-button-style-active();
  }

  .chosen {
    grid-area: 1 / 1 / 2 / 4;
    position: relative;
    overflow: hidden;
  }
  .chosen h1 {
    position: absolute;
    padding: 0;
    margin: 0;
    bottom: 100%;
    font-size: px(36);
    @include big-button-style();
    text-transform: uppercase;
    font-weight: normal;
    transition: bottom 0.2s linear;
  }
  .chosen h1.selected {
    @include big-button-style-hover();
    bottom: 0;
  }
  .chooser,
  .chosen {
    display: none;
  }
  .page {
    // this maintains an aspect ratio similar to the original game
    width: px(855);
    height: px(855 * 0.75);

    grid-area: 2 / 1 / 34 / 6;
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
</style>
