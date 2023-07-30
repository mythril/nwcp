<script lang="ts">
  import '../app.postcss';
  import { modalShown } from './chosen-one/stores';
  import Overlay from './chosen-one/Overlay.svelte';
  import Scaler from './chosen-one/Scaler.svelte';
  import WornText from './chosen-one/WornText.svelte';

  let planner: HTMLDivElement;
  let hidden = true;
</script>

<svelte:window on:load={() => (hidden = false)} />

<Scaler />

<Overlay />

<WornText />

<div id="modals" />
<div class="app">
  <div
    id="planner"
    bind:this={planner}
    {hidden}
    inert={$modalShown}
  >
    <div class="page">
      <slot />
    </div>
  </div>
</div>

<style lang="postcss">
  #modals {
    font-family: var(--terminal-font);
  }
  .app {
    font-family: var(--terminal-font);
    background-color: hsl(var(--bg));
    /* filter: brightness(1.3); */
    min-height: 100vh;
    position: relative;
    width: fit-content;
    min-width: 100vw;
    display: grid;
    margin: auto;
  }

  #planner {
    font-family: var(--terminal-font);
    font-size: 10rem;
    background-color: hsl(var(--bg));
    border: 0;
    display: grid;
    margin: auto;
  }

  .page {
    /* this maintains an aspect ratio similar to the original game */
    width: 855rem;
    min-width: 855rem;
    height: 641.25rem;
    min-height: 641.25rem;
    position: relative;
  }
</style>
