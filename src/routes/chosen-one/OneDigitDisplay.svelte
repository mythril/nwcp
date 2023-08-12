<script lang="ts">
  import { sleep } from '$lib/utils';
  import EmptyDigitDisplay from './EmptyDigitDisplay.svelte';

  export let value: number;
  let oldValue = value;

  let up: number;
  let current: number;
  let down: number;

  let offset = 0;
  async function asyncUpdate(val: number) {
    up = Math.floor((val + 11) % 10);
    current = Math.floor(val + 10) % 10;
    down = Math.floor((val + 9) % 10);
    offset = oldValue - val;
    if (val === 9) {
      up = 0;
      down = 8;
    }
    if (val === 0 && oldValue === 9) {
      offset = -1;
    }
    if (offset === -9) {
      offset = 1;
    }
    oldValue = val;
    if (varWrap) {
      let s = varWrap.style;
      s.setProperty('transition-property', '');
      s.setProperty('--digit-offset', offset.toString());
      await sleep(1);
      s.setProperty('transition-property', '--digit-offset');
      s.setProperty('--digit-offset', '0');
    }
  }
  $: asyncUpdate(value);

  export const bonkUp = async () => {
    let s = varWrap.style;
    s.setProperty('transition-property', '');
    s.setProperty('--digit-offset', '0.2');
    await sleep(1);
    s.setProperty('transition-property', '--digit-offset');
    s.setProperty('--digit-offset', '0');
  };

  export const bonkDown = async () => {
    let s = varWrap.style;
    s.setProperty('transition-property', '');
    s.setProperty('--digit-offset', '-0.2');
    await sleep(1);
    s.setProperty('transition-property', '--digit-offset');
    s.setProperty('--digit-offset', '0');
  };
  let varWrap: HTMLDivElement;
</script>

<div
  bind:this={varWrap}
  style="--digit-offset: {offset}"
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
  @property --digit-offset {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
  }
  .hidden {
    user-select: none;
  }
  .var-wrap {
    --digit-offset: 0;
    transition-duration: 0.1s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .anim-wrap {
    position: absolute;
    top: -100%;
    display: flex;
    flex-flow: column;
    background-clip: text;
    color: transparent;
    /* prettier-ignore */
    text-shadow:
      0 0 0.5rem rgba(255, 255, 255, 0.9),
      1rem -1rem 0rem rgba(0, 0, 0, 1), 
      1rem 0rem 0rem rgba(0, 0, 0, 1), 
      0rem -1rem 0rem rgba(0, 0, 0, 1), 
      1rem -1rem 2rem rgba(0, 0, 0, 1),
      -1rem 1rem 2rem rgba(255, 255, 255, 0.15),
      0rem 1rem 2rem rgba(255, 255, 255, 0.15),
      -1rem 0rem 2rem rgba(255, 255, 255, 0.15),
      -1rem 1rem 1rem rgba(255, 255, 255, 0.25);
    transform: translate(0, calc(var(--digit-offset) * 50%));
  }
</style>
