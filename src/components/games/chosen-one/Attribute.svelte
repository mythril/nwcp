<script lang="ts">
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
  function incr() {
    value = value < 10 ? value + 1 : value;
  }
  function decr() {
    value = value > min ? value - 1 : value;
  }
</script>

<div class="attribute">
  <div class="label">
    {label}
  </div>
  <div class="twodigit-attr">
    <div class="dorkyborder">
      <TwoDigitDisplay {value} />
    </div>
  </div>
  <div class="description">
    {descriptors[value - 1]}
  </div>
  <div class="manipulators">
    <button
      class="incr"
      on:click={incr}>+</button
    >
    <button
      class="decr"
      on:click={decr}>-</button
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
    user-select: none;
    color: $title-color;
    text-align: center;
    font-family: title-font();
    font-size: px(30);
    width: px(40);
  }
  .twodigit-attr {
    position: relative;
    &::after,
    &::before {
      position: absolute;
      top: 50%;
      content: ' ';
      background-color: $title-color;
      margin-top: px(-1.5);
      height: px(3);
    }
    &::after {
      left: 105%;
      width: px(6);
    }
    &::before {
      right: 105%;
      width: px(10);
    }
  }
  .description {
    user-select: none;
    @include terminal-font();
    line-height: px(22);
    background-color: $terminal-bg;
    width: px(70);
    height: px(28);
    text-align: left;
    padding-left: px(6);
    border-top: px(3) solid darken($root-bg, 20%);
    border-right: px(3) solid lighten($root-bg, 10%);
    border-left: px(3) solid lighten($root-bg, 25%);
    border-bottom: px(3) solid lighten($root-bg, 40%);
  }
  .manipulators {
    display: flex;
    flex-direction: column;
    height: px(32);
    // filter:
    //   drop-shadow(px(0) px(1) px(0) #000)
    //   drop-shadow(px(-1) px(1) px(0) #000)
    //   drop-shadow(px(0) px(3) px(1) #000)
    //   drop-shadow(px(1) px(1) px(0) #000);
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
      background-color: $root-bg;
      border-radius: px(3) px(4);
      line-height: px(14);
      box-shadow: px(-3) px(3) px(3) px(-3) rgba(255, 255, 255, 0.5) inset,
        px(3) px(-3) px(3) px(-1) rgba(darken($root-bg, 50%), 0.5) inset,
        px(0) px(3) px(2) px(1) #000, px(0) px(0) px(0) px(0) rgba(#000, 0);
      transition: box-shadow 0.1s linear;
      &:active {
        box-shadow: px(-3) px(3) px(3) px(-3) rgba(#000, 0.5) inset,
          px(3) px(-3) px(3) px(-1) rgba(darken($root-bg, 50%), 0.5) inset,
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
          background-color: $title-color;
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
  .dorkyborder {
    border-top: px(3) solid darken($root-bg, 10%);
    border-right: px(3) solid darken($root-bg, 10%);
    border-left: px(3) solid lighten($root-bg, 10%);
    border-bottom: px(3) solid lighten($root-bg, 10%);
  }
</style>
