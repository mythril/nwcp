<script
  lang="ts"
  context="module"
>
  export const ModalNavEvents = {
    navBack: 'navBack',
    navExit: 'navExit'
  } as const;
  export type ModalEventSignature = {
    [k in keyof typeof ModalNavEvents]: null;
  };

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
    Options: ['Menus', 'Options'],
    SaveLoad: ['Menus', 'SaveLoad']
  } as const;

  export const Modals = {
    DifficultySetting: ['Modals', 'DifficultySetting'],
    ErrorMessage: ['Modals', 'ErrorMessage'],
    ErasePrompt: ['Modals', 'ErasePrompt'],
    AgeChanger: ['Modals', 'AgeChanger'],
    SexChanger: ['Modals', 'SexChanger'],
    NameChanger: ['Modals', 'NameChanger']
  } as const;

  export const Registry = { ...Menus, ...Modals };
  export type RegistryValue = ObjectValues<typeof Registry>;

  export const loadModal = async (rv: RegistryValue) => {
    let [dir, module] = rv;
    let key = rv.join('/');
    if (!loaded[key]) {
      // This reads like it's stupid but that's just because of how esoteric
      // vite's dynamic import rules are, I'm just trying to ensure that
      // there are only 2 dynamic bundles generated from this.
      switch (dir) {
        case 'Modals':
          loaded[key] = import(`./Modals/${module}.svelte`);
          break;
        case 'Menus':
          loaded[key] = import(`./Menus/${module}.svelte`);
          break;
        default:
          throw new Error('Invalid import.');
      }
    }
    return loaded[key];
  };

  export const showModal = async (module: RegistryValue) => {
    get(modals).push((await loadModal(module)).default);
    modals.set(get(modals));
  };
</script>

<script lang="ts">
  import { afterUpdate } from 'svelte';
  import type { ObjectValues } from '$lib/typeUtils';
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

  const navBack = () => {
    if (instance) {
      instance.leave();
      $modals.pop();
      instance = undefined;
      $modals = $modals;
    }
  };
  const navExit = () => {
    if (instance) {
      instance.leave();
      instance = undefined;
    }
    $modals = [];
  };

  const escapeMenu = (ev: KeyboardEvent) => {
    switch (ev.code) {
      case 'Escape':
        if ($modals.length === 0) {
          showModal(Menus.Options);
        }
        break;
    }
  };
</script>

<svelte:body on:keydown={escapeMenu} />

<div id="modals">
  {#if $modals.length > 0}
    <div id="backdrop" />
    <svelte:component
      this={constructor}
      on:navExit={navExit}
      on:navBack={navBack}
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
