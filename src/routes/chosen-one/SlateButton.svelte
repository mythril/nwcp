<script lang="ts">
  import { clickSound } from '$lib/utils';
</script>

<button
  on:click={clickSound}
  on:click
>
  <slot />
</button>

<style lang="scss">
  button {
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
    text-transform: uppercase;
    user-select: none;
    background-color: $title-bg;
    color: $title-color;
    padding: 0 px(8);
    border: px(1) solid black;
    border-radius: px(5);
    box-shadow: px(-5) px(5) px(5) px(-5) rgba(255, 255, 255, 0.7) inset,
      px(5) px(-5) px(5) px(-3) rgba(0, 0, 0, 0.5) inset;
    transition: filter 0.2s linear, box-shadow 0.01s linear;
    font-family: title-font();
    text-align: center;
    font-size: px(22);
    line-height: 1.5;
    appearance: none;
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;
    height: 100%;
    &:active {
      filter: saturate(0.7) brightness(0.7);
      box-shadow: px(-5) px(5) px(5) rgba(0, 0, 0, 0.75) inset,
        px(5) px(-5) px(5) rgba(0, 0, 0, 0.75) inset;
    }
  }

  // filter: saturate(0.25) brightness(0.25);
</style>
