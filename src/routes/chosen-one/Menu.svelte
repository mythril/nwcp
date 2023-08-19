<script lang="ts">
  import Modal from './Modal.svelte';
  import FlatButton from './Buttons/FlatButton.svelte';
  import Bolthead from './Bolthead.svelte';
  import Portal from '$lib/components/Portal.svelte';
  let menu: HTMLElement;
  let modal: Modal;

  export let showBolts = true;
  let shown = false;

  export const show = async () => {
    if (modal) {
      await modal.show();
      shown = true;
      if (!menu) {
        return;
      }

      menu.scrollIntoView(true);
    }
  };

  export let onClose = () => {
    return true;
  };

  export const hide = async () => {
    if (!onClose()) {
      return;
    }
    if (modal) {
      modal.hide();
      shown = false;
    }
  };

  export const toggle = async () => {
    if (shown) {
      return await hide();
    } else {
      return await show();
    }
  };
</script>

<Modal on:hide bind:this={modal}>
  <Portal target="#planner">
    <div class="centering">
      <div
        role="dialog"
        class={'menu ' +
          ($$props.class || ' brightness-variance b-offset-11 default')}
        bind:this={menu}
      >
        {#if showBolts}
          <Bolthead dir="tl" />
          <Bolthead dir="tr" />
          <Bolthead dir="bl" />
          <Bolthead dir="br" />
        {/if}
        <div class="padding-wrapper">
          <slot />
          <slot
            name="closeButton"
            hider={hide}
          >
            <FlatButton on:click={hide}>Done</FlatButton>
          </slot>
        </div>
      </div>
    </div>
  </Portal>
</Modal>

<style lang="postcss">
  .menu {
    height: fit-content;
    margin: auto;
    position: relative;
    font-size: 16rem;
  }
  .default {
    padding: 19rem 17rem;
    line-height: 29rem;
    background-color: hsl(var(--menu-bg));
    /* prettier-ignore */
    box-shadow:
      inset -3rem -4rem 2rem 1rem rgba(0,0,0, 0.50),
      inset 3rem 4rem 2rem 1rem rgba(255,255,255, 0.20);
  }
  .padding-wrapper {
    display: flex;
    flex-flow: column;
    gap: 6rem;
  }
  .centering {
    position: absolute;
    z-index: 2;
    height: 480rem;
    width: 640rem;
    display: grid;
  }
</style>
