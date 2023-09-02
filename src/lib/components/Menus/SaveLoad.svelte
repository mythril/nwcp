<script lang="ts">
  import { charToBase64, packer } from '$lib/codec';
  import { Role } from '$lib/engines/all';
  import FlatButton from '$lib/components/Buttons/FlatButton.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import { CodecError, unpacker } from '$lib/codec';
  import type { UnfinishedChar } from '$lib/engines/ChosenOne/main';
  import debug from '$lib/debug';
  import {
    age,
    attributes,
    chosenTraits,
    difficulty,
    loadFromChar,
    name,
    sex,
    taggedSkills
  } from '../../../routes/chosen-one/CharacterStore';
  import { errorMessage } from '../Modals/ErrorMessage.svelte';

  import { createEventDispatcher } from 'svelte';
  import { toast } from '../Toast.svelte';
  import {
    ModalNavEvents,
    type ModalEventSignature
  } from '$lib/components/Modal.svelte';
  const dispatch = createEventDispatcher<ModalEventSignature>();

  let char: UnfinishedChar;
  let charHash: string;

  export const enter = () => {
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
  };

  export const leave = () => {
    // intentional
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
    dispatch(ModalNavEvents.navExit);
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
    dispatch(ModalNavEvents.navExit);
    return false;
  };

  let fileInput: HTMLInputElement;

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

<Menu
  on:dataCommit
  on:dataCancel
  on:navBack
  on:navExit
>
  <FlatButton on:click={saveToDisk}>Save To Disk</FlatButton>
  <FlatButton
    type="link"
    href={'#' + charHash}
    on:click={() => dispatch(ModalNavEvents.navExit)}
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
  <FlatButton on:click={() => dispatch(ModalNavEvents.navBack)}>Back</FlatButton
  >
</Menu>