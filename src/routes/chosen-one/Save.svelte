<script lang="ts">
  import { charToBase64, packer } from '$lib/codec';
  import { Game } from '$lib/engines/all';
  import type { UnfinishedChar } from '$lib/engines/ChosenOne/main';
  import FlatButton from './Buttons/FlatButton.svelte';
  import Menu from './Menu.svelte';
  import PlateButton from './PlateButton.svelte';
  import {
    age,
    attributes,
    chosenTraits,
    difficulty,
    name,
    sex,
    taggedSkills
  } from './stores';

  let char: UnfinishedChar;
  let charHash: string;
  function openMenu() {
    char = {
      game: Game.ChosenOne,
      difficulty: $difficulty,
      name: $name,
      age: $age,
      sex: $sex,
      attributes: $attributes,
      tagged: $taggedSkills,
      traits: $chosenTraits
    };
    charHash = charToBase64(char);
    if (menu) {
      menu.show();
    }
  }
  let menu: Menu;

  const saveToDisk = () => {
    const packed = packer(char);
    const blob = new Blob([packed], { type: 'application/octet-stream' });
    const file = new File([blob], (char.name || char.game) + '.nwcp');
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.setAttribute('download', file.name);
    a.setAttribute('href', url);
    a.style.display = 'none';
    document.body.append(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 1000);
  };
</script>

<Menu bind:this={menu}>
  <FlatButton on:click={saveToDisk}>Save To Disk</FlatButton>
  <FlatButton
    type="link"
    href={'#' + charHash}
    target="_blank">Link to char</FlatButton
  >
</Menu>

<PlateButton
  on:click={openMenu}
  class="save">Save</PlateButton
>
