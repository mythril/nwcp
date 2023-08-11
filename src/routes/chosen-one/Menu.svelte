<script lang="ts">
  import Modal from './Modal.svelte';
  import Button from './Buttons/Button.svelte';
  import Bolthead from './Bolthead.svelte';
  let menu: HTMLElement;
  let modal: Modal;

  export const show = async () => {
    if (modal) {
      await modal.show();
      if (!menu) {
        return;
      }

      menu.scrollIntoView(true);
    }
  };
  export const hide = async () => {
    if (modal) {
      modal.hide();
    }
  };
</script>

<Modal bind:this={modal}>
  <div class="centering">
    <div
      role="dialog"
      class="menu"
      bind:this={menu}
    >
      <Bolthead dir="tl" />
      <Bolthead dir="tr" />
      <Bolthead dir="bl" />
      <Bolthead dir="br" />
      <div class="padding-wrapper">
        <slot />
        <Button on:click={hide}>Done</Button>
      </div>
    </div>
  </div>
</Modal>

<style lang="postcss">
  .menu {
    width: 164rem;
    height: fit-content;
    margin: auto;
    padding: 19rem 17rem;
    position: relative;
    background-color: hsl(var(--menu-bg));
    font-size: 16rem;
    line-height: 29rem;
  }
  .padding-wrapper {
    display: flex;
    flex-flow: column;
    gap: 6rem;
  }
  .centering {
    position: fixed;
    z-index: 2;
    height: 100vh;
    width: 100vw;
    display: grid;
  }
</style>
