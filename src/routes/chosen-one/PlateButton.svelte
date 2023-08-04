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
</button>

<style lang="postcss">
  .button {
    position: relative;
    height: 23rem;
    padding: 0;
    padding-left: 10rem;
    display: block;
    appearance: none;
    background-color: hsl(var(--bg));
    border: 0;
    &.pushButton {
      &::after {
        content: ' ';
        position: absolute;
        left: 13rem;
        top: 3rem;
        width: 16rem;
        height: 16rem;
        border: 0;
        outline: 0;
        border-radius: 100%;
        transition: box-shadow 0.1s linear;
        /* prettier-ignore */
        box-shadow: 
          -1rem 1rem 2rem 0 hsla(0deg, 0%, 0%, 1),
          2rem -2rem 1rem -1.2rem rgba(0, 0, 0, 0.75) inset,
          -2rem 2rem 1rem -1.2rem rgba(128, 128, 128, 0.75) inset,
          0 0 0 2.7rem rgb(48, 48, 48) inset,
          0 0 0 3.6rem rgb(63, 0, 0) inset,
          -2rem 2rem 1rem 1.5rem rgba(220, 0, 0, 1) inset,
          2rem -2rem 3rem 0.5rem rgba(255, 0, 0, 1) inset,
          0 0 0 4.5rem rgb(100, 0, 0) inset,
          0 0 0 12rem rgb(89, 0, 0) inset,
          0 0 0 9rem hsl(0deg, 0%, 0%) inset,
          0 0 0 0.9rem hsl(0deg, 0%, 10%) inset;
      }
      &:active::after {
        /* prettier-ignore */
        box-shadow: 
          -1rem 1rem 2rem 0 hsla(0deg, 0%, 0%, 100%),
          2rem -2rem 1rem -1.2rem rgba(0, 0, 0, 0) inset,
          -2rem 2rem 1rem -1.2rem rgba(128, 128, 128, 0.75) inset,
          0 0 0 2.7rem rgb(48, 48, 48) inset,
          0 0 0 3.6rem rgb(63, 0, 0) inset,
          -2rem 2rem 1rem 1.5rem rgba(220, 0, 0, 0) inset,
          2rem -2rem 3rem 0.5rem rgba(255, 0, 0, 0) inset,
          0 0 0 4.5rem rgb(100, 0, 0) inset,
          0 0 0 12rem rgb(89, 0, 0) inset,
          0 0 0 9rem hsl(0deg, 0%, 0%) inset,
          0 0 0 0.9rem hsl(0deg, 0%, 10%) inset;
      }
      .label {
        padding-left: 25rem;
      }
    }
    .label {
      font-size: 16rem;
      text-align: left;
      width: 100%;
    }
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 10rem 4rem;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 10rem 4rem;
    /* prettier-ignore */
    box-shadow: 
      -1rem 1rem 2rem -1rem rgba(255, 255, 255, 0.5) inset,
      -1rem -1rem 0 -3rem rgba(0,0,0, 0.5) inset;
  }
</style>
