<script lang="ts">
  import '../app.postcss';
  import { modalShown } from './chosen-one/stores';
  import Overlay from './chosen-one/Overlay.svelte';
  import Scaler from './chosen-one/Scaler.svelte';
  import WornText from './chosen-one/WornText.svelte';
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
  import debug from '$lib/debug';

  async function bootUp() {
    if ('serviceWorker' in navigator) {
      debug.log('registering service worker');
      navigator.serviceWorker
        .register('./service-worker.js', {
          type: dev ? 'module' : 'classic'
        })
        .then(() => {
          debug.log('service worker registered');
        });
      debug.log('registration initiated');
      if (navigator.serviceWorker.controller) {
        debug.log('a service worker is installed');
      }
      navigator.serviceWorker.oncontrollerchange = () => {
        debug.log('new service worker activated');
      };
    }
  }
  onMount(bootUp);
</script>

<Scaler />

<Overlay />

<WornText />

<div id="modals" />
<div class="app">
  <div
    id="planner"
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
    min-height: 100vh;
    position: relative;
    width: fit-content;
    min-width: 100vw;
    display: grid;
    margin: auto;
    overflow: hidden;
  }

  #planner {
    font-family: var(--terminal-font);
    font-size: 8rem;
    background-color: hsl(var(--bg));
    border: 0;
    display: grid;
    margin: auto;
    position: relative;
  }

  .page {
    /* this maintains an aspect ratio similar to the original game */
    width: 640rem;
    min-width: 640rem;
    height: 480rem;
    min-height: 480rem;
    position: relative;
  }
</style>
