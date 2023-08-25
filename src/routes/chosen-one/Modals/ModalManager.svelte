<script lang="ts">
  import { SvelteComponent, afterUpdate } from 'svelte';
  import {
    modals,
    type ModalComponentConstructor,
    type ModalComponentInstance
  } from '../stores';
  let constructor: ModalComponentConstructor;
  let instance: ModalComponentInstance | undefined;

  constructor = $modals[$modals.length - 1];

  modals.subscribe(m => {
    constructor = m[m.length - 1];
  });

  afterUpdate(async () => {
    if (instance) {
      instance.enter();
    }
  });

  const hideHandler = () => {
    if (instance) {
      instance.leave();
      $modals.pop();
      instance = undefined;
      $modals = $modals;
    }
  };

  const loaded: Record<string, Promise<{default: ModalComponentConstructor}>> = {};

  export const loadModal = async (module: string) => {
    if (!loaded[module]) {
      loaded[module] = import('./' + module + '.svelte');
    }
    return loaded[module];
  };

  export const showModal = async (module: string) => {
    console.log('show', module);
    $modals.push((await loadModal(module)).default);
    $modals = $modals;
  };
</script>

<div id="modals">
  {#if $modals.length > 0}
    <div id="backdrop" />
    <svelte:component
      this={constructor}
      {loadModal}
      {showModal}
      on:modal-hide={hideHandler}
      bind:this={instance}
    />
  {/if}
</div>

<style lang="postcss">
  #modals {
    font-family: var(--terminal-font);
  }
  #backdrop {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.75);
  }
</style>
