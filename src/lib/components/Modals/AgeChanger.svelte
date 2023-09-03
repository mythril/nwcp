<script lang="ts">
  import MiniDialog from '$lib/components/MiniDialog.svelte';
  import Arrow from '$lib/components/icons/Arrow.svelte';
  import TwoDigitDisplay from '$lib/components/TwoDigitDisplay.svelte';
  import PlateButton from '$lib/components/Buttons/PlateButton.svelte';
  import { clickSound, createDebouncer } from '$lib/utils';

  import { createEventDispatcher } from 'svelte';
  import { anchors, updateAnchors } from '$lib/components/Anchor.svelte';
  import {
    ModalNavEvents,
    type ModalEventSignature
  } from '$lib/components/Modal.svelte';
  import { character } from '../../../routes/CharacterStore';
  const dispatch = createEventDispatcher<ModalEventSignature>();

  let tmp = $character.age;
  let ageDisplay: TwoDigitDisplay;

  $updateAnchors.push('age');
  $updateAnchors = $updateAnchors;

  const commit = () => {
    $character.age = tmp;
    dispatch(ModalNavEvents.navExit);
    return true;
  };

  const cancel = () => {
    tmp = $character.age;
    dispatch(ModalNavEvents.navBack);
  };

  export const enter = () => {
    //intentional
  };

  export const leave = () => {
    //intentional
  };

  const increment = () => {
    if (ageDisplay.increment()) {
      clickSound();
    }
  };

  const decrement = () => {
    if (ageDisplay.decrement()) {
      clickSound();
    }
  };

  let wheelCanFire = createDebouncer();
  function wheel(ev: WheelEvent) {
    ev.preventDefault();
    if (!wheelCanFire()) {
      return;
    }
    if (!ageDisplay) {
      return;
    }
    if (ev.deltaY > 0) {
      decrement();
    } else {
      increment();
    }
  }
</script>

<div class="root">
  <MiniDialog
    anchorTop={$anchors['age'].top}
    anchorLeft={$anchors['age'].left}
    on:dataCommit={commit}
    on:dataCancel={cancel}
    on:navBack
    on:navExit
  >
    <div
      on:wheel={wheel}
      class="age-editor"
    >
      <PlateButton
        pushButton={false}
        wornText={false}
        class="outer-plate"
        on:click={decrement}
      >
        <div class="plate">
          <div class="btn">
            <Arrow
              wornText
              dir="Left"
            />
          </div>
        </div>
      </PlateButton>
      <div class="sharp-inset-border">
        <TwoDigitDisplay
          bind:this={ageDisplay}
          bind:value={tmp}
          min={16}
          max={35}
        />
      </div>
      <PlateButton
        pushButton={false}
        wornText={false}
        class="outer-plate"
        on:click={increment}
      >
        <div class="plate">
          <div class="btn">
            <Arrow wornText />
          </div>
        </div>
      </PlateButton>
    </div>
  </MiniDialog>
</div>

<style lang="postcss">
  .age-editor :global(.outer-plate) {
    filter: drop-shadow(-1rem 1rem 1rem #000);
    border-radius: 0;
    padding: 0;
    width: 39rem;
    height: 21rem;
    &:first-child {
      margin-left: -13rem;
    }
    &:last-child {
      margin-right: -13rem;
    }
  }
  .age-editor {
    display: flex;
    gap: 3rem;
    height: 19rem;
    align-items: center;
  }
  .plate {
    width: 16rem;
    height: 25rem;
    margin: auto;

    .btn {
      background: hsl(var(--bg));
      position: relative;
      top: 5rem;
      height: 12rem;
      width: 17rem;
      padding: 2rem 0;
      transition: box-shadow 0.1s linear;
      /* prettier-ignore */
      box-shadow: 
        var(--light-source),
        var(--cast-shadow),
        var(--shadow-border),
        var(--inset);
      &:active {
        /* prettier-ignore */
        box-shadow: 
          var(--light-source-clear),
          var(--cast-shadow-clear),
          var(--shadow-border),
          var(--inset);
      }
    }
    :global(svg) {
      fill: hsl(var(--title-color));
      max-width: 100%;
      max-height: 100%;
    }
  }
  .root {
    height: 100%;
  }
</style>
