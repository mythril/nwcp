<script lang="ts">
  import { onMount } from 'svelte';
  import MiniDialog from './MiniDialog.svelte';
  import SlateButton from './SlateButton.svelte';

  export let age = 25;

  let dlg: MiniDialog;

  let show = () => {
    //intentional
  };

  onMount(() => {
    show = () => {
      dlg.show();
    };
  });
</script>

<div>
  <MiniDialog
    bind:this={dlg}
    commitListener={() => {
      return true;
    }}
    cancelListener={() => {
      //intentional
    }}
  />
  <SlateButton on:click={show}>
    Age {age}
  </SlateButton>
</div>

<style lang="scss">
  div {
    height: 100%;
  }
</style>
