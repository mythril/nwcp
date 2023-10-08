<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import FlatButton from '../Buttons/FlatButton.svelte';
  import { toast } from '../Toast.svelte';
  import { ModalNavEvents, type ModalEventSignature } from '../Modal.svelte';
  import Menu from '../Menu.svelte';
  import { character } from '../../../routes/CharacterStore';
  import type { UnfinishedCharacter } from '$lib/engines/UnfinishedCharacter';
  import { charToBase64 } from '$lib/engines/BitPacking';
  const dispatch = createEventDispatcher<ModalEventSignature>();
  let char: UnfinishedCharacter;
  let charHash: string;

  export const enter = () => {
    const cTor = Object.getPrototypeOf($character).constructor;
    char = Object.assign(new cTor(), $character);
    charHash = charToBase64(char);
  };

  export const leave = () => {
    // intentional
  };

  const copyToClipboard = async (toCopy: string, success: string) => {
    try {
      await navigator.clipboard.writeText(toCopy);
      toast.success({ message: success });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err);
      }
    }
  };

  const mouseHandler = (action: () => Promise<void>) => {
    return async (e: MouseEvent) => {
      if (!e.target) {
        return;
      }
      await action();
      e.preventDefault();
      e.stopPropagation();
      dispatch(ModalNavEvents.navExit);
      return false;
    };
  };

  const copyLink = mouseHandler(async () => {
    const charLink = window.location.href.split('#')[0] + '#' + charHash;
    await copyToClipboard(charLink, 'CHARACTER LINK COPIED');
  });

  const copyCustomEmbed = mouseHandler(async () => {
    const s = 'script';
    const customEmbed = `
      <${s} type="text/javascript" src="${window.location.origin}/c.js"></${s}>
      <nw-cp char="${charHash}"></nw-cp>
    `;
    await copyToClipboard(customEmbed, 'EMBED CODE COPIED');
  });

  const copyBBCodeEmbed = mouseHandler(async () => {
    const BBCode = `[NWCP]${charHash}[/NWCP]`;
    await copyToClipboard(BBCode, 'BBCODE COPIED');
  });
</script>

<Menu
  on:dataCommit
  on:dataCancel
  on:navBack
  on:navExit
>
  <FlatButton
    type="link"
    href={'#' + charHash}
    on:click={() => dispatch(ModalNavEvents.navExit)}
    target="_blank">Open link to char</FlatButton
  >
  {#if navigator.clipboard}
    <FlatButton on:click={copyLink}>Copy link to char</FlatButton>
    <FlatButton on:click={copyCustomEmbed}>Copy embed code</FlatButton>
    <FlatButton on:click={copyBBCodeEmbed}>Copy BBCode</FlatButton>
  {/if}
  <FlatButton on:click={() => dispatch(ModalNavEvents.navBack)}>Back</FlatButton
  >
</Menu>
