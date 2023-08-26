<script lang="ts">
  import FlatButton from '../Widgets/Buttons/FlatButton.svelte';
  import Menu from '../Widgets/Menu.svelte';
  import { resetCharacter } from '../CharacterStore';
  import { Menus, Modals, showModal } from '../ModalManager.svelte';

  import { createEventDispatcher } from 'svelte';
  import {
    ModalNavEvents,
    type ModalEventSignature
  } from '../ModalManager.svelte';
  const dispatch = createEventDispatcher<ModalEventSignature>();

  export const enter = () => {
    // intentional
  };

  export const leave = () => {
    // intentional
  };

  const resetChar = () => {
    if (
      !confirm(
        'You will lose the current character if you have not saved it. Are you sure?'
      )
    ) {
      return;
    }
    resetCharacter();
    dispatch(ModalNavEvents.navExit);
  };
</script>

<Menu
  on:navBack
  on:navExit
>
  <FlatButton on:click={() => showModal(Modals.DifficultySetting)}
    >Preferences</FlatButton
  >
  <FlatButton on:click={() => showModal(Menus.SaveLoad)}>Save/Load</FlatButton>
  <FlatButton on:click={resetChar}>Erase</FlatButton>
</Menu>
