<script lang="ts">
  import Modal from './Modal.svelte';
  import FlatButton from './Buttons/FlatButton.svelte';
  import Bolthead from './Bolthead.svelte';
  import { createEventDispatcher } from 'svelte';
  import Portal from './Portal.svelte';

  const dispatch = createEventDispatcher();

  export let showBolts = true;
</script>

<Modal
  on:modal-hide
  on:modal-commit
  on:modal-cancel
  on:menu-close
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
          <slot
            name="closeButton"
          >
            <FlatButton on:click={() => dispatch('menu-close')}>Done</FlatButton>
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
