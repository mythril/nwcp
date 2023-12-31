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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Svelte uses 'any', don't know a good way to narrow
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
    SaveLoad: ['Menus', 'SaveLoad'],
    Share: ['Menus', 'Share']
  } as const;

  export const Modals = {
    About: ['Modals', 'About'],
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
  import { afterUpdate, onDestroy } from 'svelte';
  import type { ObjectValues } from '$lib/typeUtils';
  import { Role } from '$lib/engines/all';
  import { role } from '../../routes/RoleStore';
  let constructor: ModalComponentConstructor;
  let instance: ModalComponentInstance | undefined;

  constructor = $modals[$modals.length - 1];

  const unSubscriber = modals.subscribe((m) => {
    constructor = m[m.length - 1];
  });

  onDestroy(unSubscriber);

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
        if ($modals.length === 0 && $role !== Role.None) {
          showModal(Menus.Options);
        }
        break;
    }
  };

  $: if ($role === Role.None) {
    navExit();
  }
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
