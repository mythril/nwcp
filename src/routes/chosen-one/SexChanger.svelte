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
        class="sex-btn"
        on:click={() => (tmp = Sex.Male)}
      >
        <div class="worn-text">
          <Male />
        </div>
      </SlateButton>
      <SlateButton
        checked={tmp === Sex.Female}
        class="sex-btn"
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
    gap: 10rem;
    .worn-text {
      width: 45rem;
      height: 45rem;
      padding: 0;
      padding-top: 4rem;
    }
    :global(.sex-btn) {
      /* prettier-ignore */
      box-shadow: 
        var(--shadow-border),
        var(--light-source),
        var(--sunken-clear),
        var(--cast-shadow),
        var(--inset);
    }
    :global(.sex-btn.checked),
    :global(.sex-btn:active) {
      /* prettier-ignore */
      box-shadow:
        var(--shadow-border),
        var(--light-source-clear),
        var(--sunken),
        var(--cast-shadow-clear),
        var(--inset);
    }
  }
  .buttons .worn-text :global(svg) {
    max-width: 80%;
    max-height: 80%;
    fill: hsl(var(--title-color));
    stroke: hsl(var(--title-color-hs), calc(var(--title-color-l) - 20%));
    stroke-width: 0.2rem;
  }
</style>
