<script lang="ts">
  import { resetCharacter } from '../CharacterStore';
  import {
    ModalNavEvents,
    type ModalEventSignature
  } from '../ModalManager.svelte';
  import PlateButton from '../Widgets/Buttons/PlateButton.svelte';
  import Modal from '../Widgets/Modal.svelte';

  export const enter = () => {
    // intentional
  };

  export const leave = () => {
    // intentional
  };

  import { createEventDispatcher } from 'svelte';
  import Portal from '../Widgets/Portal.svelte';
  import { toast } from '../../Toast.svelte';
  const dispatch = createEventDispatcher<ModalEventSignature>();

  const erase = () => {
    resetCharacter();
    dispatch(ModalNavEvents.navExit);
    toast.success({ message: 'Character successfully erased.' });
  };
</script>

<Modal
  on:navBack
  on:navExit
>
  <Portal target="#planner">
    <div class="centering">
      <div class="box pitted">
        <div class="prompt">
          Are you sure you want to erase the current character?
        </div>
        <PlateButton
          class="yes"
          on:click={erase}>Yes</PlateButton
        >
        <PlateButton
          class="no"
          on:click={() => dispatch(ModalNavEvents.navBack)}>No</PlateButton
        >
      </div>
    </div>
  </Portal>
</Modal>

<style lang="postcss">
  .box {
    display: grid;
    grid-template-columns: 25rem 1fr 25rem 1fr 25rem;
    grid-template-rows: 1fr 25rem;
    grid-template-areas:
      'prompt prompt prompt prompt prompt'
      '. yes . no .';
    background-color: hsla(var(--bg));
    border-top: 5rem solid rgba(255, 255, 255, 0.1);
    border-left: 4rem solid rgba(0, 0, 0, 0.9);
    border-bottom: 4rem solid rgba(0, 0, 0, 0.9);
    border-right: 3rem solid rgba(255, 255, 255, 0.05);
    background-position: 302rem 327rem;
    width: 302rem;
    height: 127rem;
    margin: auto;
  }
  :global(.yes) {
    grid-area: yes;
    filter: drop-shadow(-5rem 5rem 5rem rgba(0, 0, 0, 1));
  }
  :global(.no) {
    grid-area: no;
    filter: drop-shadow(-5rem 5rem 5rem rgba(0, 0, 0, 1));
  }
  .prompt {
    background-color: hsl(var(--terminal-bg));
    margin: 15rem;
    margin-bottom: 5rem;
    border-radius: 5rem;
    padding: 10rem;
    color: hsl(var(--terminal-color));
    grid-area: prompt;
    box-shadow: var(--inset);
  }
  .centering {
    position: absolute;
    z-index: 2;
    height: 480rem;
    width: 640rem;
    display: grid;
  }
</style>
