<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import FlatButton from '../Widgets/Buttons/FlatButton.svelte';
  import Menu from '../Widgets/Menu.svelte';
  import { resetCharacter } from '../stores';

  const dispatch = createEventDispatcher();

  export const enter = (): void => {};

  export const leave = (): void => {};

  export let showModal = (module: string) => {
    // intentional
  };

  export let loadModal = (module: string) => {
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

  let optionsMenu: Menu;
</script>

<Menu
  bind:this={optionsMenu}
  on:modal-hide
>
  <FlatButton on:click={() => showModal('DifficultySetting')}
    >Preferences</FlatButton
  >
  <FlatButton on:click={() => showModal('SaveLoad')}>Save/Load</FlatButton>
  <FlatButton on:click={resetChar}>Erase</FlatButton>
</Menu>
