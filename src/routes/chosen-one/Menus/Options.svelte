<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import FlatButton from '../Widgets/Buttons/FlatButton.svelte';
  import Menu from '../Widgets/Menu.svelte';
  import { resetCharacter } from '../CharacterStore';
  import { Menus, showModal } from '../Modals/ModalManager.svelte';

  const dispatch = createEventDispatcher();

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
    dispatch('modal-hide');
  };
</script>

<Menu
  on:modal-hide
  on:menu-close
>
  <FlatButton on:click={() => showModal(Menus.DifficultySetting)}
    >Preferences</FlatButton
  >
  <FlatButton on:click={() => showModal(Menus.SaveLoad)}>Save/Load</FlatButton>
  <FlatButton on:click={resetChar}>Erase</FlatButton>
</Menu>
