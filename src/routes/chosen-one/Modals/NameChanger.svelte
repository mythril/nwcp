<script lang="ts">
  import { onMount } from 'svelte';
  import MiniDialog from '../Widgets/MiniDialog.svelte';
  import SlateButton from '../Widgets/Buttons/SlateButton.svelte';
  import BigCaret from '../Widgets/BigCaret.svelte';

  export let value = '';

  let dlg: MiniDialog;
  let text = '';

  const commit = () => {
    value = text;
    return true;
  };

  const cancel = () => {
    text = value;
  };

  let show = () => {
    //intentional
  };

  function controlKeys(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        commit();
        dlg.hide();
        return;
      default:
        return;
    }
  }

  onMount(() => {
    show = () => {
      text = value;
      dlg.show();
    };
  });
</script>

<svelte:body on:keydown={controlKeys} />

<div class="root">
  <MiniDialog
    bind:this={dlg}
    on:modal-commit={commit}
    on:modal-cancel={cancel}
  >
    <BigCaret
      class="input-name sharp-inset-border"
      bind:value={text}
    />
  </MiniDialog>
  <SlateButton on:click={show}>
    <div class="worn-text">
      {value || 'none'}
    </div>
  </SlateButton>
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
