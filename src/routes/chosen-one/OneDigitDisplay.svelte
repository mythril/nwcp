<script lang="ts">
  import EmptyDigitDisplay from './EmptyDigitDisplay.svelte';
  import gsap from 'gsap';

  export let value: number;
  let oldValue = value;

  let up: number;
  let current: number;
  let down: number;

  let offset = 0;
  $: {
    up = Math.floor((value + 11) % 10);
    current = Math.floor(value + 10) % 10;
    down = Math.floor((value + 9) % 10);
    offset = oldValue - value;
    if (value === 9) {
      up = 0;
      down = 8;
    }
    if (value === 0 && oldValue === 9) {
      offset = -1;
    }
    if (offset === -9) {
      offset = 1;
    }
    oldValue = value;
    if (varWrap) {
      gsap.from(varWrap, { '--offset': offset });
      if (varWrap) {
        gsap.to(varWrap, { '--offset': 0, duration: 0.6, ease: 'elastic' });
      }
    }
  }

  export const bonkUp = () => {
    gsap.from(varWrap, { '--offset': 0.2 });
    gsap.to(varWrap, { '--offset': 0, duration: 0.05 });
  };

  export const bonkDown = () => {
    gsap.from(varWrap, { '--offset': -0.2 });
    gsap.to(varWrap, { '--offset': 0, duration: 0.05 });
  };
  let varWrap: HTMLDivElement;
</script>

<div
  bind:this={varWrap}
  style="--offset: {offset}"
  class="var-wrap"
>
  <EmptyDigitDisplay>
    <div class="anim-wrap">
      <div
        aria-hidden="true"
        class="hidden"
      >
        {up}
      </div>
      <div class="current">
        {current}
      </div>
      <div
        aria-hidden="true"
        class="hidden"
      >
        {down}
      </div>
    </div>
  </EmptyDigitDisplay>
</div>

<style lang="postcss">
  .hidden {
    user-select: none;
  }
  .anim-wrap {
    position: absolute;
    top: -100%;
    display: flex;
    flex-flow: column;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.9),
      1rem -1rem 0rem rgba(0, 0, 0, 1), 1rem -1rem 2rem rgba(0, 0, 0, 1),
      -1rem 1rem 2rem rgba(255, 255, 255, 0.25),
      -1rem 1rem 1rem rgba(255, 255, 255, 0.25);
    transition: top 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: translate(0, calc(var(--offset) * 1em));
  }
</style>
