<script lang="ts">
  import { grabFocus } from '$lib/actions/grabFocus';
  import Portal from '$lib/components/Portal.svelte';
  import { createEventDispatcher, tick } from 'svelte';
  import { modalShown } from './stores';

  const dispatch = createEventDispatcher();

  let showDialog = false;

  export const commit = () => {
    if (dispatch('modal-commit')) {
      $modalShown = false;
      showDialog = false;
    }
  };

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
    showDialog = true;
    return tick();
  };

  export const hide = () => {
    $modalShown = false;
    if (dispatch('modal-hide')) {
      showDialog = false;
    }
  };
</script>

<svelte:body on:keydown={cancelHandler} />

{#if showDialog}
  <Portal target="#modals">
    <div
      class="focus-grabber"
      use:grabFocus
    >
      <slot />
    </div>
  </Portal>
{/if}

<style lang="postcss">
  .focus-grabber {
    display: contents;
  }
</style>
