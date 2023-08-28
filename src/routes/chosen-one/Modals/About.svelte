<script lang="ts">
  import Bolthead from '../Widgets/Bolthead.svelte';
  import Menu from '../Widgets/Menu.svelte';
  import PlateButton from '../Widgets/Buttons/PlateButton.svelte';

  let menu: Menu;

  import { createEventDispatcher } from 'svelte';
  import {
    ModalNavEvents,
    type ModalEventSignature
  } from '../ModalManager.svelte';
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
  class="aboutBox pitted"
  on:dataCancel
  on:dataCommit
  on:navExit
  on:navBack
  bind:this={menu}
>
  <div class="about pitted">
    <Bolthead dir="bl" />
    <Bolthead dir="tl" />
    <Bolthead dir="br" />
    <Bolthead dir="tr" />
    <div class="title worn-text">
      About: Nuclear Wasteland Character Planner
    </div>
    <div class="display terminal-font-defaults">
      <h2>Who?</h2>
      <p>Random internet enthusiast.</p>
      <h2>What?</h2>
      <p>
        A character planner for characters in everyone's favorite
        post-apocalyptic setting
      </p>
      <h2>Why?</h2>
      <p>Many reasons:</p>
      <ul>
        <li>
          I was looking for a character planner online and no good ones stood
          out to me
        </li>
        <li>
          I don't like installing software on my computer for this sort of thing
        </li>
        <li>
          I wanted to try out a new (to me) JS framework (<a
            target="_blank"
            href="https://svelte.dev/">Svelte</a
          >) in a non-trivial app
        </li>
        <li>I love these games.</li>
        <li>More that I can't think of right now</li>
      </ul>
      <h2>Where?</h2>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://github.com/mythril/nwcp"
            >Github for the source code.</a
          >
        </li>
        <li>
          <a href=".">Right here</a>
        </li>
      </ul>
      <h2>What if I don't have the game?</h2>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://www.gog.com/en/games?query=bethesda%20fallout&order=desc:score"
            >GOG.com</a
          > has it.
        </li>
        <li>
          <a
            target="_blank"
            href="https://store.steampowered.com/search/?sort_by=Reviews_DESC&term=bethesda+fallout&supportedlang=english&ndl=1"
            >Steam</a
          > does too.
        </li>
      </ul>
    </div>
  </div>
  <PlateButton
    slot="navButtons"
    class="aboutClose"
    on:click={() => dispatch(ModalNavEvents.navExit)}>done</PlateButton
  >
</Menu>

<style lang="postcss">
  .title {
    text-align: center;
    flex-grow: 0;
  }
  .display {
    padding: 5rem;
    font-size: 7rem;
    flex-grow: 1;
    width: 100%;
    background-color: hsl(var(--terminal-bg));
    box-shadow: var(--inset);
  }
  .display a {
    color: hsl(var(--terminal-color-active));
  }
  :global(.aboutBox) {
    padding: 10rem;
    background-color: hsl(var(--bg));
    border-radius: 4rem;
    /* prettier-ignore */
    box-shadow: var(--slb-light-source);
  }
  :global(.aboutClose) {
    filter: drop-shadow(-5rem 5rem 5rem rgba(0, 0, 0, 1));
  }
  .about {
    align-items: center;
    gap: 5rem;
    color: #0f0f0f;
    position: relative;
    width: 620rem;
    height: 432rem;
    padding: 8rem 15rem;
    padding-bottom: 15rem;
    background-color: hsl(var(--bg));
    border-radius: 4rem;
    /* prettier-ignore */
    box-shadow: var(--slb-light-source);
    background-position: 50rem 110rem;
    filter: drop-shadow(-5rem 5rem 5rem rgba(0, 0, 0, 1));
    display: flex;
    flex-flow: column;
  }
</style>
