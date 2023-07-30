<script lang="ts">
  export let row = 12;
  export let col = 4;
</script>

<div
  class="sprite"
  style="--row: {row}; --col: {col}"
/>

<style lang="postcss">
  .sprite {
    /* tricksy, hides the rendering until we have a reliable size metric */
    opacity: calc(min(var(--rem-ratio, 0), 1));

    display: inline-block;
    background-image: url('$lib/images/sprites.webp');
    image-rendering: crisp-edges;
    width: 140rem;
    height: 117rem;

    /* Patches up the fact that we are using rems instead of px */
    background-position-x: calc((var(--col) - 1) * -140px * var(--rem-ratio));
    background-position-y: calc((var(--row) - 1) * -117px * var(--rem-ratio));
    background-size: calc(1960px * var(--rem-ratio))
      calc(1521px * var(--rem-ratio));
    background-blend-mode: darken;
  }
</style>
