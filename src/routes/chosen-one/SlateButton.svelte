<script lang="ts">
  import { clickSound } from '$lib/utils';
  export let checked = false;
</script>

<button
  class:checked
  class={'button ' + $$props.class}
  on:click={clickSound}
  on:click
>
  <slot />
</button>

<style lang="scss">
  .button {
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
    text-transform: uppercase;
    user-select: none;
    background-color: hsl(var(--title-bg));
    color: hsl(var(--title-color));
    padding: 0 px(8);
    border-radius: px(5);
    border-width: 0;
    /* prettier-ignore */
    box-shadow:
      var(--shadow-border),
      var(--light-source),
      var(--sunken-clear);
    transition: filter 0.2s linear, box-shadow 0.01s linear;
    font-family: var(--title-font);
    text-align: center;
    font-size: px(22);
    line-height: 1.5;
    appearance: none;
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;
    height: 100%;
    &.checked,
    &:active {
      filter: saturate(0.7) brightness(0.7);
      /* prettier-ignore */
      box-shadow:
        var(--shadow-border),
        var(--light-source-clear),
        var(--sunken);
    }
  }

  // filter: saturate(0.25) brightness(0.25);
</style>
