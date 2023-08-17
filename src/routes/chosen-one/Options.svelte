<script lang="ts">
  import FlatButton from './Buttons/FlatButton.svelte';
  import Difficulty from './Difficulty.svelte';
  import Menu from './Menu.svelte';
  import PlateButton from './PlateButton.svelte';

  function openMenu() {
    if (optionsMenu) {
      optionsMenu.show();
    }
  }
  function showDifficultyMenu() {
    if (optionsMenu) {
      optionsMenu.hide();
    }
    if (diffMenu) {
      diffMenu.show();
    }
  }
  let optionsMenu: Menu;
  let diffMenu: Difficulty;
</script>

<Menu bind:this={optionsMenu}>
  <FlatButton on:click={showDifficultyMenu}>Preferences</FlatButton>
</Menu>

<Difficulty bind:this={diffMenu} />

<PlateButton
  on:click={openMenu}
  class="save">Options</PlateButton
>
