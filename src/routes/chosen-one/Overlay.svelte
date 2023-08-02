<script lang="ts">
  import Portal from '$lib/components/Portal.svelte';
  import { onMount } from 'svelte';

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

  let devicePixelRatio = 0;
  // this feels like a hack, I'm not certain why it works
  // it's only a guess that the document is layed out by the time
  // devicePixelRatio is read and onMount() has fired
  const waitForDevicePixelRatio = () => {
    if (devicePixelRatio !== 0) {
      setTimeout(renderOverLay, 1);
    } else {
      setTimeout(waitForDevicePixelRatio, 20);
    }
  };

  onMount(waitForDevicePixelRatio);
</script>

<svelte:window bind:devicePixelRatio />

<Portal target=".app">
  <div class="overlay">
    <canvas bind:this={canvas} />
  </div>
</Portal>

<div class="offscreen">
  <svg>
    <defs>
      <filter id="variance">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.1"
          numOctaves="1"
          stitchTiles="stitch"
          seed="1"
        />
        <feColorMatrix
          type="saturate"
          values="0.5"
        />
        <feComponentTransfer>
          <feFuncA
            type="table"
            tableValues="0.5 0.5 0.5 1"
          />
        </feComponentTransfer>
        <feBlend
          in="SourceGraphic"
          in2="variance"
          mode="multiply"
        />
      </filter>
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.375"
          numOctaves="6"
          stitchTiles="stitch"
          seed="1"
        />
        <feBlend
          in="SourceGraphic"
          in2="grain"
          mode="multiply"
        />
      </filter>
    </defs>
  </svg>
</div>

<style lang="postcss">
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
