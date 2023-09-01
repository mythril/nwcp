<script
  lang="ts"
  context="module"
>
  export const role = writable<ObjectValues<typeof Role> | undefined>();
</script>

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
  import RoleDisplay from './RoleDisplay.svelte';
  import type { ObjectValues } from '$lib/typeUtils';
  import { writable } from 'svelte/store';
  import type { Role } from '$lib/engines/all';
  import Toast from './Toast.svelte';

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
  <div class="footer">
    <RoleDisplay value={$role} />
    <Toast />
  </div>
</div>

<style lang="postcss">
  .footer {
    filter: drop-shadow(-5rem 5rem 5rem rgba(0, 0, 0, 1));
    width: 640rem;
    margin: 0 auto;
    height: 40rem;
    position: relative;
    z-index: 1;
  }
  .app {
    font-size: 8rem;
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
