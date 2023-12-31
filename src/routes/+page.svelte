<script lang="ts">
  import Bolthead from '$lib/components/Bolthead.svelte';
  import { Role, RoleToSequel, SupportedRoles } from '$lib/engines/all';
  import type { ObjectValues } from '$lib/typeUtils';
  import { onMount } from 'svelte';
  import { role } from './RoleStore';
  import { hideMain } from '$lib/components/UI/Main.svelte';
  import { fly } from 'svelte/transition';
  import { quintIn, quintOut } from 'svelte/easing';
  import PanicPlunger from '$lib/components/Buttons/PanicPlunger.svelte';
  import { navTo } from '$lib/components/RoleDisplay.svelte';
  import { isEmbedded } from '$lib/utils';
  import SlateButton from '$lib/components/Buttons/SlateButton.svelte';
  import Portal from '$lib/components/Portal.svelte';

  $role = Role.None;

  type RoleInfo = {
    role: ObjectValues<typeof Role>;
    born: string;
    area: string;
    mission: string;
    year: string;
  };

  const roleInfo: RoleInfo[] = [
    {
      role: Role.VaultDweller,
      born: '2141 (canonical)',
      area: 'New California',
      mission: 'Locate water chip, save vault',
      year: '2161'
    },
    {
      role: Role.ChosenOne,
      born: '2221 March 23 (canonical)',
      area: 'New California',
      mission: 'Locate G.E.C.K., save tribe',
      year: '2241'
    },
    {
      role: Role.Warrior,
      born: '2172 +- 25 years',
      area: 'Chicago',
      mission: 'Locate Vault 0',
      year: '2197'
    },
    {
      role: Role.LoneWanderer,
      born: 'July 13, 2258 (canonical)',
      area: 'Capitol Wasteland',
      mission: 'Locate father',
      year: '2277'
    },
    {
      role: Role.Courier,
      born: 'Unknown, prior to 2281',
      area: 'New Vegas',
      mission: 'Determine why you were shot',
      year: '2281'
    }
  ];

  onMount(() => ($hideMain = false));

  const order: ('tl' | 'tr' | 'bl' | 'br')[] = ['tl', 'tr', 'bl', 'br'];

  function shuffle(array: ('tl' | 'tr' | 'bl' | 'br')[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  }

  const animNav = (role: ObjectValues<typeof Role>) => {
    return async (_e: MouseEvent) => {
      $navTo = role;
    };
  };

  const animNavKeyboard = (role: ObjectValues<typeof Role>) => {
    return async (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        $navTo = role;
      }
    };
  };
</script>

{#if $hideMain === false}
  <div
    class="landing interface-structure"
    in:fly={{ y: '-150%', duration: 300, opacity: 1, easing: quintOut }}
    out:fly={{ y: '-150%', duration: 300, opacity: 1, easing: quintIn }}
  >
    <div class="title pitted">
      <Bolthead dir="mr" />
      <Bolthead dir="ml" />
      <h1 class="worn-text">Nuclear Wasteland Character Planner</h1>
    </div>

    {#if isEmbedded()}
      <Portal>
        <div class="embeddedBailer">
          <div class="worn-text">
            This page is not designed for embedded use.
          </div>
          <SlateButton
            type="link"
            target="_blank"
            href=".">Open Full Site</SlateButton
          >
        </div>
      </Portal>
    {/if}
    {#if !isEmbedded()}
      <div
        class="explain-chooser slate terminal-font-defaults brightness-variance"
      >
        <Bolthead dir="tr" />
        <Bolthead dir="bl" />
        <Bolthead dir="tl" />
        <Bolthead dir="mr" />
        <Bolthead dir="br" />
        <Bolthead dir="ml" />
        <div class="display">
          <p>
            Turn the dial in the area below until the switch points to the role
            you wish to plan for, then press choose.
          </p>
          <p>
            If you are not familiar with what is meant by these roles, a brief
            summary of each is on the right.
          </p>
          <p>
            The roles are listed in the order that their respective games were
            released.
          </p>
        </div>
      </div>

      <div class="history">
        {#each roleInfo as ri}
          <div
            role="button"
            tabindex="0"
            class={'role-history sequel-' + RoleToSequel[ri.role]}
            class:supported={SupportedRoles[ri.role]}
            inert={!SupportedRoles[ri.role]}
            on:click={animNav(ri.role)}
            on:keydown={animNavKeyboard(ri.role)}
          >
            <div
              class="description slate terminal-font-defaults brightness-variance"
            >
              {#each shuffle(order) as dir}
                <Bolthead {dir} />
              {/each}
              <div class="display">
                <table>
                  <tr>
                    <th> Role </th>
                    <td> {ri.role} </td>
                  </tr>
                  <tr>
                    <th> Born </th>
                    <td> {ri.born} </td>
                  </tr>
                  <tr>
                    <th> Area </th>
                    <td> {ri.area} </td>
                  </tr>
                  <tr>
                    <th> Mission </th>
                    <td> {ri.mission} </td>
                  </tr>
                  <tr>
                    <th> Year </th>
                    <td> {ri.year} </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="button-section slate brightness-variance">
              <div class={'tile tile-sequel-' + RoleToSequel[ri.role]}>
                {#each shuffle(order) as dir}
                  <Bolthead
                    {dir}
                    size={4}
                  />
                {/each}
                {RoleToSequel[ri.role]}
              </div>
              <PanicPlunger
                type={'button'}
                on:click={animNav(ri.role)}
              />
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style lang="postcss">
  .landing {
    /* prettier-ignore */
    grid-template-areas:
      'title title title title'
      'explain explain . history'
      'explain explain . history'
      'explain explain . history'
      'explain explain . history'
      'f f .  history'
    ;
    filter: drop-shadow(-5rem 5rem 5rem black);
    .display {
      padding: 0 5rem;
      border-radius: 5rem;
      margin: 10rem;
      background-color: hsl(var(--terminal-bg));
      box-shadow: var(--inset);
    }
  }
  .embeddedBailer {
    font-size: 30rem !important;
    position: absolute;
    top: 200rem;
    left: 100rem;
    right: 100rem;
    bottom: auto;
    .worn-text {
      text-align: center;
      margin: 15rem 0;
    }
  }
  .role-history {
    display: flex;
    flex-flow: row;
    gap: 5rem;
    cursor: pointer;
  }
  .role-history:not(.supported) {
    filter: grayscale(100%) brightness(0.5);
  }
  .button-section {
    flex-grow: 1;
    border-radius: 5rem;
    display: flex;
    flex-flow: column;
    padding: 10rem;
    gap: 10rem;
  }
  .landing :global(button.btn) {
    background-color: transparent;
    border: none;
    appearance: none;
  }
  .tile {
    position: relative;
    font-family: var(--label-font);
    font-weight: 700;
    font-size: 20rem;
    text-align: center;
    color: transparent;
    text-shadow: 0 0 0 hsla(0, 0%, 70%, 1);
    --hs: var(--terminal-color-hs);
    background-color: hsla(var(--terminal-color-hs), 5%);
    border-left: 1rem solid rgba(0, 0, 0, 0.7);
    border-bottom: 1rem solid rgba(0, 0, 0, 0.7);
    border-top: 1rem solid rgba(255, 255, 255, 0.3);
    border-right: 1rem solid rgba(255, 255, 255, 0.3);
    /* prettier-ignore */
    /*
    box-shadow: 
      -1rem 1rem 0 1rem rgba(0, 0, 0, 0.7),
      1rem -1rem 0 1rem rgba(255, 255, 255, 0.3);
      */
  }
  .tile.tile-sequel-T {
    --hs: 0, 100%;
    background-color: hsl(0, 100%, 5%);
  }
  .tile.tile-sequel-NV {
    --hs: var(--title-color-hs);
    background-color: hsla(var(--title-color-hs), 10%);
  }
  .explain-chooser {
    grid-area: explain;
    position: relative;
    border-radius: 5rem;
    p {
      margin-top: 0;
    }
    .display {
      height: 265rem;
    }
  }
  .history {
    grid-area: history;
    display: flex;
    flex-flow: column;
    gap: 4rem;
    .description {
      width: 230rem;
      border-radius: 5rem;
      position: relative;
    }
    .display {
      table {
        line-height: 1.6;
      }
      th,
      td {
        white-space: nowrap;
      }
      th {
        width: 40rem;
        text-align: right;
        &:after {
          content: ':';
        }
      }
      td {
        padding-left: 2rem;
      }
    }
  }
  .title {
    border-radius: 5rem;
    background-color: hsl(var(--bg));
    position: relative;
    grid-area: title;
    text-align: center;
    border: 1rem solid hsl(var(--bg-hs), 12%);
    box-shadow: var(--light-source);
  }
  h1 {
    margin: 0;
    font-size: 25rem;
  }

  /*
.interface-structure {
    padding-left: 10rem;
    padding-bottom: 8rem;
    display: grid;
    grid-template-columns: 160rem 157rem 3rem 305rem;
    grid-template-rows: 32rem 129rem 90rem 12rem 50rem 128rem 32rem;
    row-gap: 2rem;
    column-gap: 2rem;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
  }
*/
</style>
