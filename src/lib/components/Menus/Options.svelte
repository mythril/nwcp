<script lang="ts">
  import Menu from '$lib/components/Menu.svelte';
  import { Menus, Modals } from '../ModalManager.svelte';

  import ModalButton from '$lib/components/Buttons/ModalButton.svelte';

  export const enter = () => {
    // intentional
  };

  export const leave = () => {
    // intentional
  };
</script>

<Menu
  on:navBack
  on:navExit
>
  <ModalButton
    type="flat"
    modal={Modals.DifficultySetting}>Preferences</ModalButton
  >
  <ModalButton
    type="flat"
    modal={Menus.SaveLoad}>Save/Load</ModalButton
  >
  <ModalButton
    type="flat"
    modal={Modals.ErasePrompt}>Erase</ModalButton
  >
</Menu>
