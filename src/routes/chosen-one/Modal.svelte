<script lang="ts">
  import { grabFocus } from '$lib/actions/grabFocus';
  import Portal from '$lib/components/Portal.svelte';
  import { createEventDispatcher, tick } from 'svelte';
  import { modalShown } from './stores';

  const dispatch = createEventDispatcher();

  let showDialog = false;

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
    return await tick();
  };

  export const hide = async () => {
    if (dispatch('modal-hide')) {
      $modalShown = false;
      showDialog = false;
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
