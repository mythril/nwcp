<script lang="ts">
  import { grabFocus } from '$lib/actions/grabFocus';
  import { createEventDispatcher, tick } from 'svelte';
  import { modalShown } from '../stores';
  import Portal from './Portal.svelte';

  const dispatch = createEventDispatcher();

  function cancelHandler(event: KeyboardEvent) {
    switch (event.code) {
      case 'Escape':
        if (dispatch('modal-cancel')) {
          hide();
        }
        return;
      default:
        return;
    }
  }

  export const show = async () => {
    $modalShown = true;
    return await tick();
  };

  export const hide = async () => {
    if (dispatch('modal-hide')) {
      $modalShown = false;
    }
    return await tick();
  };

  export const commit = async () => {
    if (dispatch('modal-commit')) {
      return await hide();
    }
  };
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
