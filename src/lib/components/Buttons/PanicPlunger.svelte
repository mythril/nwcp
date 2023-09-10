<script lang="ts">
  import Button from './Button.svelte';
</script>

<Button
  on:click
  class="panic-plunger"
/>

<style lang="postcss">
  :global(.panic-plunger) {
    display: block;
    width: 100%;
    outline: 1px solid pink;
    flex-grow: 1;
  }
</style>
