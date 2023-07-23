<script lang="ts">
  import EmptyDigitDisplay from './EmptyDigitDisplay.svelte';
  import OneDigitDisplay from './OneDigitDisplay.svelte';

  export let value: number;

  let tensDigit: number;
  let onesDigit: number;
  $: {
    tensDigit = Math.floor(value / 10);
    onesDigit = Math.round(value - tensDigit * 10);
  }
</script>

<div class={'window'}>
  <div class="two-digit">
    <EmptyDigitDisplay />
    <OneDigitDisplay value={tensDigit} />
    <OneDigitDisplay value={onesDigit} />
    <EmptyDigitDisplay />
  </div>
</div>

<style lang="scss">
  .window {
    display: block;
    overflow: hidden;
    width: px(44);
    height: px(29);
  }
  .two-digit {
    display: flex;
    height: 100%;
    width: px(90);
    position: relative;
    left: px(-5);
  }
</style>
