<script lang="ts">
  import Menu from '$lib/components/Menu.svelte';
  import { Menus, Modals } from '../ModalManager.svelte';

  import ModalButton from '$lib/components/Buttons/ModalButton.svelte';
  import { character } from '../../../routes/CharacterStore';

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
  {#if $character.roleHasDifficultySetting}
    <ModalButton
      type="flat"
      modal={Modals.DifficultySetting}>Preferences</ModalButton
    >
  {/if}
  <ModalButton
    type="flat"
    modal={Menus.Share}>Share</ModalButton
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
