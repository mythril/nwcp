<script lang="ts">
  import FlatButton from '$lib/components/Buttons/FlatButton.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import debug from '$lib/debug';
  import { character, loadFromChar } from '../../../routes/CharacterStore';
  import { errorMessage } from '../ErrorMessageStore';

  import { createEventDispatcher } from 'svelte';
  import {
    ModalNavEvents,
    type ModalEventSignature
  } from '$lib/components/Modal.svelte';
  import {
    CodecError,
    bytesToBase64,
    constructFromRole,
    detectRoleBinary,
    packer,
    unpacker
  } from '$lib/engines/BitPacking';
  import type { UnfinishedCharacter } from '$lib/engines/UnfinishedCharacter';
  import { RoleRoutes } from '$lib/engines/all';
  const dispatch = createEventDispatcher<ModalEventSignature>();

  let char: UnfinishedCharacter;

  export const enter = () => {
    const cTor = Object.getPrototypeOf($character).constructor;
    char = Object.assign(new cTor(), $character);
  };

  export const leave = () => {
    // intentional
  };

  const saveToDisk = () => {
    const packed = packer(char.getPackingDescriptors(), char.toJSON());
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

  let fileInput: HTMLInputElement;

  let files: FileList;

  $: if (files != null && files.length > 0) {
    files
      ?.item(0)
      ?.arrayBuffer()
      .then(async (data: ArrayBuffer) => {
        const bytes = new Uint8Array(data);
        const role = detectRoleBinary(bytes);
        if (role !== $character.role) {
          window.location.replace(
            RoleRoutes[role] + '#' + bytesToBase64(bytes)
          );
        }
        const mut = await constructFromRole(role);
        loadFromChar(
          unpacker(new Uint8Array(data), mut.getPackingDescriptors(), mut)
        );
      })
      .catch(async (err) => {
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
