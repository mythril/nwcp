<script lang="ts">
  import MiniDialog from '../Widgets/MiniDialog.svelte';
  import BigCaret from '../Widgets/BigCaret.svelte';
  import { name } from '../CharacterStore';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let dlg: MiniDialog;
  let text = $name;

  const commit = () => {
    $name = text;
    dispatch('modal-hide');
    return true;
  };

  export const enter = () => {
    dlg.enter();
  };

  export const leave = () => {
    
  }

  const cancel = () => {
    text = $name;
    dispatch('modal-hide');
  };

  function controlKeys(event: KeyboardEvent) {
    switch (event.key) {
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
    bind:this={dlg}
    on:modal-commit={commit}
    on:modal-cancel={cancel}
    on:modal-hide
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
