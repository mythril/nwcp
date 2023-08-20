<script lang="ts">
  import { Role } from '$lib/engines/all';
  import { Special, Difficulty, Sex } from '$lib/engines/ChosenOne/main';
  import FlatButton from './Buttons/FlatButton.svelte';
  import DifficultySetting from './DifficultySetting.svelte';
  import Menu from './Menu.svelte';
  import PlateButton from './PlateButton.svelte';
  import SaveLoad from './SaveLoad.svelte';

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

  function showSaveLoad() {
    if (optionsMenu) {
      optionsMenu.hide();
    }
    if (saveLoad) {
      saveLoad.show();
    }
  }

  const resetChar = () => {
    if (
      !confirm(
        'You will lose the current character if you have not saved it. Are you sure?'
      )
    ) {
      return;
    }
    saveLoad.loadFromChar({
      age: 25,
      role: Role.ChosenOne,
      difficulty: Difficulty.Normal,
      name: '',
      sex: Sex.Male,
      tagged: [],
      attributes: {
        [Special.Strength]: 5,
        [Special.Perception]: 5,
        [Special.Endurance]: 5,
        [Special.Charisma]: 5,
        [Special.Intelligence]: 5,
        [Special.Agility]: 5,
        [Special.Luck]: 5
      },
      traits: []
    });
  };

  let optionsMenu: Menu;
  let diffMenu: DifficultySetting;
  let saveLoad: SaveLoad;
</script>

<Menu bind:this={optionsMenu}>
  <FlatButton on:click={showDifficultyMenu}>Preferences</FlatButton>
  <FlatButton on:click={showSaveLoad}>Save/Load</FlatButton>
  <FlatButton on:click={resetChar}>Erase</FlatButton>
</Menu>

<DifficultySetting
  on:menu-close={openMenu}
  bind:this={diffMenu}
/>

<SaveLoad
  on:modal-commit={openMenu}
  bind:this={saveLoad}
/>

<PlateButton
  on:click={openMenu}
  class="save">Options</PlateButton
>
