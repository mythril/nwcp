<script lang="ts">
  import { preloadCode, preloadData } from '$app/navigation';
  import { RoleToSequel, Role, SupportedRoles } from '$lib/engines/all';
  import type { ObjectValues } from '$lib/typeUtils';
  import { clickSound, sleep } from '$lib/utils';
  import Button from '$lib/components/Buttons/Button.svelte';
  import PlateButton from '$lib/components/Buttons/PlateButton.svelte';
  import RadialSwitch from '$lib/components/RadialSwitch.svelte';
  import { character } from '../../routes/CharacterStore';

  export let value: ObjectValues<typeof Role> | undefined;
  let display: string[];
  let sequel: string;
  let chosenRole: ObjectValues<typeof Role> = $character.role || Role.ChosenOne;
  let roleLink = '';
  let tileOffset = 0;
  let smallOffsets: number[] = [];
  let rotoOffsets: number[] = [];

  $: {
    display = (value || '').padEnd(13, '-').split('');
    sequel = value ? RoleToSequel[value] : '';
    for (let i = 0; i < display.length; i += 1) {
      smallOffsets[i] = Math.random() * 10;
      rotoOffsets[i] = 2.5 - Math.random() * 5;
    }
  }

  $: roleLink = '/' + chosenRole.replace(' ', '-').toLowerCase();

  let navOpen = false;
  const openNav = () => {
    navOpen = true;
  };
  const closeNav = () => {
    navOpen = false;
  };

  const makeChoice = async () => {
    preloadData(roleLink);
    preloadCode(roleLink);
    tileOffset = 100;
    await sleep(1);
    clickSound();
    await sleep(200);
    for (let i = 0; i < 4; i += 1) {
      await sleep(50);
      clickSound();
    }
    await sleep(100);
    value = chosenRole;
    let a = document.createElement('a');
    a.href = roleLink;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    clickSound();
    tileOffset = 1;
    await sleep(200);
    clickSound();
    await sleep(500);
    closeNav();
  };

  function enableToDisable(enabledRecord: Record<string, boolean>) {
    let disabledRecord: Record<string, boolean> = {};
    for (let k of Object.keys(enabledRecord)) {
      disabledRecord[k] = !enabledRecord[k];
    }
    return disabledRecord;
  }
</script>

<div
  class="nav-menu pitted"
  class:navOpen
  style={`--tile-offset: ${tileOffset}`}
>
  <div class="navbar">
    <Button
      class={`open-chooser pushButton ${navOpen ? 'active' : ''}`}
      disabled={navOpen}
      on:click={navOpen ? closeNav : openNav}
    />
    <div class="panel">
      <div class="viewport">
        <div
          style={`
          --small-offset: ${smallOffsets[0]};
          --roto-offset: ${rotoOffsets[0]}
          `}
          class={`sequel-${sequel} tile `}
        />
      </div>
      {#each display as d, i}
        <div class="viewport">
          <div
            style={`
            --small-offset: ${smallOffsets[i]};
            --roto-offset: ${rotoOffsets[i]}
            `}
            class="tile"
          >
            <div class="l">
              {d}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div
    class="chooser"
    inert={!navOpen}
  >
    <div class="switch">
      {#if $character.role !== undefined}
        <RadialSwitch
          options={Object.values(Role)}
          disabled={enableToDisable(SupportedRoles)}
          bind:value={chosenRole}
        />
      {/if}
    </div>
    <div class="button">
      <PlateButton
        on:click={makeChoice}
        type="button"
        href={'/' + roleLink}>Choose</PlateButton
      >
    </div>
  </div>
</div>

<style lang="postcss">
  @property --tile-offset {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
  }
  @property --small-offset {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
  }
  .nav-menu {
    --tile-offset: 0;
    will-change: tile-offset;
    position: absolute;
    bottom: -163rem;
    display: flex;
    flex-flow: column;
    align-content: flex-start;
    background-color: hsl(var(--bg));
    box-shadow: var(--light-source);
    width: 329rem;
    height: 200rem;
    margin: 0 auto;
    border-top-left-radius: 16rem;
    padding: 4rem;
    gap: 2rem;
    transition: bottom 0.2s ease-in-out;
  }
  .navOpen {
    bottom: -60rem;
  }
  .chooser {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 5rem;
    .switch {
      width: 230rem;
    }
  }
  .navbar {
    display: flex;
    align-items: center;
  }
  :global(.open-chooser) {
    padding: 0;
    border: 0;
    margin: 0;
    background-color: transparent;
    --push-button-size: 1.9rem;
    appearance: none;
    width: 16em;
    height: 16em;
    position: static;
    left: 0;
    top: 0;
    &:after {
      display: block;
      position: static;
      left: 0;
      top: 0;
    }
  }
  .button :global(.btn) {
    filter: drop-shadow(-5rem 5rem 5rem #000);
  }
  .panel {
    margin: 3rem;
    line-height: 22rem;
    font-size: 18rem;
    text-transform: uppercase;
    font-family: var(--label-font);
    color: #ddd;
    display: flex;
    flex-flow: row;
    background-color: hsl(var(--bakelite));
    /* prettier-ignore */
    box-shadow:
      1rem -1rem 1rem 0 rgba(0, 0, 0, 0.1)
      ,
      -1rem 1rem 1rem 0 rgba(255, 255, 255, 0.1)
      ;
    position: relative;
    &:after {
      --aged-glass-hs: 48, 50%;
      --hsl: 48, 70%, 50%;
      position: absolute;
      content: ' ';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      /* prettier-ignore */
      background-image: 
        linear-gradient(
          0.2turn,
          transparent 149rem,
          rgba(0,0,0,0.2) 150rem,
          hsla(var(--hsl), 0.2) 151rem,
          transparent 151rem
        ),
        linear-gradient(
          0.3turn,
          transparent 213rem,
          hsla(var(--hsl), 0.2) 214rem,
          rgba(0,0,0,0.2) 214rem,
          rgba(0,0,0,0.2) 215rem,
          transparent 215rem
        )
      ;
      /* prettier-ignore */
      box-shadow:
        inset 0 0 0 1rem hsla(0, 0%, 0%, 0.3),
        inset 0 0 3rem hsla(0, 0%, 100%, 0.2),
        inset 0 0 25rem hsla(var(--hsl), 0.1);
      backdrop-filter: blur(0.3rem);
    }
  }
  .viewport {
    width: 1em;
    height: 26rem;
    text-align: center;
    margin: 1rem;
    background-color: rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    border-top: 2rem solid hsl(0deg, 0%, 5%);
    border-right: 2rem solid hsl(0deg, 0%, 7%);
    border-bottom: 2rem solid hsl(0deg, 0%, 10%);
    border-left: 2rem solid hsl(0deg, 0%, 15%);
    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      box-shadow: inset -2rem 2rem 5rem 0 hsl(0deg, 0%, 0%);
    }
  }
  .tile {
    --small-offset: 0;
    will-change: small-offset;
    transition-property: --small-offset, --tile-offset, top;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transform: rotate(calc(var(--roto-offset) * 1deg))
      translateY(calc((var(--tile-offset) + var(--small-offset)) * 0.23rem));
    background-color: #111;
    height: 25rem;
    overflow: hidden;
    position: relative;
    /* prettier-ignore */
    color: transparent;
    --hs: 0, 0%;
    /* prettier-ignore */
    text-shadow: 0 0 0 hsla(0, 0%, 70%, 1);
  }
  [class^='sequel-'].tile {
    font-size: 10rem;
  }
  .sequel-1,
  .sequel-2,
  .sequel-3 {
    --hs: var(--terminal-color-hs);
    background-color: hsla(var(--terminal-color-hs), 5%);
  }
  .sequel-1:after {
    content: '1';
  }
  .sequel-2:after {
    content: '2';
  }
  .sequel-3:after {
    content: '3';
  }
  .sequel-NV {
    --hs: var(--title-color-hs);
    background-color: hsla(var(--title-color-hs), 10%);
  }
  .tile.sequel-NV:after {
    display: block;
    content: 'NV';
    transform: rotate(-90deg);
  }
  .sequel-T {
    --hs: 0, 100%;
    background-color: hsl(0, 100%, 5%);
    &:after {
      content: 'T';
    }
  }
</style>
