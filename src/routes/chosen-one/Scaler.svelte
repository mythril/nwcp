<script lang="ts">
  import { onMount } from 'svelte';
  import './Scaler.postcss';

  let devicePixelRatio = 0;

  const setRem = () => {
    let cfs = parseFloat(getComputedStyle(document.documentElement).fontSize);

    // keep the user's zoom level
    let fontSize = cfs * devicePixelRatio;

    const style = document.documentElement.style;

    // This allows zooming to happen by freezing the font-size
    style.fontSize = fontSize + 'px';
    style.setProperty(
      '--px-ratio',
      devicePixelRatio.toString()
    );
    style.setProperty(
      '--rem-ratio',
      fontSize.toString()
    );
  };

  const waitForDevicePixelRatio = () => {
    if (devicePixelRatio !== 0) {
      setTimeout(setRem, 1);
    } else {
      setTimeout(waitForDevicePixelRatio, 20);
    }
  };

  onMount(waitForDevicePixelRatio);
</script>

<svelte:window bind:devicePixelRatio />
