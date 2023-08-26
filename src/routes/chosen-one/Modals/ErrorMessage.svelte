<script
  lang="ts"
  context="module"
>
  import { writable } from 'svelte/store';
  import { Modals, showModal } from '../ModalManager.svelte';

  export const errorMessage = writable<string>('');

  errorMessage.subscribe((m) => {
    if (m !== '') {
      showModal(Modals.ErrorMessage);
    }
  });
</script>

<script lang="ts">
  import Menu from '../Widgets/Menu.svelte';

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
