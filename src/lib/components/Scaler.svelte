<script lang="ts">
  import { isEmbedded } from '$lib/utils';
  import { onMount } from 'svelte';

  let ruler: HTMLDivElement;
  let denominator = isEmbedded() ? 480 : 525;

  const resizeHandler = async () => {
    const style = document.documentElement.style;

    let fontSize = ruler.clientHeight / denominator;

    style.setProperty('--root-em-denominator', denominator.toString());
    style.setProperty('--root-em', fontSize + 'px');
    style.fontSize = fontSize + 'px';
  };
  onMount(resizeHandler);
</script>

<svelte:window on:resize={resizeHandler} />

<div
  bind:this={ruler}
  class="ruler"
/>

<style lang="postcss">
  .ruler {
    position: absolute;
    left: -1px;
    bottom: 100vh;
    width: 1px;
    height: 100vh;
  }
  :global(html) {
    /* attempts to render largest in-frame window possible */
    font-size: var(--root-em, resolve(100vh / 525));
    overflow-y: hidden;
    min-width: 640rem;
  }
  :global(body) {
    overflow-y: hidden;
  }
</style>
