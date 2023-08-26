<script lang="ts">
  import { clickSound } from '$lib/utils';
  import Button from './Button.svelte';
  export let checked = false;
</script>

<Button
  class={'slate-button brightness-variance b-offset-7 ' +
    (checked ? ' checked ' : '') +
    ($$props.class || '')}
  on:click={clickSound}
  on:click
  on:mouseover
  on:focus
>
  <slot />
</Button>

<style lang="postcss">
  :global(.slate-button) {
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
  }
  :global(.slate-button.checked),
  :global(.slate-button:active) {
      filter: saturate(0.7) brightness(0.7);
      /* prettier-ignore */
      box-shadow:
        var(--slb-light-source-clear),
        var(--sunken);
    }
</style>
