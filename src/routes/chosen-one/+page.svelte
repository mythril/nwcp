<script lang="ts">
  import {
    AilmentStatus,
    DerivedStats,
    Sex,
    Skills,
    Special,
    SpecialAbbreviation,
    Traits
  } from '$lib/engines/ChosenOne';
  import Attribute from './Attribute.svelte';
  import Bolthead from './Bolthead.svelte';
  import Help from './Help.svelte';
  import HelpSource from './HelpSource.svelte';
  import TwoDigitDisplay from './TwoDigitDisplay.svelte';
  import PlateButton from './PlateButton.svelte';
  import { clickSound } from '$lib/utils';
  import NameChanger from './NameChanger.svelte';
  import AgeChanger from './AgeChanger.svelte';
  import SexChanger from './SexChanger.svelte';

  let name = '';
  let age = 25;
  let sex = Sex.Male;

  let chosenTraits: string[] = [];
  let traits = Object.keys(Traits);
  let leftTraits = traits.slice(0, 8);
  let rightTraits = traits.slice(8, 16);
</script>

<svg>
  <filter id="paper">
    <feTurbulence
      x="0"
      y="0"
      baseFrequency="0.01"
      numOctaves="5"
      seed="1"
    />
    <feDisplacementMap
      in="SourceGraphic"
      scale="10"
    />
  </filter>
</svg>

<div class="parent">
  <div class="name-age-sex">
    <div class="name">
      <NameChanger {name} />
    </div>
    <div class="age">
      <AgeChanger {age} />
    </div>
    <div class="sex">
      <SexChanger {sex} />
    </div>
  </div>
  <div class="special slate">
    {#each Object.values(Special) as attr}
      <HelpSource subject={attr}>
        <Attribute
          label={SpecialAbbreviation(attr)}
          value={Math.round(Math.random() * 9 + 1)}
        />
      </HelpSource>
    {/each}
  </div>
  <div class="health slate monitor terminal-font-defaults">
    <div class="display">
      <HelpSource subject="Hit Points">
        <div
          role="link"
          tabindex="0"
        >
          Hit Points 30/30
        </div>
      </HelpSource>
      <div class="ailments">
        {#each Object.values(AilmentStatus) as ailment}
          <HelpSource subject={ailment}>
            <div
              role="link"
              tabindex="0"
            >
              {ailment}
            </div>
          </HelpSource>
        {/each}
      </div>
    </div>
    <Bolthead dir="tl" />
    <Bolthead dir="tr" />
    <Bolthead dir="br" />
    <Bolthead dir="ml" />
    <Bolthead dir="bl" />
    <Bolthead dir="mr" />
  </div>
  <div class="derived-stats slate monitor terminal-font-defaults">
    <div class="display">
      <table class="highlighted">
        <tbody>
          {#each Object.values(DerivedStats) as derived}
            <tr>
              <th>
                <HelpSource subject={derived}>
                  <div
                    role="link"
                    tabindex="0"
                  >
                    {derived}
                  </div>
                </HelpSource>
              </th>
              <td>
                <HelpSource subject={derived}>
                  {Math.round(Math.random() * 150) +
                    (Math.random() > 0.25 ? '' : '%')}
                </HelpSource>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <Bolthead dir="ml" />
    <Bolthead dir="tr" />
    <Bolthead dir="bl" />
    <Bolthead dir="tl" />
    <Bolthead dir="br" />
    <Bolthead dir="mr" />
  </div>
  <div class="char-points slate">
    <HelpSource subject="Character Points">
      <div
        role="link"
        tabindex="0"
        class="label worn-text"
      >
        CHAR POINTS
      </div>
      <div class="inset-border">
        <TwoDigitDisplay
          initial={Math.round(Math.random() * 9 + 1)}
          min={0}
          max={70}
        />
      </div>
      <Bolthead dir="tl" />
      <Bolthead dir="tr" />
      <Bolthead dir="bl" />
      <Bolthead dir="br" />
    </HelpSource>
  </div>
  <div class="traits">
    <div class="flanges">
      <HelpSource subject="Optional Traits">
        <div
          role="link"
          tabindex="0"
          class="before worn-text"
        >
          Optional traits
        </div>
      </HelpSource>
      <div class="flange-set-left">
        <div class="flange" />
        <div class="flange" />
        <div class="flange" />
        <div class="flange" />
      </div>
      <div class="flange-set-right">
        <div class="flange" />
        <div class="flange" />
        <div class="flange" />
        <div class="flange" />
      </div>
      <div class="terminal terminal-font-defaults">
        <div class="leftTraits">
          {#each leftTraits as trait}
            <div class="trait">
              <HelpSource subject={Traits[trait]}>
                <input
                  type="checkbox"
                  class="checkbox-button"
                  on:click={clickSound}
                  bind:group={chosenTraits}
                  value={trait}
                />
                <div
                  data-trait={trait}
                  role="link"
                  class={chosenTraits.includes(trait) ? 'selected' : ''}
                >
                  {Traits[trait]}
                </div>
              </HelpSource>
            </div>
          {/each}
        </div>
        <div class="rightTraits">
          {#each rightTraits as trait}
            <div class="trait">
              <HelpSource subject={Traits[trait]}>
                <input
                  type="checkbox"
                  class="checkbox-button"
                  on:click={clickSound}
                  bind:group={chosenTraits}
                  value={trait}
                />
                <div
                  data-trait={trait}
                  role="link"
                  class={chosenTraits.includes(trait) ? 'selected' : ''}
                >
                  {Traits[trait]}
                </div>
              </HelpSource>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  <div class="tagged-skills">
    <HelpSource subject="Skills">
      <div
        role="link"
        tabindex="0"
        class="before worn-text"
      >
        Skills
      </div>
    </HelpSource>
    <div class="skills terminal-font-defaults">
      {#each Object.values(Skills) as skill}
        <HelpSource subject={skill}>
          <div class="skill">
            <div class="button">
              <input
                type="checkbox"
                class="checkbox-button"
                on:click={clickSound}
                name=""
                id=""
              />
            </div>
            <div class="label">
              {skill}
            </div>
            <div class="value">
              {(Math.random() * 150 + 1).toFixed(0)}%
            </div>
          </div>
        </HelpSource>
      {/each}
    </div>
    <div class="skills-remaining">
      <HelpSource subject={'Tag Skills'}>
        <div
          role="link"
          tabindex="0"
          class="label worn-text"
        >
          Tag Skills
        </div>
        <div class="unused">
          <TwoDigitDisplay
            initial={3}
            min={0}
            max={3}
          />
        </div>
      </HelpSource>
    </div>
  </div>
  <div class="help">
    <Help />
  </div>
  <div class="buttons">
    <PlateButton class="perks">Perks</PlateButton>
    <PlateButton class="items">Items</PlateButton>
    <PlateButton class="stats">Stats</PlateButton>
  </div>
</div>

<style lang="postcss">
  .parent {
    display: grid;
    grid-template-columns: 25.5625% 25.5625% 1% 46.375%;
    grid-template-rows: repeat(30, 1fr);
    grid-column-gap: 0.5%;
    grid-row-gap: 5rem;
    grid-template-areas:
      'nas nas . skills'
      'nas nas . skills'
      'special health . skills'
      'special health . skills'
      'special health . skills'
      'special health . skills'
      'special health . skills'
      'special health . skills'
      'special health . skills'
      'special health . skills'
      'special derived . skills'
      'special derived . skills'
      'special derived . skills'
      'special derived . skills'
      'special derived . skills'
      'special derived . skills'
      'special derived . help'
      'points derived . help'
      'points derived . help'
      'points derived . help'
      'traits traits . help'
      'traits traits . help'
      'traits traits . help'
      'traits traits . help'
      'traits traits . help'
      'traits traits . help'
      'traits traits . help'
      'traits traits . help'
      'traits traits . buttons'
      'traits traits . buttons';
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    filter: drop-shadow(-5rem 5rem 3rem #000) drop-shadow(-5rem 5rem 3rem #000);
  }

  .name-age-sex {
    grid-area: nas;
    display: flex;
    justify-content: center;
    /* width: 93.75%; */
    .name {
      width: calc(46.66 * 0.9375%);
    }
    .age {
      width: calc(26.66 * 0.9375%);
    }
    .sex {
      width: calc(26.66 * 0.9375%);
    }
  }

  .monitor {
    & {
      position: relative;
    }
    & .display {
      table,
      th,
      td,
      tr {
        text-align: left;
        padding: 0;
        border: 0;
        table-layout: fixed;
        border-spacing: 0;
      }
      td {
        padding-left: 12rem;
      }
      padding: 7rem;
      position: absolute;
      top: 5%;
      bottom: 5%;
      left: 7%;
      right: 7%;
      line-height: 1.7;
      background-color: hsl(var(--terminal-bg));
      border-radius: 8rem 7rem;
      box-shadow: var(--inset);
    }
  }

  .special {
    grid-area: special;
    border-radius: 2rem;
    border-bottom-left-radius: 9rem 5rem;
    padding: 6rem 7rem;
  }
  .char-points {
    .inset-border {
      border-radius: 2rem;
      box-shadow: var(--inset);
    }
    grid-area: 18 / 1 / 21 / 2;
    position: relative;
    border-radius: 2rem;
    border-bottom-left-radius: 5rem 3rem;
    display: flex;
    justify-content: space-between;
    padding-left: 4rem;
    padding-right: 16rem;
    align-items: center;
    .label {
      font-size: 23rem;
    }
  }
  .health {
    grid-area: health;
    border-radius: 7rem;
    :global(.activeHelpSubject) {
      color: hsl(var(--terminal-color-active));
    }
    .ailments {
      color: hsl(var(--terminal-faded));
      :global(.activeHelpSubject) {
        color: hsl(var(--terminal-faded-active));
      }
    }
  }
  .derived-stats {
    grid-area: derived;
    :global(.activeHelpSubject) {
      color: hsl(var(--terminal-color-active));
    }
    border-radius: 7rem;
  }
  .tagged-skills {
    position: relative;
    .skills-remaining {
      position: absolute;
      bottom: 0;
      height: 44rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: hsl(var(--title-bg));
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      border-bottom-left-radius: 15rem;
      border-bottom-right-radius: 15rem;
      box-shadow: var(--sharp-light-source);
      .unused {
        border-radius: 2rem;
        overflow: hidden;
        box-shadow: var(--inset);
      }
      :global(.remaining) {
        border: 0;
      }
      .label {
        font-size: 22rem;
        padding-right: 10rem;
      }
    }
    &::before {
      content: ' ';
      box-shadow: var(--sharp-light-source);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 28rem;
      background-color: hsl(var(--title-bg));
      border-top-left-radius: 15rem;
      border-top-right-radius: 15rem;
      border-bottom-left-radius: 2rem;
      border-bottom-right-radius: 2rem;
    }
    .before {
      padding-left: 58rem;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 28rem;
      font-size: 22rem;
    }

    grid-area: skills;
    .skills {
      display: flex;
      flex-flow: column;
      width: 97%;
      height: 87%;
      padding: 15rem 0;
      margin: 13rem auto;
      line-height: 1.48;
      background: linear-gradient(
        0.25turn,
        #0c0c0c 0%,
        #3c3c3c 2.1%,
        #0e0d09 3.7%,
        #343220 7.4%,
        #343220 8.4%,
        #545454 8.7%,
        hsl(var(--terminal-bg)) 9%,
        hsl(var(--terminal-bg)) 95.8%,
        #6b6b6b 98.4%,
        #1c1c1c 100%
      );
      .skill {
        display: flex;
        flex-flow: row;
      }
      .activeHelpSubject .skill {
        color: hsl(var(--terminal-color-active));
      }
      .button {
        width: 39rem;
        max-height: 14rem;
      }
      .label {
        width: 266rem;
        padding-left: 15rem;
      }
      .value {
        text-align: right;
        padding-right: 45rem;
        width: 77rem;
      }
    }
  }
  .traits {
    /* $ruddy: #43281d; */
    /* $ruddy: #412520; */
    /* $ruddy: #381B15; */
    /* $ruddy: #383328; */
    /* $ruddy: mix(#383328, #43281d); */
    --ruddy-hs: 24.4, 27.8%;
    --ruddy-l: 19%;
    --ruddy: var(--ruddy-hs), var(--ruddy-l);
    grid-area: traits;
    .flanges {
      height: 92%;
      position: relative;
      .before {
        position: absolute;
        bottom: 100%;
        z-index: 1;
        font-size: 22rem;
        line-height: 1.5;
        padding: 0;
        padding-left: 40rem;
      }
      .flange {
        background-color: hsl(var(--ruddy));
        width: 12rem;
        height: 17rem;
      }
      .flange-set-left,
      .flange-set-right {
        position: absolute;
        top: 26%;
      }
      .flange-set-left {
        left: -7rem;
        &::after {
          content: ' ';
          background-color: hsl(var(--ruddy));
          position: absolute;
          left: 10rem;
          top: 0;
          bottom: 0;
          width: 5rem;
        }
        .flange {
          border-top-left-radius: 2rem;
          border-bottom-left-radius: 2rem;
          /* prettier-ignore */
          box-shadow:
            0 3rem 2rem -2rem rgba(255, 255, 255, 0) inset,
            3rem -3rem 4rem -1rem hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 50%)) inset;
          &:first-child {
            /* prettier-ignore */
            box-shadow:
              0 3rem 2rem -2rem rgba(255, 255, 255, 0.25) inset,
              3rem -3rem 4rem -1rem hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 50%)) inset;
          }
        }
        .flange:first-child {
          border-top-left-radius: 4rem;
        }
        .flange:last-child {
          border-bottom-left-radius: 4rem;
        }
      }
      .flange-set-right {
        right: -7rem;
        &::after {
          content: ' ';
          background-color: hsl(var(--ruddy));
          position: absolute;
          right: 7rem;
          top: 0;
          bottom: 0;
          width: 5rem;
        }
        .flange {
          border-top-right-radius: 2rem;
          border-bottom-right-radius: 2rem;
          /* prettier-ignore */
          box-shadow:
            -3rem 0 2rem -2rem rgba(255, 255, 255, 0.25) inset,
            0 -3rem 2rem -1rem hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 50%)) inset;
          &:first-child {
            /* prettier-ignore */
            box-shadow:
              -3rem 2rem 2rem -2rem rgba(255, 255, 255, 0.25) inset,
              0 -3rem 3rem -1rem hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 50%)) inset;
          }
        }
        .flange:first-child {
          border-top-right-radius: 4rem;
        }
        .flange:last-child {
          border-bottom-right-radius: 4rem;
        }
      }
    }
    .terminal {
      height: 100%;
      display: flex;
      flex-flow: row;
      padding-top: 4rem;
      background: linear-gradient(
        0.25turn,
        hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 20%)) 0%,
        hsl(var(--ruddy)) 1%,
        hsl(var(--ruddy)) 7.2%,
        hsl(var(--ruddy-hs), calc(var(--ruddy-l) + 20%)) 8%,
        hsl(var(--terminal-bg)) 8%,
        hsl(var(--terminal-bg)) 91.5%,
        hsl(var(--ruddy)) 92.3%,
        hsl(var(--ruddy)) 99%,
        #65584f 99.9%
      );
      /* ^ruddy mixed with #fff 80% */
    }
    border-radius: 15rem;
    background-color: hsl(var(--bg));
    margin: 10rem;
    margin-top: 0;
    padding: 0;
    padding-top: 33rem;
    background-color: hsl(var(--ruddy));
    position: relative;
    color: hsl(var(--terminal-color));
    .activeHelpSubject [data-trait] {
      color: hsl(var(--terminal-color-active));
      &.selected {
        color: hsl(var(--terminal-selected-active));
      }
    }
    [data-trait] {
      &.selected {
        color: hsl(var(--terminal-selected));
      }
    }
    .trait {
      position: relative;
      input {
        position: absolute;
      }
    }
    .leftTraits {
      width: 60%;
      [data-trait] {
        padding-left: 40rem;
      }
      input {
        left: 0;
      }
      .trait {
        &::after {
          content: ' ';
          position: absolute;
          top: 8rem;
          left: 30rem;
          width: 5rem;
          height: 2rem;
          background-color: rgba(#000, 0.25);
        }
      }
    }
    .rightTraits {
      width: 40%;
      [data-trait] {
        padding-right: 54rem;
      }
      input {
        right: 0;
      }
      .trait {
        &::after {
          content: ' ';
          position: absolute;
          top: 8rem;
          right: 30rem;
          width: 5rem;
          height: 2rem;
          background-color: rgba(#000, 0.25);
        }
      }
    }
    &::after,
    &::before {
      z-index: 1;
      position: absolute;
      left: -3rem;
      right: -3rem;
      background-color: hsl(var(--bg));
    }
    &::before {
      border-top-left-radius: 13rem;
      border-top-right-radius: 13rem;
      border-bottom-left-radius: 5rem;
      border-bottom-right-radius: 5rem;
      /* prettier-ignore */
      box-shadow: 
        var(--basic-box-shadow),
        0 6rem 3rem 0 rgba(0, 0, 0, 0.4),
        var(--underbelly-shadow);
      height: 33rem;
      content: ' ';
      top: 0;
      margin: 0;
    }
    &::after {
      content: ' ';
      height: 20rem;
      bottom: 0;
      border-bottom-left-radius: 15rem;
      border-bottom-right-radius: 15rem;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      /* prettier-ignore */
      box-shadow:
        var(--basic-box-shadow),
        var(--underbelly-shadow);
    }
  }
  .help {
    position: relative;
    padding: 8rem 10rem;
    grid-area: help;
    /* prettier-ignore */
    box-shadow: 
      0 0 0 1rem rgba(#000, 0.5),
      -1rem 1rem 2rem -1rem rgba(#fff, 0.5),
      -1rem 1rem 2rem -1rem rgba(#fff, 0.5) inset;
  }
  .buttons {
    grid-area: buttons;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10rem;
    :global(.perks) {
      width: 140rem;
    }
    :global(.items) {
      width: 120rem;
    }
    :global(.stats) {
      width: 120rem;
    }
  }
</style>
