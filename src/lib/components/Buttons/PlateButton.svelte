<script lang="ts">
  import { clickSound } from '$lib/utils';
  import Bolthead from '../Bolthead.svelte';
  import Button from './Button.svelte';
  export let pushButton = true;
  export let wornText = true;
  export let type: 'button' | 'link' = 'button';
  export let href = '';
</script>

<Button
  on:click={clickSound}
  on:click
  on:mouseover
  on:focus
  {type}
  {href}
  class={'plate-button brightness-variance b-offset-8 ' +
    (pushButton ? ' pushButton ' : '') +
    ($$props.class || '')}
>
  <Bolthead
    dir="tl"
    size={3}
  />
  <Bolthead
    dir="tr"
    size={3}
  />
  <Bolthead
    dir="br"
    size={3}
  />
  <Bolthead
    dir="bl"
    size={3}
  />
  <div class="label {wornText ? 'worn-text' : ''}">
    <slot />
  </div>
</Button>

<style lang="postcss">
  :global(.plate-button) {
    position: relative;
    height: 23rem;
    padding: 0 10rem;
    display: block;
    appearance: none;
    background-color: hsl(var(--bg));
    border: 0;
    flex-grow: 1;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 10rem 4rem;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 10rem 4rem;
    text-decoration: none;
    /* prettier-ignore */
    box-shadow: 
      -1rem 1rem 2rem -1rem rgba(255, 255, 255, 0.5) inset,
      -1rem -1rem 0 -3rem rgba(0,0,0, 0.5) inset;
    .label {
      font-size: 16rem;
      text-align: left;
      width: 100%;
    }
  }
  :global(.pushButton) {
    .label {
      padding-left: 25rem;
    }
  }
</style>
