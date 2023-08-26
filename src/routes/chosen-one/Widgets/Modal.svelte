<script lang="ts">
  import { grabFocus } from '$lib/actions/grabFocus';
  import { createEventDispatcher, tick } from 'svelte';
  import Portal from './Portal.svelte';

  const dispatch = createEventDispatcher();

  function cancelHandler(event: KeyboardEvent) {
    switch (event.code) {
      case 'Escape':
        dispatch('modal-hide');
        return;
      default:
        return;
    }
  }
</script>

<svelte:body on:keydown={cancelHandler} />

<Portal target="#modals">
  <div
    class="focus-grabber"
    use:grabFocus
  >
    <slot />
  </div>
</Portal>

<style lang="postcss">
  .focus-grabber {
    display: contents;
  }
</style>
