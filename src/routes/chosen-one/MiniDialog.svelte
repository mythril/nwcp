<script lang="ts">
  import Portal from '$lib/components/Portal.svelte';
  import { afterUpdate, tick } from 'svelte';
  import PlateButton from './PlateButton.svelte';
  import { modalShown } from './stores';

  let showEdit = false;
  export let cancelListener = () => {
    //intentional
  };
  let cancel = () => {
    cancelListener();
    $modalShown = false;
    showEdit = false;
  };
  export let commitListener = () => {
    return true;
  };
  let commit = () => {
    if (commitListener()) {
      $modalShown = false;
      showEdit = false;
    }
  };
  function controlKeys(event: KeyboardEvent) {
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
    showEdit = true;
    await tick();

    if (!dialog) {
      return;
    }

    dialog.scrollIntoView(true);

    const focusable = dialog.querySelectorAll<HTMLElement>(` 
      a[href]:not([tabindex='-1']),
      area[href]:not([tabindex='-1']),
      input:not([disabled]):not([tabindex='-1']),
      select:not([disabled]):not([tabindex='-1']),
      textarea:not([disabled]):not([tabindex='-1']),
      button:not([disabled]):not([tabindex='-1']),
      iframe:not([tabindex='-1']),
      [tabindex]:not([tabindex='-1'])
    `);

    for (let f of Array.from(focusable)) {
      f.focus();
      break;
    }
  };

  export const hide = () => {
    $modalShown = false;
    showEdit = false;
  };

  let anchor: HTMLElement;
  let dialog: HTMLElement;
  let left = 0;
  let top = 0;

  const applyAnchoring = () => {
    if (anchor) {
      let rect = anchor.getBoundingClientRect();
      left = window.scrollX + rect.left;
      top = window.scrollY + rect.top;
    }
  };

  afterUpdate(applyAnchoring);
</script>

<svelte:window on:resize={applyAnchoring} />

<svelte:body on:keydown={controlKeys} />

{#if showEdit}
  <div
    bind:this={anchor}
    class="anchor"
  />
  <Portal target="#modals">
    <div class="backdrop" />
    <div
      role="dialog"
      class="edit"
      bind:this={dialog}
      style="left: {left}px; top: {top}px"
    >
      <div class="padding-wrapper">
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
    top: 0;
    z-index: 3;
    background-color: hsl(var(--bg));
    box-shadow: var(--basic-box-shadow),
      inset 5rem -5rem 5rem 0 rgba(0, 0, 0, 0.75);
    .padding-wrapper {
      width: 100%;
      height: 100%;
      padding-top: 13rem;
      padding-left: 20rem;
      padding-right: 20rem;
      padding-bottom: 4rem;
    }
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
