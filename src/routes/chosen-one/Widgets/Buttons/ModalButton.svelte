<script lang="ts">
  import type { ComponentType, SvelteComponent } from "svelte";
  import FlatButton from "./FlatButton.svelte";
  import PlateButton from "./PlateButton.svelte";
  import SlateButton from "./SlateButton.svelte";
  import { loadModal, showModal, type RegistryValue } from "../../ModalManager.svelte";

  export let modal: RegistryValue;
  export let type: 'flat' | 'plate' | 'slate' = 'flat';
  let btn: ComponentType<SvelteComponent>;

  switch (type) {
    case "flat":
      btn = FlatButton;
      break;
    case "plate":
      btn = PlateButton;
      break;
    case "slate":
      btn = SlateButton;
      break;
  }

  const load = () => {
    loadModal(modal);
  };

  const show = () => {
    showModal(modal);
  }
</script>

<svelte:component this={btn} on:mouseover={load} on:focus={load} on:click={show} >
  <slot />
</svelte:component>