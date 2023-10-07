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
  import type { ObjectValues } from '$lib/typeUtils';
  import Scaler from '$lib/components/Scaler.svelte';
  import { isEmbedded } from '$lib/utils';
  import Button from '$lib/components/Buttons/Button.svelte';

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

  const roleToCSSClassName: Record<ObjectValues<typeof Role>, string> = {
    [Role.None]: 'role-none',
    [Role.VaultDweller]: 'role-vault-dweller',
    [Role.ChosenOne]: 'role-chosen-one',
    [Role.Warrior]: 'role-warrior',
    [Role.LoneWanderer]: 'role-lone-wanderer',
    [Role.Courier]: 'role-courier'
  } as const;

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

<Scaler />

<Overlay />

<WornText />

<Pitted />

<BrightnessVariance />

<ModalManager />

{#if isEmbedded()}
  <Button
    class="embeddedBailerLink"
    type="link"
    target="_blank"
    href={window.location.href}
  />
{/if}

<div
  class={`app pitted ${roleToCSSClassName[$role]}  ${
    isEmbedded() ? 'isEmbedded' : ''
  }`}
>
  <div id="planner">
    <div
      class="interface"
      inert={$modals.length > 0 || isEmbedded()}
    >
      <slot />
    </div>
  </div>
  {#if isEmbedded() === false}
    <div class="footer">
      <RoleDisplay value={$role} />
      <Toast />
    </div>
  {/if}
</div>

<style lang="postcss">
  :global(.embeddedBailerLink) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    z-index: 2;
  }
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
    &.isEmbedded {
      padding: 0;
      &::before {
        z-index: 1;
        content: ' ';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: black;
        opacity: 0;
        transition: opacity 0.2s ease-out;
        cursor: pointer;
      }
      :global(body:hover) &::before {
        opacity: 0.85;
      }
      :global(body:hover) &::after {
        cursor: pointer;
        z-index: 1;
        color: hsl(var(--terminal-color));
        font-size: 50rem;
        content: 'OPEN IN FULL SITE';
        position: absolute;
        line-height: 480rem;
        left: 0;
        right: 0;
        text-align: center;
        top: 0;
      }
    }
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

  /*

  .role-none .interface {
    height:0;
    min-height:0;
  }

  .role-none .footer {
    height: 520rem;
  }

  .role-none .footer :global(.nav-menu) {
    bottom: -50rem;
  }
  */
</style>
