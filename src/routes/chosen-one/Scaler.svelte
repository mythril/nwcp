<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    // This allows zooming to happen by freezing the font-size
    setTimeout(() => {
      let cfs = getComputedStyle(document.documentElement).fontSize;
      document.documentElement.style.fontSize = cfs;
      document.documentElement.style.setProperty(
        '--rem-ratio',
        cfs.replace('px', '')
      );
    }, 1);
  });
</script>

<style lang="postcss">
  :global(html) {
    /* attempts to render largest in-frame window possible */
    font-size: calc(min(resolve(100vh / 675), resolve(100vw / 890)));
  }
</style>
