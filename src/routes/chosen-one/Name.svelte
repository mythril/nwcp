<script lang="ts">
  import { onMount } from 'svelte';
  import MiniDialog from './MiniDialog.svelte';
  import SlateButton from './SlateButton.svelte';
  import BigCaret from './BigCaret.svelte';

  export let name = '';

  let dlg: MiniDialog;
  let text = '';
  let show = () => {
    //intentional
  };

  onMount(() => {
    show = () => dlg.show();
  });
</script>

<div>
  <MiniDialog
    bind:this={dlg}
    commitListener={() => {
      name = text;
      return true;
    }}
    cancelListener={() => {
      text = name;
    }}
  >
    <BigCaret
      class="input-name"
      bind:value={text}
    />
  </MiniDialog>
  <SlateButton on:click={show}>
    {name || 'none'}
  </SlateButton>
</div>

<style lang="scss">
  :global(.input-name) {
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
  div {
    height: 100%;
  }
</style>
