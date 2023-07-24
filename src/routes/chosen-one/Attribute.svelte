<script lang="ts">
  import { clickSound } from '$lib/utils';
  import TwoDigitDisplay from './TwoDigitDisplay.svelte';

  export let label: string;
  export let value: number;
  export let min = 1;
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
  let attr: TwoDigitDisplay;
  let descIndex = 0;
</script>

<div class="attribute">
  <div class="label worn-text">
    {label}
  </div>
  <div class="two-digit-attr">
    <div class="two-digit-border">
      <TwoDigitDisplay
        bind:this={attr}
        initial={value}
        onChange={(val) => {
          descIndex = val - 1;
        }}
        {min}
        max={10}
      />
    </div>
  </div>
  <div class="description dorky-border">
    {descriptors[descIndex]}
  </div>
  <div class="manipulators">
    <button
      class="incr"
      on:click={() => {
        if (attr.increment()) {
          clickSound();
        }
      }}>+</button
    >
    <button
      class="decr"
      on:click={() => {
        if (attr.decrement()) {
          clickSound();
        }
      }}>-</button
    >
  </div>
</div>

<style lang="scss">
  .attribute {
    box-sizing: border-box;
    padding: px(0) px(0);
    display: flex;
    width: 100%;
    height: px(44);
    justify-content: space-between;
    align-items: center;
  }
  .label {
    text-align: center;
    font-size: px(30);
    width: px(40);
  }
  .two-digit-attr {
    position: relative;
    &::after,
    &::before {
      position: absolute;
      top: 50%;
      content: ' ';
      background-color: hsl(var(--title-color));
      margin-top: px(-1.5);
      height: px(3);
    }
    &::after {
      left: px(51);
      width: px(5);
    }
    &::before {
      right: px(51);
      width: px(8);
    }
  }
  .description {
    user-select: none;
    @include terminal-font();
    line-height: px(22);
    background-color: hsl(var(--terminal-bg));
    width: px(70);
    height: px(28);
    text-align: left;
    padding-left: px(6);
    :global(.activeHelpSubject) & {
      color: hsl(var(--terminal-color-active));
    }
  }
  .manipulators {
    display: flex;
    flex-direction: column;
    height: px(32);
    button {
      appearance: none;
      user-select: none;
      display: block;
      border: 0;
      margin: 0;
      padding: 0;
      color: transparent;
      height: px(13);
      width: px(20);
      background-color: hsl(var(--bg));
      border-radius: px(3) px(4);
      line-height: px(14);
      /* prettier-ignore */
      box-shadow: 
        px(-3) px(3) px(3) px(-3) rgba(255, 255, 255, 0.5) inset,
        px(3) px(-3) px(3) px(-1) rgba(0, 0, 0, 0.5) inset,
        px(0) px(3) px(2) px(1) #000,
        px(0) px(0) px(0) px(0) rgba(#000, 0);
      transition: box-shadow 0.1s linear;
      &:active {
        /* prettier-ignore */
        box-shadow: 
          px(-3) px(3) px(3) px(-3) rgba(#000, 0.5) inset,
          px(3) px(-3) px(3) px(-1) rgba(0, 0, 0, 0.5) inset,
          px(0) px(3) px(2) px(1) #000,
          px(-3) px(0) px(1) px(-1) rgba(#fff, 0.25);
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
        margin-bottom: px(1);
        &::after {
          width: px(2);
          top: 20%;
          bottom: 20%;
          left: 50%;
          margin-left: px(-2);
        }
      }
      &.incr,
      &.decr {
        &::before {
          top: 50%;
          left: 20%;
          right: 20%;
          margin-top: px(-1);
          height: px(2);
        }
      }
    }
  }
  .two-digit-border {
    border-top: px(3) solid hsl(var(--bg-hs), calc(var(--bg-l) - 10%));
    border-right: px(3) solid hsl(var(--bg-hs), calc(var(--bg-l) - 10%));
    border-left: px(3) solid hsl(var(--bg-hs), calc(var(--bg-l) + 10%));
    border-bottom: px(3) solid hsl(var(--bg-hs), calc(var(--bg-l) + 10%));
  }
</style>
