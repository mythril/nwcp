<script lang="ts">
  import '../app.postcss';
  import Overlay from '$lib/components/ImageGenerators/Overlay.svelte';
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
  import debug from '$lib/debug';
  import ModalManager, { modals } from '$lib/components/ModalManager.svelte';
  import WornText from '$lib/components/ImageGenerators/WornText.svelte';
  import Pitted from '$lib/components/ImageGenerators/Pitted.svelte';
  import BrightnessVariance from '$lib/components/ImageGenerators/BrightnessVariance.svelte';
  import RoleDisplay from '$lib/components/RoleDisplay.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import { role } from './RoleStore';
  import { character } from './CharacterStore';
  import { Role } from '$lib/engines/all';

  async function bootUp() {
    addEventListener('popstate', () => location.reload());
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

<svelte:head>
  {#key $role}
    {#key $character}
      {#if $role !== Role.None}
        {#if $character.name !== ''}
          <title>{$character.name} - NWCP</title>
        {:else}
          <title>The {$character.role} - NWCP</title>
        {/if}
      {:else}
        <title>Nuclear Wasteland Character Planner - NWCP</title>
      {/if}
    {/key}
  {/key}
</svelte:head>

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
    position: relative;
    width: fit-content;
    min-width: 100vw;
    display: grid;
    margin: auto;
    overflow: hidden;
    padding-top: 4rem;
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
