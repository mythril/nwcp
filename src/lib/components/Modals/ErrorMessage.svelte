<script lang="ts">
  import Menu from '$lib/components/Menu.svelte';
  import { errorMessage } from '$lib/components/ErrorMessageStore';

  export const enter = () => {
    // intentional
  };
  export const leave = () => {
    errorMessage.set('');
  };
</script>

<Menu
  on:navBack
  on:navExit
>
  <div class="error terminal-font-defaults">
    {$errorMessage}
  </div>
</Menu>

<style lang="postcss">
  .error {
    background-color: hsl(var(--terminal-bg));
    padding: 5rem;
    font-size: 8rem;
    min-height: 50rem;
    margin-bottom: 10rem;
  }
</style>
