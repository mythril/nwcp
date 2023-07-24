<script lang="ts">
  import { clickSound } from '$lib/utils';
  import Bolthead from './Bolthead.svelte';
  export let pushButton = true;
  export let wornText = true;
</script>

<button
  on:click={clickSound}
  on:click
  class:pushButton
  class={'button ' + $$props.class}
>
  <Bolthead
    dir="tl"
    size={5}
  />
  <Bolthead
    dir="tr"
    size={5}
  />
  <Bolthead
    dir="br"
    size={5}
  />
  <Bolthead
    dir="bl"
    size={5}
  />
  <div class="label {wornText ? 'worn-text' : ''}">
    <slot />
  </div>
</button>

<style lang="scss">
  .button {
    position: relative;
    padding: px(0) px(10);
    display: block;
    appearance: none;
    background-color: hsl(var(--bg));
    border: 0;
    &.pushButton {
      &::after {
        content: ' ';
        position: absolute;
        left: px(12);
        top: px(5);
        width: px(18);
        height: px(18);
        border: 0;
        outline: 0;
        border-radius: 100%;
        transition: box-shadow 0.1s linear;
        /* prettier-ignore */
        box-shadow: 
          px(-1) px(1) px(2) px(0) hsla(0deg, 0%, 0%, 1),
          px(2) px(-2) px(1) px((9 * math.div(2, 10)) - 3) rgba(0, 0, 0, 0.75) inset,
          px(-2) px(2) px(1) px((9 * math.div(2, 10)) - 3) rgba(128, 128, 128, 0.75) inset,
          0 0 0 px(9 * math.div(3, 10)) rgb(48, 48, 48) inset,
          0 0 0 px(9 * math.div(4, 10)) rgb(63, 0, 0) inset,
          px(-2) px(2) px(1) px((9 * math.div(5, 10)) - 3) rgba(220, 0, 0, 1) inset,
          px(2) px(-2) px(3) px((9 * math.div(5, 10)) - 4) rgba(255, 0, 0, 1) inset,
          0 0 0 px(9 * math.div(5, 10)) rgb(100, 0, 0) inset,
          0 0 0 px(10 + 2) rgb(89, 0, 0) inset,
          0 0 px(0) px(9) hsl(0deg, 0%, 0%) inset,
          0 0 0 px(math.div(9, 10)) hsl(0deg, 0%, 10%) inset;
      }
      &:active::after {
        /* prettier-ignore */
        box-shadow: 
          px(-1) px(1) px(2) px(0) hsla(0deg, 0%, 0%, 100%),
          px(2) px(-2) px(1) px((9 * math.div(2, 10)) - 3) rgba(0, 0, 0, 0) inset,
          px(-2) px(2) px(1) px((9 * math.div(2, 10)) - 3) rgba(128, 128, 128, 0.75) inset,
          0 0 0 px(9 * math.div(3, 10)) rgb(48, 48, 48) inset,
          0 0 0 px(9 * math.div(4, 10)) rgb(63, 0, 0) inset,
          px(-2) px(2) px(1) px((9 * math.div(5, 10)) - 3) rgba(220, 0, 0, 0) inset,
          px(2) px(-2) px(3) px((9 * math.div(5, 10)) - 4) rgba(255, 0, 0, 0) inset,
          0 0 0 px(9 * math.div(5, 10)) rgb(100, 0, 0) inset,
          0 0 0 px(10 + 2) rgb(89, 0, 0) inset,
          0 0 px(0) px(9) hsl(0deg, 0%, 0%) inset,
          0 0 0 px(math.div(9, 10)) hsl(0deg, 0%, 10%) inset;
      }
      .label {
        padding-left: px(25);
      }
    }
    .label {
      font-size: px(22);
      text-align: left;
      width: 100%;
    }
    border-top-right-radius: px(2);
    border-bottom-right-radius: px(10) px(4);
    border-top-left-radius: px(2);
    border-bottom-left-radius: px(10) px(4);
    /* prettier-ignore */
    box-shadow: 
      px(-1) px(1) px(2) px(-1) rgba(#fff, 0.5) inset,
      px(-1) px(-1) px(0) px(-3) rgba(#000, 0.5) inset;
  }
</style>
