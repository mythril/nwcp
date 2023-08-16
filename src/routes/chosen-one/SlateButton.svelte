<script lang="ts">
  import { clickSound } from '$lib/utils';
  export let checked = false;
</script>

<button
  class:checked
  class={'button brightness-variance b-offset-7 ' + ($$props.class || '')}
  on:click={clickSound}
  on:click
>
  <slot />
</button>

<style lang="postcss">
  .button {
    /* prettier-ignore */
    --slb-light-source:
      inset -5rem 5rem 3rem -4rem rgba(255, 255, 255, 0.4),
      inset 5rem -5rem 3rem -3rem rgba(0, 0, 0, 0.7);
    /* prettier-ignore */
    --slb-light-source-clear:
      inset 0 0 0 0 rgba(255, 255, 255, 0),
      inset 0 0 0 0 rgba(0, 0, 0, 0);
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
    text-transform: uppercase;
    user-select: none;
    background-color: hsl(var(--title-bg));
    color: hsl(var(--title-color));
    padding: 0 8rem;
    border-radius: 5rem;
    border: 1rem solid hsl(var(--bg-hs), calc(var(--bg-l) - 10%));
    /* prettier-ignore */
    box-shadow:
      var(--slb-light-source),
      var(--sunken-clear);
    transition: filter 0.2s linear, box-shadow 0.01s linear;
    font-family: var(--title-font);
    text-align: center;
    font-size: 16rem;
    line-height: 30rem;
    appearance: none;
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;
    height: 30rem;
    &.checked,
    &:active {
      filter: saturate(0.7) brightness(0.7);
      /* prettier-ignore */
      box-shadow:
        var(--slb-light-source-clear),
        var(--sunken);
    }
  }
</style>
