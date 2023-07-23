<script lang="ts">
  import { spring } from 'svelte/motion';
  import EmptyDigitDisplay from './EmptyDigitDisplay.svelte';
  export let value: number;

  const current = spring();
  current.stiffness = 0.5;
  current.damping = 1;
  current.precision = 0.01;

  const bonk = spring(0);
  bonk.stiffness = 0.5;
  bonk.damping = 1;
  bonk.precision = 0.01;

  $: $current = value;
  $: offset = modulo($current, 1) + $bonk;

  function modulo(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  export const bonkUp = () => {
    $bonk = 0.1;
    setTimeout(() => {
      $bonk = 0;
    }, 50);
  };

  export const bonkDown = () => {
    $bonk = -0.1;
    setTimeout(() => {
      $bonk = 0;
    }, 50);
  };
</script>

<EmptyDigitDisplay>
  <div
    class="anim-wrap"
    style="--offset: {100 * offset}"
  >
    <div
      aria-hidden="true"
      class="hidden"
    >
      {Math.floor(($current + 11) % 10)}
    </div>
    <div class="current">
      {Math.floor($current + 10) % 10}
    </div>
    <div
      aria-hidden="true"
      class="hidden"
    >
      {Math.floor(($current + 9) % 10)}
    </div>
  </div>
</EmptyDigitDisplay>

<style lang="scss">
  .hidden {
    user-select: none;
  }
  .anim-wrap {
    position: absolute;
    top: -100%;
    display: flex;
    flex-flow: column;
    transition: top 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: translate(0, calc(var(--offset) * 1%));
  }
</style>
