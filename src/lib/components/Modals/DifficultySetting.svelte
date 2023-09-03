<script lang="ts">
  import Bolthead from '$lib/components/Bolthead.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import PlateButton from '$lib/components/Buttons/PlateButton.svelte';
  import RadialSwitch from '$lib/components/RadialSwitch.svelte';
  import { character } from '../../../routes/CharacterStore';

  let menu: Menu;

  import { createEventDispatcher } from 'svelte';
  import {
    ModalNavEvents,
    type ModalEventSignature
  } from '$lib/components/Modal.svelte';
  const dispatch = createEventDispatcher<ModalEventSignature>();

  export const enter = () => {
    // intentional
  };

  export const leave = () => {
    // intentional
  };
</script>

<Menu
  showBolts={false}
  class="difficultyMenu pitted"
  on:dataCancel
  on:dataCommit
  on:navExit
  on:navBack
  bind:this={menu}
>
  <div class="difficulty pitted">
    <Bolthead dir="tl" />
    <Bolthead dir="bl" />
    <Bolthead dir="tr" />
    <Bolthead dir="br" />
    <div class="title worn-text">Game Difficulty</div>
    <RadialSwitch
      options={Object.values($character.difficultyInfo)}
      bind:value={$character.difficulty}
    />
  </div>
  <PlateButton
    slot="navButtons"
    class="diffClose"
    on:click={() => dispatch(ModalNavEvents.navExit)}>done</PlateButton
  >
</Menu>

<style lang="postcss">
  .title {
    text-align: center;
  }
  :global(.difficultyMenu) {
    padding: 10rem;
    background-color: hsl(var(--bg));
    box-shadow: var(--slb-light-source);
  }
  :global(.diffClose) {
    filter: drop-shadow(-5rem 5rem 5rem rgba(0, 0, 0, 1));
  }
  .difficulty {
    color: #0f0f0f;
    position: relative;
    width: 190rem;
    padding: 3rem 10rem;
    background-color: hsl(var(--bg));
    border-radius: 4rem;
    /* prettier-ignore */
    box-shadow: var(--slb-light-source);
    background-position: 50rem 110rem;
    filter: drop-shadow(-5rem 5rem 5rem rgba(0, 0, 0, 1));
  }
</style>
