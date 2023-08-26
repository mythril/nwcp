<script lang="ts">
  import PlateButton from './Buttons/PlateButton.svelte';
  import { anchor } from '$lib/actions/anchor';
  import Modal from './Modal.svelte';
  let dialog: HTMLElement;

  import { createEventDispatcher } from 'svelte';
  import {
    CancelableEvents,
    type CancelableEventsSignature
  } from '../cancelable';
  const dispatch = createEventDispatcher<CancelableEventsSignature>();

  export const enter = async () => {
    if (dialog) {
      dialog.scrollIntoView(true);
    }
  };
</script>

<div use:anchor={dialog} />
<Modal
  on:cancelableCommit
  on:cancelableCancel
  on:navBack
  on:navExit
>
  <div
    role="dialog"
    class="edit brightness-variance b-offset-10"
    bind:this={dialog}
    style="left: var(--anchor-left); top: var(--anchor-top)"
  >
    <div class="padding-wrapper">
      <div class="main">
        <slot />
      </div>
      <div class="button">
        <PlateButton
          class="btn-done"
          on:click={() => dispatch(CancelableEvents.cancelableCommit)}
          >Done</PlateButton
        >
      </div>
    </div>
  </div>
</Modal>

<style lang="postcss">
  .edit {
    position: absolute;
    left: 2rem;
    top: 0;
    z-index: 3;
    background-color: hsl(var(--bg));
    box-shadow: var(--basic-box-shadow),
      inset 4rem -4rem 4rem -4rem rgba(0, 0, 0, 0.75);
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
</style>
