<script lang="ts">
  import Bolthead from '$lib/components/Bolthead.svelte';
  import { Role } from '$lib/engines/all';
  import type { ObjectValues } from '$lib/typeUtils';
  import { onMount } from 'svelte';
  import { role } from './RoleStore';
  import { hideMain } from '$lib/components/UI/Main.svelte';
  import { fly } from 'svelte/transition';
  import { quintIn, quintOut } from 'svelte/easing';

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
      born: '2141',
      area: 'New California',
      mission: 'Locate water chip, save vault',
      year: '2161'
    },
    {
      role: Role.ChosenOne,
      born: '2221 March 23',
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
      born: 'July 13, 2258',
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
        <div class="slate terminal-font-defaults brightness-variance">
          <Bolthead dir="bl" />
          <Bolthead dir="tr" />
          <Bolthead dir="br" />
          <Bolthead dir="tl" />
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
      {/each}
    </div>
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
      '. . .  history'
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
    .slate {
      width: 230rem;
      border-radius: 5rem;
      position: relative;
    }
    .display {
      table {
        line-height: 1.3;
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
