<script lang="ts">
  import PlateButton from './Buttons/PlateButton.svelte';
  import Modal from './Modal.svelte';
  let dialog: HTMLElement;
  export let anchorTop = 0;
  export let anchorLeft = 0;

  import { createEventDispatcher } from 'svelte';
  import { DataEvents, type DataEventsSignature } from '../DataEvents';
  const dispatch = createEventDispatcher<DataEventsSignature>();

  export const enter = async () => {
    if (dialog) {
      dialog.scrollIntoView(true);
    }
  };
</script>

<Modal
  on:dataCancel
  on:dataCommit
  on:navBack
  on:navExit
>
  <div
    role="dialog"
    class="edit brightness-variance b-offset-10"
    style={`--anchor-top: ${anchorTop}px; --anchor-left: ${anchorLeft}px`}
    bind:this={dialog}
  >
    <div class="padding-wrapper">
      <div class="main">
        <slot />
      </div>
      <div class="button">
        <PlateButton
          class="btn-done"
          on:click={() => dispatch(DataEvents.dataCommit)}>Done</PlateButton
        >
      </div>
    </div>
  </div>
</Modal>

<style lang="postcss">
  .edit {
    left: calc(var(--anchor-left) + 2rem);
    top: var(--anchor-top);
    position: absolute;
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
