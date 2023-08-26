<script
  lang="ts"
  context="module"
>
  import { writable } from 'svelte/store';

  export const anchors = writable<
    Record<string, { top: number; left: number }>
  >({});
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  export let location: string;

  let anchor: HTMLDivElement;

  const resizeHandler = () => {
    if (!anchor) {
      return;
    }
    let domRect = anchor.getBoundingClientRect();
    $anchors[location] = {
      top: window.scrollY + domRect.top,
      left: window.scrollX + domRect.left
    };
    $anchors = $anchors;
  };

  onMount(resizeHandler);
</script>

<svelte:window on:resize={resizeHandler} />

<div
  class="anchor"
  bind:this={anchor}
/>

<style lang="postcss">
  .anchor {
    position: absolute;
  }
</style>
