<script lang="ts">
  import { bonkSound } from '$lib/utils';
  import EmptyDigitDisplay from './EmptyDigitDisplay.svelte';
  import OneDigitDisplay from './OneDigitDisplay.svelte';

  export let initial: number;
  export let min: number;
  export let max: number;
  let realMin: number;
  let realMax: number;
  let value = 0;

  $: {
    realMin = Math.max(Math.round(min), 1);
    realMax = Math.min(Math.round(max), 99);
  }

  export let onChange = (_val: number) => {
    //intentional
  };

  export const increment = () => {
    if (value + 1 > realMax) {
      try {
        bonkSound();
      } catch {
        //intentional, nothing to do, expected
      }
      onesDigitDisplay.bonkUp();
      return false;
    }
    value += 1;
    onChange(value);
    return true;
  };

  export const decrement = () => {
    if (value - 1 < realMin) {
      try {
        bonkSound();
      } catch {
        //intentional, nothing to do, expected
      }
      onesDigitDisplay.bonkDown();
      return false;
    }
    value -= 1;
    onChange(value);
    return true;
  };

  export const set = (newVal: number) => {
    if (newVal < realMin) {
      return false;
    }
    if (newVal > realMin) {
      return false;
    }
    let flips = Math.round(newVal) - value;
    let flip = flips > 0 ? increment : decrement;

    const doFlips = (howMany: number) => {
      if (howMany < 1) return;
      flip();
      setTimeout(() => doFlips(howMany - 1), 0);
    };
    doFlips(flips);
    return true;
  };

  if (!set(initial)) {
    throw 'Could not set initial value. Check your min & max.';
  }

  let tensDigit: number;
  let onesDigit: number;
  $: {
    tensDigit = Math.floor(value / 10);
    onesDigit = Math.round(value - tensDigit * 10);
  }
  let tensDigitDisplay: OneDigitDisplay;
  let onesDigitDisplay: OneDigitDisplay;
</script>

<div class="window">
  <div class="two-digit">
    <EmptyDigitDisplay />
    <OneDigitDisplay
      bind:this={tensDigitDisplay}
      value={tensDigit}
    />
    <OneDigitDisplay
      bind:this={onesDigitDisplay}
      value={onesDigit}
    />
    <EmptyDigitDisplay />
  </div>
</div>

<style lang="postcss">
  .window {
    display: block;
    overflow: hidden;
    width: 33rem;
    height: 22rem;
    position: relative;
    background: #000;
    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      box-shadow: 0 0 11rem rgba(0, 0, 0, 1) inset;
    }
  }
  .two-digit {
    display: flex;
    height: 22rem;
    width: resolve(13rem * 4);
    position: relative;
    left: -5rem;
  }
</style>
