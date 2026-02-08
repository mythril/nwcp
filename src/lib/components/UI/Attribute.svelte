<script lang="ts">
  import { run } from 'svelte/legacy';

  import { createDebouncer } from '$lib/utils';
  import { createEventDispatcher } from 'svelte';
  import TwoDigitDisplay from '$lib/components/TwoDigitDisplay.svelte';
  import { clickSound } from '$lib/browserUtils';

  interface Props {
    label: string;
    value: number;
    display: number;
    min?: number;
    charPointsRemaining?: number;
  }

  let {
    label,
    value = $bindable(),
    display = $bindable(),
    min = 1,
    charPointsRemaining = 10
  }: Props = $props();

  let dispatcher = createEventDispatcher();

  let descriptors = [
    'V.Bad',
    'Bad',
    'Poor',
    'Fair',
    'Avrg',
    'Good',
    'V.Good',
    'Great',
    'Exclnt',
    'Heroic'
  ];
  let attr: TwoDigitDisplay = $state();
  let descIndex = $state(0);

  run(() => {
    descIndex = display - 1;
  });

  const increment = () => {
    if (attr.increment()) {
      clickSound();
    } else {
      if (charPointsRemaining === 0) {
        dispatcher('charPointsRemainingBonk', { label, value });
      }
    }
  };

  const decrement = () => {
    if (attr.decrement()) {
      clickSound();
    }
  };

  let wheelCanFire = createDebouncer();
  function wheel(ev: WheelEvent) {
    ev.preventDefault();
    if (!wheelCanFire()) {
      return;
    }
    if (!attr) {
      return;
    }
    if (ev.deltaY > 0) {
      decrement();
    } else {
      increment();
    }
  }
</script>

<div
  onwheel={wheel}
  class="attribute"
>
  <div class="label worn-text">
    {label}
  </div>
  <div class="two-digit-attr">
    <div class="beforeDash worn-text"></div>
    <div class="two-digit-border">
      <TwoDigitDisplay
        bind:this={attr}
        bind:value
        bind:display
        {min}
        max={Math.min(10, value + charPointsRemaining)}
      />
    </div>
    <div class="afterDash worn-text"></div>
  </div>
  <div class="description terminal-font-defaults sharp-inset-border">
    {descriptors[descIndex]}
  </div>
  <div class="manipulators">
    <button
      class="incr"
      onclick={increment}>+</button
    >
    <button
      class="decr"
      onclick={decrement}>-</button
    >
  </div>
</div>

<style lang="postcss">
  .attribute {
    box-sizing: border-box;
    padding: 0 0;
    display: flex;
    width: 100%;
    height: 33rem;
    justify-content: space-between;
    align-items: center;
  }
  .label {
    text-align: center;
    font-size: 22rem;
    width: 29rem;
  }
  .two-digit-attr {
    position: relative;
    .beforeDash,
    .afterDash {
      position: absolute;
      top: 50%;
      content: ' ';
      background-color: hsl(var(--title-color));
      margin-top: -1rem;
      height: 2rem;
    }
    .afterDash {
      left: 39rem;
      width: 4rem;
    }
    .beforeDash {
      right: 39rem;
      width: 7rem;
    }
  }
  .description {
    user-select: none;
    line-height: 18rem;
    background-color: hsl(var(--terminal-bg));
    width: 45rem;
    height: 24rem;
    text-align: left;
    padding-left: 1rem;
    :global(.activeHelpSubject) & {
      color: hsl(var(--terminal-color-active));
    }
  }
  .manipulators {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 32rem;
    button {
      appearance: none;
      user-select: none;
      display: block;
      border: 0;
      margin: 0;
      padding: 0;
      color: transparent;
      height: 12rem;
      width: 16rem;
      background-color: hsl(var(--bg));
      border-radius: 3rem 4rem;
      line-height: 14rem;
      /* prettier-ignore */
      box-shadow: 
        -3rem 3rem 3rem -3rem rgba(255, 255, 255, 0.5) inset,
        3rem -3rem 3rem -1rem rgba(0, 0, 0, 0.5) inset,
        0 3rem 2rem 1rem #000,
        0 0 0 0 rgba(0, 0, 0, 0);
      transition: box-shadow 0.1s linear;
      &:active {
        /* prettier-ignore */
        box-shadow: 
          -3rem 3rem 3rem -3rem rgba(0, 0, 0, 0.5) inset,
          3rem -3rem 3rem -1rem rgba(0, 0, 0, 0.5) inset,
          0 3rem 2rem 1rem #000,
          -3rem 0 1rem -1rem rgba(255, 255, 255, 0.25);
      }
      &.incr,
      &.decr {
        position: relative;
        &::after,
        &::before {
          content: ' ';
          position: absolute;
          background-color: hsl(var(--title-color));
        }
      }
      &.incr {
        margin-bottom: 1rem;
        &::after {
          width: 2rem;
          top: 20%;
          bottom: 20%;
          left: 50%;
          margin-left: -2rem;
        }
      }
      &.incr,
      &.decr {
        &::before {
          top: 50%;
          left: 20%;
          right: 20%;
          margin-top: -1rem;
          height: 2rem;
        }
      }
    }
  }
  .two-digit-border {
    border-top: 3rem solid hsl(var(--bg-hs), calc(var(--bg-l) - 10%));
    border-right: 3rem solid hsl(var(--bg-hs), calc(var(--bg-l) - 10%));
    border-left: 3rem solid hsl(var(--bg-hs), calc(var(--bg-l) + 10%));
    border-bottom: 3rem solid hsl(var(--bg-hs), calc(var(--bg-l) + 10%));
  }
</style>
