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

  function wheel(ev: WheelEvent) {
    if (!ageDisplay) {
      return;
    }
    if (ev.deltaY > 0) {
      decrement();
    } else {
      increment();
    }
    ev.preventDefault();
  }

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
  <SlateButton on:click={show}>
    <div class="worn-text">
      Age {age}
    </div>
  </SlateButton>
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
