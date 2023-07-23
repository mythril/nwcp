<script lang="ts">
  import { onMount } from 'svelte';
  import MiniDialog from './MiniDialog.svelte';
  import SlateButton from './SlateButton.svelte';
  import Male from '$lib/components/icons/Male.svelte';
  import Female from '$lib/components/icons/Female.svelte';
  import { Sex, type SEX } from '$lib/engines/ChosenOne';

  export let sex: SEX = Sex.Male;

  let dlg: MiniDialog;

  let tmp: SEX = Sex.Male;

  const cancel = () => {
    tmp = sex;
  };

  const commit = () => {
    sex = tmp;
    return true;
  };

  let show = () => {
    cancel();
  };

  onMount(() => {
    show = () => {
      cancel();
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
    <div class="buttons">
      <SlateButton
        checked={tmp === Sex.Male}
        on:click={() => (tmp = Sex.Male)}
      >
        <div class="worn-text">
          <Male />
        </div>
      </SlateButton>
      <SlateButton
        checked={tmp === Sex.Female}
        on:click={() => (tmp = Sex.Female)}
      >
        <div class="worn-text">
          <Female />
        </div>
      </SlateButton>
    </div>
  </MiniDialog>
  <SlateButton on:click={show}>
    <div class="worn-text">
      {sex}
    </div>
  </SlateButton>
</div>

<style lang="scss">
  .root {
    height: 100%;
  }
  .buttons {
    display: flex;
    align-items: stretch;
    gap: px(10);
    .worn-text {
      width: px(45);
      height: px(45);
      padding: px(0);
      padding-top: px(4);
    }
  }
  .buttons .worn-text :global(svg) {
    max-width: 80%;
    max-height: 80%;
    fill: $title-color;
    stroke: darken($title-color, 20%);
    stroke-width: px(0.2);
  }
</style>
