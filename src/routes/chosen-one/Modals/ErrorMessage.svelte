<script
  lang="ts"
  context="module"
>
  import { writable } from 'svelte/store';

  export const errorMessage = writable<string>('');
</script>
<script lang="ts">
  import Menu from '../Widgets/Menu.svelte';

  const clearMessage = () => {
    $errorMessage = '';
    return true;
  };

  let messageBox: Menu;

  $: {
    if (messageBox) {
      messageBox.show();
    }
  }
</script>

{#if $errorMessage.length > 0}
  <Menu
    bind:this={messageBox}
    on:menu-close={clearMessage}
    on:menu-close
  >
    <div class="error terminal-font-defaults">
      {$errorMessage}
    </div>
  </Menu>
{/if}

<style lang="postcss">
  .error {
    background-color: hsl(var(--terminal-bg));
    padding: 5rem;
    font-size: 8rem;
    min-height: 50rem;
    margin-bottom: 10rem;
  }
</style>
