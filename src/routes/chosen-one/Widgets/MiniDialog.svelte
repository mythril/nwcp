<script lang="ts">
  import PlateButton from './Buttons/PlateButton.svelte';
  import { anchor } from '$lib/actions/anchor';
  import Modal from './Modal.svelte';
  let dialog: HTMLElement;
  let modal: Modal;

  export const show = async () => {
    if (modal) {
      await modal.show();
      if (!dialog) {
        return;
      }

      dialog.scrollIntoView(true);
    }
  };
  export const hide = async () => {
    if (modal) {
      modal.hide();
    }
  };
</script>

<div use:anchor={dialog} />
<Modal
  on:modal-cancel
  on:modal-commit
  on:modal-close
  bind:this={modal}
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
          on:click={() => modal.commit()}>Done</PlateButton
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
