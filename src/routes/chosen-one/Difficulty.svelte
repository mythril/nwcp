<script lang="ts">
  import { Difficulty } from '$lib/engines/ChosenOne/main';
  import Bolthead from './Bolthead.svelte';
  import Menu from './Menu.svelte';
  import PlateButton from './PlateButton.svelte';
  import RadialSwitch from './RadialSwitch.svelte';
  import { difficulty } from './stores';

  let menu: Menu;

  export const show = () => {
    if (menu) {
      menu.show();
    }
  };
</script>

<Menu
  showBolts={false}
  class="difficultyMenu pitted"
  bind:this={menu}
>
  <div class="difficulty pitted">
    <Bolthead dir="tl" />
    <Bolthead dir="bl" />
    <Bolthead dir="tr" />
    <Bolthead dir="br" />
    <div class="title worn-text">Game Difficulty</div>
    <RadialSwitch
      options={Object.values(Difficulty)}
      bind:value={$difficulty}
    />
  </div>
  <PlateButton
    slot="closeButton"
    class="diffClose"
    let:hider
    on:click={hider}>done</PlateButton
  >
</Menu>

<style lang="postcss">
  .title {
    text-align: center;
  }
  :global(.difficultyMenu) {
    padding: 10rem;
    background-color: hsl(var(--bg));
  }
  :global(.diffClose) {
    filter: drop-shadow(-5rem 5rem 5rem rgba(0, 0, 0, 1));
  }
  .difficulty {
    position: relative;
    width: 190rem;
    height: 77rem;
    padding: 3rem 10rem;
    background-color: hsl(var(--bg));
    border-radius: 4rem;
    /* prettier-ignore */
    box-shadow: var(--slb-light-source);
    background-position: 50rem 110rem;
    filter: drop-shadow(-5rem 5rem 5rem rgba(0, 0, 0, 1));
  }
</style>
