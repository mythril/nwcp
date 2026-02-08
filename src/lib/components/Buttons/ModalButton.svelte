<script lang="ts">
  import type { ComponentType, SvelteComponent } from 'svelte';
  import FlatButton from './FlatButton.svelte';
  import PlateButton from './PlateButton.svelte';
  import SlateButton from './SlateButton.svelte';
  import {
    loadModal,
    showModal,
    type RegistryValue
  } from '../ModalManager.svelte';

  interface Props {
    modal: RegistryValue;
    type?: 'flat' | 'plate' | 'slate';
    children?: import('svelte').Snippet;
  }

  let { modal, type = 'flat', children }: Props = $props();
  let btn: ComponentType<SvelteComponent> | undefined = $state();

  switch (type) {
    case 'flat':
      btn = FlatButton;
      break;
    case 'plate':
      btn = PlateButton;
      break;
    case 'slate':
      btn = SlateButton;
      break;
  }

  const load = () => {
    loadModal(modal);
  };

  const show = () => {
    showModal(modal);
  };

  const SvelteComponent_1 = $derived(btn);
</script>

<SvelteComponent_1
  on:mouseover={load}
  on:focus={load}
  on:click={show}
>
  {@render children?.()}
</SvelteComponent_1>
