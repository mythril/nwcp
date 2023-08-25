<script
  lang="ts"
  context="module"
>
  import type { ComponentType, SvelteComponent } from 'svelte';
  import { get, writable } from 'svelte/store';

  export interface Mode {
    enter(): void;
    leave(): void;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type ModeProps = Record<string, any> & Mode;

  export type ModalComponentInstance = SvelteComponent & Mode;

  export type ModalComponentConstructor = ComponentType<ModalComponentInstance>;

  export const modals = writable<ModalComponentConstructor[]>([]);

  const loaded: Record<
    string,
    Promise<{ default: ModalComponentConstructor }>
  > = {};

  export const Menus = {
    Options: '../Menus/Options',
    DifficultySetting: '../Menus/DifficultySetting',
    ErrorMessage: '../Menus/ErrorMessage',
    SaveLoad: '../Menus/SaveLoad'
  } as const;

  export const Modals = {
    AgeChanger: '../Modals/AgeChanger',
    SexChanger: '../Modals/SexChanger',
    NameChanger: '../Modals/NameChanger'
  } as const;

  export const loadModal = async (module: string) => {
    if (!loaded[module]) {
      loaded[module] = import('./' + module + '.svelte');
    }
    return loaded[module];
  };

  export const showModal = async (module: string) => {
    console.log('show', module);
    get(modals).push((await loadModal(module)).default);
    modals.set(get(modals));
  };
</script>

<script lang="ts">
  import { afterUpdate } from 'svelte';
  let constructor: ModalComponentConstructor;
  let instance: ModalComponentInstance | undefined;

  constructor = $modals[$modals.length - 1];

  modals.subscribe((m) => {
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
</script>

<div id="modals">
  {#if $modals.length > 0}
    <div id="backdrop" />
    <svelte:component
      this={constructor}
      on:modal-hide={hideHandler}
      on:menu-close={hideHandler}
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
