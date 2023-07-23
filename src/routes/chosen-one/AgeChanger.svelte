<script lang="ts">
  import { onMount } from 'svelte';
  import MiniDialog from './MiniDialog.svelte';
  import SlateButton from './SlateButton.svelte';
  import Arrow from '$lib/components/icons/Arrow.svelte';
  import TwoDigitDisplay from './TwoDigitDisplay.svelte';
  import PlateButton from './PlateButton.svelte';
  import { clickSound } from '$lib/utils';

  export let age = 25;
  let tmp = 25;
  let ageDisplay: TwoDigitDisplay;

  let dlg: MiniDialog;

  const commit = () => {
    age = tmp;
    return true;
  };

  const cancel = () => {
    tmp = age;
  };

  let show = () => {
    cancel();
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
    <div class="age-editor">
      <PlateButton
        pushButton={false}
        wornText={false}
        class="outer-plate"
        on:click={decrement}
      >
        <div class="plate">
          <div class="button">
            <Arrow
              wornText
              dir="Left"
            />
          </div>
        </div>
      </PlateButton>
      <div class="age-display">
        <TwoDigitDisplay
          bind:this={ageDisplay}
          initial={tmp}
          min={16}
          max={35}
          onChange={(v) => (tmp = v)}
        />
      </div>
      <PlateButton
        pushButton={false}
        wornText={false}
        class="outer-plate"
        on:click={increment}
      >
        <div class="plate">
          <div class="button">
            <Arrow wornText />
          </div>
        </div>
      </PlateButton>
    </div>
  </MiniDialog>
  <SlateButton on:click={show}>
    <div class="worn-text">
      Age {age}
    </div>
  </SlateButton>
</div>

<style lang="scss">
  .root :global(.outer-plate) {
    filter: drop-shadow(px(-1) px(1) px(1) #000);
    border-radius: 0;
  }
  .age-editor {
    display: flex;
    gap: px(4);
    align-items: center;
  }
  .age-display {
    border-top: px(3) solid darken($root-bg, 10%);
    border-left: px(4) solid lighten($root-bg, 45%);
    border-right: px(4) solid lighten($root-bg, 5%);
    border-bottom: px(3) solid lighten($root-bg, 25%);
  }
  .plate {
    width: px(25);
    height: px(25);

    .button {
      position: relative;
      top: px(5);
      height: px(15);
      padding: px(2) 0;
      transition: box-shadow 0.1s linear;
      box-shadow: inset px(-1) px(1) px(2) px(0) rgba(#fff, 0.4),
        px(-5) px(5) px(5) px(0) rgba(#000, 0.95),
        px(0) px(0) px(0) px(1) darken($root-bg, 10%),
        px(0) px(0) px(1) px(1) darken($root-bg, 2%),
        px(0) px(0) px(3) px(1) lighten($root-bg, 5%);
      &:active {
        box-shadow: inset px(0) px(0) px(0) px(0) rgba(#fff, 0),
          px(0) px(0) px(0) px(0) rgba(#000, 0),
          px(0) px(0) px(0) px(1) darken($root-bg, 10%),
          px(0) px(0) px(1) px(1) darken($root-bg, 2%),
          px(0) px(0) px(3) px(1) lighten($root-bg, 5%);
      }
    }
    :global(svg) {
      fill: $title-color;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .root {
    height: 100%;
  }
</style>
