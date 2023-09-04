<script lang="ts">
  import { bonkSound } from '$lib/browserUtils';
  import EmptyDigitDisplay from './EmptyDigitDisplay.svelte';
  import OneDigitDisplay from './OneDigitDisplay.svelte';

  export let value = 0;
  export let min: number;
  export let max: number;
  export let display: number | undefined = undefined;
  let realMin: number;
  let realMax: number;

  $: {
    realMin = Math.max(Math.round(min), 0);
    realMax = Math.min(Math.round(max), 99);
  }

  export const bonkDown = () => {
    onesDigitDisplay.bonkDown();
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
    return true;
  };

  export const decrement = () => {
    if (value - 1 < realMin) {
      try {
        bonkSound();
      } catch {
        //intentional, nothing to do, expected
      }
      bonkDown();
      return false;
    }
    value -= 1;
    return true;
  };

  let howMany = 0;

  export const set = (newVal: number) => {
    let flips = Math.round(newVal) - value;
    let flip = flips > 0 ? increment : decrement;
    howMany = flips;

    const doFlips = () => {
      if (howMany === 0) return;
      flip();
      if (howMany > 0) {
        howMany -= 1;
      } else if (howMany < 0) {
        howMany += 1;
      }
      setTimeout(() => doFlips(), 0);
    };
    doFlips();
    if (newVal < realMin) {
      return false;
    }
    if (newVal > realMax) {
      return false;
    }
    return true;
  };

  if (!set(value)) {
    throw 'Could not set initial value. Check your min & max.';
  }

  let tensDigit: number;
  let onesDigit: number;
  $: {
    tensDigit = Math.floor((display || value) / 10);
    onesDigit = Math.round((display || value) - tensDigit * 10);
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
