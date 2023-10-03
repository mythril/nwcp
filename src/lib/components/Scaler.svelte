<script lang="ts">
  import { onMount } from 'svelte';

  let ruler: HTMLDivElement;
  const resizeHandler = async () => {
    const style = document.documentElement.style;

    let fontSize = ruler.clientHeight / 525;

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
    font-size: resolve(100vh / 525);
    overflow-y: hidden;
    min-width: 640rem;
  }
  :global(body) {
    overflow-y: hidden;
  }
</style>
