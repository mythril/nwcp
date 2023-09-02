<script lang="ts">
  import MiniDialog from '$lib/components/MiniDialog.svelte';
  import SlateButton from '$lib/components/Buttons/SlateButton.svelte';
  import Male from '$lib/components/icons/Male.svelte';
  import Female from '$lib/components/icons/Female.svelte';
  import { Sex } from '$lib/engines/ChosenOne/main';
  import type { ObjectValues } from '$lib/typeUtils';
  import { sex } from '../../../routes/chosen-one/CharacterStore';

  import { createEventDispatcher } from 'svelte';
  import { anchors, updateAnchors } from '$lib/components/Anchor.svelte';
  import {
    ModalNavEvents,
    type ModalEventSignature
  } from '$lib/components/Modal.svelte';
  const dispatch = createEventDispatcher<ModalEventSignature>();

  $updateAnchors.push('sex');
  $updateAnchors = $updateAnchors;

  let tmp: ObjectValues<typeof Sex> = $sex;

  const cancel = () => {
    tmp = $sex;
    dispatch(ModalNavEvents.navBack);
  };

  const commit = () => {
    $sex = tmp;
    dispatch(ModalNavEvents.navExit);
    return true;
  };

  export const enter = () => {
    //intentional
  };

  export const leave = () => {
    //intentional
  };
</script>

<div class="root">
  <MiniDialog
    anchorLeft={$anchors['sex'].left}
    anchorTop={$anchors['sex'].top}
    on:dataCommit={commit}
    on:dataCancel={cancel}
    on:navBack
    on:navExit
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
</div>

<style lang="postcss">
  .root {
    height: 100%;
  }
  .buttons {
    width: 99rem;
    height: 24rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    gap: 10rem;
    .worn-text {
      padding: 0rem;
      height: 36rem;
      transform: none;
    }
    :global(.sex-btn) {
      width: 40rem;
      height: 36rem;
      margin-top: -5rem;
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
    margin-top: 1rem;
    max-width: 85%;
    max-height: 85%;
    fill: hsl(var(--title-color));
    stroke: hsl(var(--title-color-hs), calc(var(--title-color-l) - 20%));
    stroke-width: 0.2rem;
  }
</style>
