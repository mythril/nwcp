<script lang="ts">
  import { onMount } from 'svelte';

  let devicePixelRatio = 0;

  const setRem = () => {
    let cfs = parseFloat(getComputedStyle(document.documentElement).fontSize);

    // keep the user's zoom level
    let fontSize = cfs * devicePixelRatio;

    document.documentElement.style.fontSize = fontSize + 'px';
    document.documentElement.style.setProperty(
      '--px-ratio',
      devicePixelRatio.toString()
    );
    document.documentElement.style.setProperty(
      '--rem-ratio',
      fontSize.toString()
    );
  };

  const waitForDevicePixelRatio = () => {
    // This allows zooming to happen by freezing the font-size
    if (devicePixelRatio !== 0) {
      setTimeout(setRem, 1);
    } else {
      setTimeout(waitForDevicePixelRatio, 20);
    }
  };

  onMount(waitForDevicePixelRatio);
</script>

<svelte:window bind:devicePixelRatio />

<style lang="postcss">
  :global(html) {
    /* attempts to render largest in-frame window possible */
    font-size: calc(min(resolve(100vh / 675), resolve(100vw / 890)));
  }
</style>
