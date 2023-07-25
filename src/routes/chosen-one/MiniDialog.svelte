<script lang="ts">
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
</script>

<div class="relative">
  {#if showEdit}
    <div class="backdrop" />
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div
      role="dialog"
      class="edit"
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
  {/if}
</div>

<style lang="scss">
  .backdrop {
    position: fixed;
    left: -100vw;
    top: -100vh;
    right: -100vw;
    bottom: -100vh;
    z-index: 2;
    background-color: rgba(#000, 0.75);
  }
  .edit {
    position: absolute;
    min-width: 100%;
    left: 2rem;
    padding-top: 13rem;
    padding-left: 20rem;
    padding-right: 20rem;
    padding-bottom: 9rem;
    top: 0;
    z-index: 3;
    background-color: hsl(var(--bg));
    box-shadow: var(--basic-box-shadow),
      inset 5rem -5rem 5rem 0 rgba(#000, 0.75);
    .main {
      margin-bottom: 8rem;
    }
  }
  :global(.btn-done) {
    width: 100%;
    filter: drop-shadow(-1rem 2rem 2rem #000);
  }
  .relative {
    position: relative;
    width: 100%;
  }
</style>
