<script lang="ts">
  import '../lib/scss/_global.scss';
  import GameChooser from '../components/GameChooser.svelte';

  let innerWidth: number;
  let innerHeight: number;
  let planner: HTMLDivElement;
  let width: number;
  let height: number;
  let dom: HTMLHtmlElement;

  function originalFontSizeScaled(width: number) {
    return width / 85;
  }

  $: {
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
</script>

<svelte:window
  bind:innerWidth
  bind:innerHeight
/>


<div
  class="planner"
  bind:this={planner}
>
<svg style="position:absolute;z-index:-1;opacity:0">
  <filter id="variance">
    <feTurbulence
      type='fractalNoise'
      baseFrequency='0.1'
      numOctaves='1'
      stitchTiles='stitch'
      seed="1"
    />
    <feColorMatrix 
      type="saturate" 
      values="0.5"
    />
    <feBlend 
      in="SourceGraphic" 
      in2="variance" 
      mode="multiply"
    />
  </filter>
  <filter id="grain">
    <feTurbulence
      type='fractalNoise'
      baseFrequency='0.375'
      numOctaves='6'
      stitchTiles='stitch'
      seed="1"
    />
    <feBlend 
      in="SourceGraphic" 
      in2="grain" 
      mode="multiply"
    />
  </filter>
</svg>
  <GameChooser />
</div>

<style lang="scss">
  .planner {
    font-family: terminal-font();
    display: block;
    position: relative;
    background-color: $root-bg;
    border: 0;
    margin: 0 auto;
  }
</style>
