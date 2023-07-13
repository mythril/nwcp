<script lang="ts">
  import {spring} from 'svelte/motion';
  import EmptyDigitDisplay from './EmptyDigitDisplay.svelte';
  export let value: number;
  
  const current = spring();
  current.stiffness = 0.7;
  current.damping = 0.9;
  
  $: current.set(value);
  $: offset = ($current + 10) % 1;

</script>

<EmptyDigitDisplay>
  <div class="animwrap" style="transform: translate(0, {100 * offset}%)">
    <div class="hidden">
      {Math.floor(($current + 11) % 10)}
    </div>
    <div class="current">
      {Math.floor(($current) + 10) % 10}
    </div>
  </div>
</EmptyDigitDisplay>

<style lang="scss">
  .hidden {
    // top: -100%;
    user-select:none;
  }
  .animwrap {
    position: absolute;
    top: -100%;
    display:flex;
    flex-flow:column;
    transition:top 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
</style>
