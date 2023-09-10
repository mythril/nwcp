<script lang="ts">
  import Button from './Button.svelte';
  export let type: 'link' | 'button' = 'button';
  export let href = '';
</script>

<Button
  {type}
  {href}
  on:click
  class="panic-plunger"
>
  <div class="panic-plunger">
    <slot />
  </div>
</Button>

<style lang="postcss">
  :global(.btn) {
    display: block;
    width: 100%;
    flex-grow: 1;
    &:active .panic-plunger {
      transform: scale(0.97);
    }
  }
  .panic-plunger {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 5rem;
    box-shadow: var(--light-source);
    filter: drop-shadow(-5rem 5rem 5rem black);
    transition: transform 0.2s ease-out;
    /* prettier-ignore */
    background-image:
      repeating-linear-gradient(
        45deg,
        var(--banding, hsl(60, 95.5%, 50.7%)) 0,
        var(--banding, hsl(60, 95.5%, 50.7%)) 9rem,
        #1c1c1c 10rem,
        #1c1c1c 19rem,
        var(--banding, hsl(60, 95.5%, 50.7%)) 20rem
      );
  }
</style>
