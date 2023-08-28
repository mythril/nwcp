<script lang="ts">
  import '../app.postcss';
  import Overlay from './chosen-one/ImageGenerators/Overlay.svelte';
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
  import debug from '$lib/debug';
  import ModalManager, { modals } from './chosen-one/ModalManager.svelte';
  import WornText from './chosen-one/ImageGenerators/WornText.svelte';
  import Pitted from './chosen-one/ImageGenerators/Pitted.svelte';
  import BrightnessVariance from './chosen-one/ImageGenerators/BrightnessVariance.svelte';

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

<Overlay />

<WornText />

<Pitted />

<BrightnessVariance />

<ModalManager />

<div class="app pitted">
  <div id="planner">
    <div
      class="interface"
      inert={$modals.length > 0}
    >
      <slot />
    </div>
  </div>
</div>

<style lang="postcss">
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
    border: 0;
    display: grid;
    margin: auto;
    position: relative;
  }

  .interface {
    /* this maintains an aspect ratio similar to the original game */
    width: 640rem;
    min-width: 640rem;
    height: 480rem;
    min-height: 480rem;
    position: relative;
  }
</style>
