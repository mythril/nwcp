<script lang="ts">
  import { grabFocus } from '$lib/actions/grabFocus';
  import Portal from '$lib/components/Portal.svelte';
  import { tick } from 'svelte';
  import { modalShown } from './stores';

  let showDialog = false;
  export let cancelListener = () => {
    //intentional
  };
  export let commitListener = () => {
    return true;
  };

  let cancel = () => {
    cancelListener();
    $modalShown = false;
    showDialog = false;
  };
  export const commit = () => {
    if (commitListener()) {
      $modalShown = false;
      showDialog = false;
    }
  };

  function cancelHandler(event: KeyboardEvent) {
    switch (event.code) {
      case 'Escape':
        cancel();
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
    showDialog = false;
  };
</script>

<svelte:body on:keydown={cancelHandler} />

{#if showDialog}
  <Portal target="#modals">
    <div class="backdrop" />
    <div
      class="focus-grabber"
      use:grabFocus
    >
      <slot />
    </div>
  </Portal>
{/if}

<style lang="postcss">
  .backdrop {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.75);
  }
  .focus-grabber {
    display: contents;
  }
</style>
