<script lang="ts">
  import { charToBase64, packer } from '$lib/codec';
  import { Role } from '$lib/engines/all';
  import FlatButton from './Buttons/FlatButton.svelte';
  import Menu from './Menu.svelte';
  import {
    age,
    attributes,
    chosenTraits,
    difficulty,
    errorMessage,
    name,
    sex,
    taggedSkills,
    toast
  } from './stores';
  import { onMount } from 'svelte';
  import { CodecError, base64ToChar, unpacker } from '$lib/codec';
  import type {
    Skill,
    Trait,
    UnfinishedChar
  } from '$lib/engines/ChosenOne/main';
  import type { ObjectValues } from '$lib/typeUtils';
  import { objectKeys } from 'tsafe';
  import debug from '$lib/debug';

  let char: UnfinishedChar;
  let charHash: string;

  let menu: Menu;

  export const show = () => {
    char = {
      role: Role.ChosenOne,
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
  };

  const saveToDisk = () => {
    const packed = packer(char);
    const blob = new Blob([packed], { type: 'application/octet-stream' });
    const file = new File([blob], (char.name || char.role) + '.nwcp');
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
    menu.hide();
  };

  const copyToClipboard = async (e: MouseEvent) => {
    if (!e.target) {
      return;
    }
    const charLink = window.location.href.split('#')[0] + '#' + charHash;
    try {
      await navigator.clipboard.writeText(charLink);
      toast.success({ message: 'CHARACTER LINK COPIED' });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err);
      }
    }
    e.preventDefault();
    e.stopPropagation();
    menu.hide();
    return false;
  };

  let fileInput: HTMLInputElement;

  export const loadFromChar = (char: UnfinishedChar) => {
    $name = char.name;
    $age = char.age;
    $sex = char.sex;
    //$attributes
    for (let key of objectKeys($attributes)) {
      $attributes[key] = char.attributes[key];
    }
    const isTrait = (
      item: ObjectValues<typeof Trait> | undefined
    ): item is ObjectValues<typeof Trait> => {
      return !!item;
    };
    $chosenTraits = char.traits.filter(isTrait);
    const isTaggedSkill = (
      item: ObjectValues<typeof Skill> | undefined
    ): item is ObjectValues<typeof Skill> => {
      return !!item;
    };
    $taggedSkills = char.tagged.filter(isTaggedSkill);
    menu.hide();
  };

  onMount(() => {
    try {
      if (window.location.hash.length > 1) {
        loadFromChar(base64ToChar(window.location.hash.slice(1)));
      }
    } catch (err) {
      let em = 'Unknown error.';
      if (err instanceof CodecError) {
        em = err.message;
      }
      $errorMessage = em;
      debug.error(err);
    }
  });

  let files: FileList;

  $: if (files != null && files.length > 0) {
    files
      ?.item(0)
      ?.arrayBuffer()
      .then((data: ArrayBuffer) => {
        loadFromChar(unpacker(new Uint8Array(data)));
      })
      .catch((err) => {
        let em = 'Unknown error.';
        if (err instanceof CodecError) {
          em = err.message;
        }
        $errorMessage = em;
        debug.error(err);
      });
  }
</script>

<Menu bind:this={menu}>
  <FlatButton on:click={saveToDisk}>Save To Disk</FlatButton>
  <FlatButton
    type="link"
    href={'#' + charHash}
    target="_blank">Open link to char</FlatButton
  >
  {#if navigator.clipboard}
    <FlatButton on:click={copyToClipboard}>Copy link to char</FlatButton>
  {/if}

  <FlatButton
    on:click={() => {
      if (fileInput) {
        fileInput.click();
      }
    }}
  >
    <div class="offscreen">
      <input
        bind:this={fileInput}
        bind:files
        accept=".nwcp"
        type="file"
      />
    </div>
    Load</FlatButton
  >
</Menu>
