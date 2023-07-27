<script lang="ts">
  import Portal from '$lib/components/Portal.svelte';
  import { afterUpdate } from 'svelte';
  import PlateButton from './PlateButton.svelte';

  let showEdit = false;
  export let cancelListener = () => {
    //intentional
  };
  let cancel = () => {
    cancelListener();
    showEdit = false;
  };
  export let commitListener = () => {
    return true;
  };
  let commit = () => {
    if (commitListener()) {
      showEdit = false;
    }
  };
  function controlKeys(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      cancel();
      return false;
    }
    if (event.code === 'Escape') {
      cancel();
      return false;
    }
    if (event.keyCode === 13) {
      commit();
      return false;
    }
    if (event.code === 'Enter') {
      commit();
      return false;
    }
    return false;
  }

  export const show = () => {
    showEdit = true;
  };

  let anchor: HTMLElement;
  let left = 0;
  let top = 0;

  afterUpdate(() => {
    if (anchor) {
      let rect = anchor.getBoundingClientRect();
      left = window.scrollX + rect.left;
      top = window.scrollY + rect.top;
    }
  });
</script>

{#if showEdit}
  <div
    bind:this={anchor}
    class="anchor"
  />
  <Portal target="body">
    <div class="backdrop" />
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div
      role="dialog"
      class="edit"
      style="left: {left}px; top: {top}px"
      on:keydown={controlKeys}
    >
      <div class="main">
        <slot />
      </div>
      <div class="button">
        <PlateButton
          class="btn-done"
          on:click={commit}>Done</PlateButton
        >
      </div>
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
  .edit {
    position: absolute;
    left: 2rem;
    padding-top: 13rem;
    padding-left: 20rem;
    padding-right: 20rem;
    padding-bottom: 9rem;
    top: 0;
    z-index: 3;
    background-color: hsl(var(--bg));
    box-shadow: var(--basic-box-shadow),
      inset 5rem -5rem 5rem 0 rgba(0, 0, 0, 0.75);
    .main {
      margin-bottom: 8rem;
    }
  }
  :global(.btn-done) {
    width: 100%;
    filter: drop-shadow(-1rem 2rem 2rem #000);
  }
  .anchor {
    width: 100%;
  }
</style>
