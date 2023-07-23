<script lang="ts">
  import { onMount } from 'svelte';
  import MiniDialog from './MiniDialog.svelte';
  import SlateButton from './SlateButton.svelte';
  import BigCaret from './BigCaret.svelte';

  export let name = '';

  let dlg: MiniDialog;
  let text = '';

  const commit = () => {
    name = text;
    return true;
  };

  const cancel = () => {
    text = name;
  };

  let show = () => {
    //intentional
  };

  onMount(() => {
    show = () => {
      text = name;
      dlg.show();
    };
  });
</script>

<div class="root">
  <MiniDialog
    bind:this={dlg}
    commitListener={commit}
    cancelListener={cancel}
  >
    <BigCaret
      class="input-name"
      bind:value={text}
    />
  </MiniDialog>
  <SlateButton on:click={show}>
    <div class="worn-text">
      {name || 'none'}
    </div>
  </SlateButton>
</div>

<style lang="scss">
  :global(.input-name) {
    font-weight: 700;
    width: 100%;
    margin: 0 auto;
    font-size: px(10);
    line-height: 1.6;
    padding-left: 1em;
    padding-right: 1em;
    border-top: px(3) solid darken($root-bg, 10%);
    border-left: px(4) solid lighten($root-bg, 45%);
    border-right: px(4) solid lighten($root-bg, 5%);
    border-bottom: px(3) solid lighten($root-bg, 25%);
    background-color: $terminal-bg;
    color: $terminal-text;
  }
  .root {
    height: 100%;
  }
</style>
