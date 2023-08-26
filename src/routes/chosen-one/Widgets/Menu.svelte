<script lang="ts">
  import Modal from './Modal.svelte';
  import FlatButton from './Buttons/FlatButton.svelte';
  import Bolthead from './Bolthead.svelte';
  import Portal from './Portal.svelte';

  import { createEventDispatcher } from 'svelte';
  import {
    ModalNavEvents,
    type ModalEventSignature
  } from '../ModalManager.svelte';
  const dispatch = createEventDispatcher<ModalEventSignature>();

  export let showBolts = true;
</script>

<Modal
  on:dataCancel
  on:dataCommit
  on:navBack
  on:navExit
>
  <Portal target="#planner">
    <div class="centering">
      <div
        role="dialog"
        class={'menu ' +
          ($$props.class || ' brightness-variance b-offset-11 default')}
      >
        {#if showBolts}
          <Bolthead dir="tl" />
          <Bolthead dir="tr" />
          <Bolthead dir="bl" />
          <Bolthead dir="br" />
        {/if}
        <div class="padding-wrapper">
          <slot />
          <slot name="navButtons">
            <FlatButton on:click={() => dispatch(ModalNavEvents.navExit)}
              >Done</FlatButton
            >
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
