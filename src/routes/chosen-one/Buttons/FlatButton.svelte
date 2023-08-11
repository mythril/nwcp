<script lang="ts">
  import Button from './Button.svelte';

  export let type: 'button' | 'link' = 'button';
  export let href = '';
  export let target = '_self';
</script>

<Button
  {type}
  {href}
  {target}
  class="flat-btn"
  on:click
>
  <div class="worn-text">
    <slot />
  </div>
</Button>

<style lang="postcss">
  :global(.flat-btn) {
    appearance: none;
    overflow: visible;
    background-color: hsla(var(--menu-bg));
    font-size: inherit;
    display: block;
    border: 0;
    padding: 0;
    text-decoration: none;
    text-align: center;
    line-height: inherit;
    /* prettier-ignore */
    box-shadow:
      inset 3rem 3rem 3rem -2rem rgba(255, 255, 255, 0.35)
      ,
      inset -3rem -3rem 3rem -2rem rgba(0, 0, 0, 0.85)
      ,
      var(--shadow-border)
      ,
      -1rem -1rem 1rem 1rem rgba(0, 0, 0, 0.50)
      ,
      1rem 1rem 1rem 1rem  rgba(255, 255, 255, 0.25)
      ;
    position: relative;
    transition: box-shadow 0.032s linear;
    &:active {
      /* prettier-ignore */
      box-shadow:
        inset 0 0 0 0 rgba(255, 255, 255, 0)
        ,
        inset 0 0 0 0 rgba(0, 0, 0, 0)
        ,
        var(--shadow-border)
        ,
        -1rem -1rem 1rem 1rem rgba(0, 0, 0, 0.50)
        ,
        1rem 1rem 1rem 1rem  rgba(255, 255, 255, 0.25)
        ;
    }
    &:before,
    &:after {
      transition: box-shadow 0.032s linear;
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: none;
    }
    &:before {
      right: 0;
      bottom: 0;

      /* prettier-ignore */
      box-shadow:
        inset 0 0 0 0 rgba(0, 0, 0, 0),
        inset 0 0 0 0 rgba(0, 0, 0, 0);
    }
    &:active:before {
      /* prettier-ignore */
      box-shadow: 
        inset -4rem -3rem 2rem -2rem rgba(0, 0, 0, 0.55),
        inset 7rem 8rem 2rem -2rem rgba(0, 0, 0, 0.55);
    }
    &:after {
      border-radius: 2rem;
      right: 2rem;
      bottom: 2rem;
      /* prettier-ignore */
      box-shadow: 4rem 4rem 3rem 1rem rgba(0, 0, 0, 0.55);
    }
    &:active:after {
      /* prettier-ignore */
      box-shadow: 4rem 4rem 3rem 1rem rgba(0, 0, 0, 0);
    }
  }
</style>
