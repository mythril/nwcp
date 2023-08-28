<script
  lang="ts"
  context="module"
>
  import { writable } from 'svelte/store';

  export const anchors = writable<
    Record<string, { top: number; left: number }>
  >({});

  export const updateAnchors = writable<string[]>([]);
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

  // This is here because the onMount handler doesn't seem to fire when the
  // layout is done, so instead I force an update right before rendering
  // any component that needs the data by pushing the "location" of the
  // anchor on to this stack, and then re-running the resizeHandler below
  // this seems like an odd way to do this but svelte doesn't appear to have
  // a better solution up it's sleeves as far as I can tell.
  $: if ($updateAnchors[$updateAnchors.length - 1] === location) {
    resizeHandler();
    $updateAnchors.pop();
    $updateAnchors = $updateAnchors;
  }

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
