<script lang="ts">
  import MiniDialog from '../Widgets/MiniDialog.svelte';
  import BigCaret from '../Widgets/BigCaret.svelte';
  import { name } from '../CharacterStore';

  import { createEventDispatcher } from 'svelte';
  import {
    ModalNavEvents,
    type ModalEventSignature
  } from '../ModalManager.svelte';
  import { anchors, updateAnchors } from '../Widgets/Anchor.svelte';
  const dispatch = createEventDispatcher<ModalEventSignature>();

  $updateAnchors.push('name');
  $updateAnchors = $updateAnchors;

  let text = $name;

  const commit = () => {
    $name = text;
    dispatch(ModalNavEvents.navExit);
    return true;
  };

  export const enter = () => {
    // intentional
  };

  export const leave = () => {
    // intentional
  };

  const cancel = () => {
    text = $name;
    dispatch(ModalNavEvents.navBack);
  };

  function controlKeys(event: KeyboardEvent) {
    switch (event.code) {
      case 'Enter':
        commit();
        return;
      default:
        return;
    }
  }
</script>

<svelte:body on:keydown={controlKeys} />

<div class="root">
  <MiniDialog
    anchorLeft={$anchors['name'].left}
    anchorTop={$anchors['name'].top}
    on:dataCommit={commit}
    on:dataCancel={cancel}
    on:navBack
    on:navExit
  >
    <BigCaret
      class="input-name sharp-inset-border"
      bind:value={text}
    />
  </MiniDialog>
</div>

<style lang="postcss">
  :global(.input-name) {
    font-weight: 700;
    width: 100%;
    min-width: 99rem;
    margin: 0 auto;
    font-size: 8rem;
    line-height: 1.6;
    padding-left: 1em;
    padding-right: 1em;
    background-color: hsl(var(--terminal-bg));
    color: hsl(var(--terminal-color));
  }
  .root {
    height: 100%;
  }
</style>
