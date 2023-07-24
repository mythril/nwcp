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
    size={4}
  />
  <Bolthead
    dir="tr"
    size={4}
  />
  <Bolthead
    dir="br"
    size={4}
  />
  <Bolthead
    dir="bl"
    size={4}
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
        @include push-button(18);
      }
      &:active::after {
        @include push-button-active(18);
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
