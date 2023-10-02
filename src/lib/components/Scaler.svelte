<script lang="ts">
  import { onMount } from 'svelte';

  let ruler: HTMLDivElement;
  onMount(async () => {
    const style = document.documentElement.style;

    let fontSize = ruler.clientHeight / 525;

    style.fontSize = fontSize + 'px';
  });
</script>

<div
  bind:this={ruler}
  class="ruler"
/>

<style lang="postcss">
  /*
  @media (min-height: 0) {
    :root {
      font-size: 1px;
    }
  }

  @for $i from 0 to 30 {
    @media (min-height: resolve(480px * (1.1 + $i * 0.1))) {
      :root {
        font-size: resolve(1px * (1.1 + $i * 0.0875));
      }
    }
  }
  */
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
