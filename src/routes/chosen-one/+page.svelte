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
  <div class="special">
    {#each Object.values(Special) as attr}
      <HelpSource subject={attr}>
        <Attribute
          label={SpecialAbbreviation(attr)}
          value={Math.round(Math.random() * 9 + 1)}
        />
      </HelpSource>
    {/each}
  </div>
  <div class="health terminal-font-defaults">
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
  <div class="derived-stats terminal-font-defaults">
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
  <div class="char-points">
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

<style lang="scss">
  .parent {
    display: grid;
    grid-template-columns: 25.5625% 25.5625% 1% 46.375%;
    grid-template-rows: repeat(30, 1fr);
    grid-column-gap: 0.5%;
    grid-row-gap: px(5);
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
    filter: drop-shadow(px(-5) px(5) px(3) #000)
      drop-shadow(px(-5) px(5) px(3) #000);
  }

  .name-age-sex {
    grid-area: nas;
    display: flex;
    justify-content: center;
    // width: 93.75%;
    .name {
      width: (46.66 * 0.9375) * 1%;
    }
    .age {
      width: (26.66% * 0.9375) * 1;
    }
    .sex {
      width: (26.66% * 0.9375) * 1;
    }
  }

  @mixin monitor() {
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
        padding-left: px(12);
      }
      padding: px(7);
      position: absolute;
      top: 5%;
      bottom: 5%;
      left: 7%;
      right: 7%;
      line-height: 1.7;
      background-color: hsl(var(--terminal-bg));
      border-radius: px(8) px(7);
      box-shadow: var(--inset);
    }
  }

  .special {
    grid-area: special;
    @include slate();
    border-radius: px(2);
    border-bottom-left-radius: px(9) px(5);
    padding: px(6) px(7);
  }
  .char-points {
    .inset-border {
      border-radius: px(2);
      box-shadow: var(--inset);
    }
    grid-area: 18 / 1 / 21 / 2;
    position: relative;
    @include slate();
    border-radius: px(2);
    border-bottom-left-radius: px(5) px(3);
    display: flex;
    justify-content: space-between;
    padding-left: px(4);
    padding-right: px(16);
    align-items: center;
    .label {
      font-size: px(23);
    }
  }
  .health {
    grid-area: health;
    @include slate();
    @include monitor();
    border-radius: px(7);
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
    @include slate();
    @include monitor();
    :global(.activeHelpSubject) {
      color: hsl(var(--terminal-color-active));
    }
    border-radius: px(7);
  }
  .tagged-skills {
    position: relative;
    .skills-remaining {
      position: absolute;
      bottom: 0;
      height: px(44);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: hsl(var(--title-bg));
      border-top-left-radius: px(2);
      border-top-right-radius: px(2);
      border-bottom-left-radius: px(15);
      border-bottom-right-radius: px(15);
      box-shadow: var(--sharp-light-source);
      .unused {
        border-radius: px(2);
        overflow: hidden;
        box-shadow: var(--inset);
      }
      :global(.remaining) {
        border: 0;
      }
      .label {
        font-size: px(22);
        padding-right: px(10);
      }
    }
    &::before {
      content: ' ';
      box-shadow: var(--sharp-light-source);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: px(28);
      background-color: hsl(var(--title-bg));
      border-top-left-radius: px(15);
      border-top-right-radius: px(15);
      border-bottom-left-radius: px(2);
      border-bottom-right-radius: px(2);
    }
    .before {
      padding-left: px(58);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: px(28);
      font-size: px(22);
    }

    grid-area: skills;
    .skills {
      display: flex;
      flex-flow: column;
      width: 97%;
      height: 87%;
      padding: px(15) 0;
      margin: px(13) auto;
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
        width: px(39);
        max-height: px(14);
      }
      .label {
        width: px(38 * 7);
        padding-left: px(15);
      }
      .value {
        text-align: right;
        padding-right: px(45);
        width: px(38 * 2 + 1);
      }
    }
    input[type='checkbox'] {
      @include checkbox-button();
    }
  }
  .traits {
    // $ruddy: #43281d;
    // $ruddy: #412520;
    // $ruddy: #381B15;
    // $ruddy: #383328;
    $ruddy: mix(#383328, #43281d);
    grid-area: traits;
    .flanges {
      height: 92%;
      position: relative;
      .before {
        position: absolute;
        bottom: 100%;
        z-index: 1;
        font-size: px(22);
        line-height: 1.5;
        padding: 0;
        padding-left: px(40);
      }
      .flange {
        background-color: $ruddy;
        width: px(12);
        height: px(17);
      }
      .flange-set-left,
      .flange-set-right {
        position: absolute;
        top: 26%;
      }
      .flange-set-left {
        left: px(-7);
        &::after {
          content: ' ';
          background-color: $ruddy;
          position: absolute;
          left: px(10);
          top: 0;
          bottom: 0;
          width: px(5);
        }
        .flange {
          border-top-left-radius: px(2);
          border-bottom-left-radius: px(2);
          /* prettier-ignore */
          box-shadow:
            px(0) px(3) px(2) px(-2) rgba(#fff, 0) inset,
            px(3) px(-3) px(4) px(-1) darken($ruddy, 50%) inset;
          &:first-child {
            /* prettier-ignore */
            box-shadow:
              px(0) px(3) px(2) px(-2) rgba(#fff, 0.25) inset,
              px(3) px(-3) px(4) px(-1) darken($ruddy, 50%) inset;
          }
        }
        .flange:first-child {
          border-top-left-radius: px(4);
        }
        .flange:last-child {
          border-bottom-left-radius: px(4);
        }
      }
      .flange-set-right {
        right: px(-7);
        &::after {
          content: ' ';
          background-color: $ruddy;
          position: absolute;
          right: px(7);
          top: 0;
          bottom: 0;
          width: px(5);
        }
        .flange {
          border-top-right-radius: px(2);
          border-bottom-right-radius: px(2);
          /* prettier-ignore */
          box-shadow:
            px(-3) px(0) px(2) px(-2) rgba(#fff, 0.25) inset,
            px(0) px(-3) px(2) px(-1) darken($ruddy, 50%) inset;
          &:first-child {
            /* prettier-ignore */
            box-shadow:
              px(-3) px(2) px(2) px(-2) rgba(#fff, 0.25) inset,
              px(0) px(-3) px(3) px(-1) darken($ruddy, 50%) inset;
          }
        }
        .flange:first-child {
          border-top-right-radius: px(4);
        }
        .flange:last-child {
          border-bottom-right-radius: px(4);
        }
      }
    }
    .terminal {
      height: 100%;
      display: flex;
      flex-flow: row;
      padding-top: px(4);
      background: linear-gradient(
        0.25turn,
        darken($ruddy, 20%) 0%,
        $ruddy 1%,
        $ruddy 7.2%,
        lighten($ruddy, 20%) 8%,
        hsl(var(--terminal-bg)) 8%,
        hsl(var(--terminal-bg)) 91.5%,
        $ruddy 92.3%,
        $ruddy 99%,
        mix($ruddy, #fff, 80%) 99.9%
      );
    }
    border-radius: px(15);
    background-color: hsl(var(--bg));
    margin: px(10);
    margin-top: 0;
    padding: 0;
    padding-top: px(22) * 1.5;
    background-color: $ruddy;
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
        padding-left: px(38 + 2);
      }
      input {
        left: 0;
      }
      .trait {
        &::after {
          content: ' ';
          position: absolute;
          top: px(8);
          left: px(30);
          width: px(5);
          height: px(2);
          background-color: rgba(#000, 0.25);
        }
      }
    }
    .rightTraits {
      width: 40%;
      [data-trait] {
        padding-right: px(38 + 16);
      }
      input {
        right: 0;
      }
      .trait {
        &::after {
          content: ' ';
          position: absolute;
          top: px(8);
          right: px(30);
          width: px(5);
          height: px(2);
          background-color: rgba(#000, 0.25);
        }
      }
    }
    &::after,
    &::before {
      z-index: 1;
      position: absolute;
      left: px(-3);
      right: px(-3);
      background-color: hsl(var(--bg));
    }
    &::before {
      border-top-left-radius: px(13);
      border-top-right-radius: px(13);
      border-bottom-left-radius: px(5);
      border-bottom-right-radius: px(5);
      /* prettier-ignore */
      box-shadow: 
        var(--basic-box-shadow),
        px(0) px(6) px(3) px(0) rgba(#000, 0.4),
        var(--underbelly-shadow);
      height: px(33);
      content: ' ';
      top: 0;
      margin: 0;
    }
    &::after {
      content: ' ';
      height: px(20);
      bottom: 0;
      border-bottom-left-radius: px(15);
      border-bottom-right-radius: px(15);
      border-top-left-radius: px(2);
      border-top-right-radius: px(2);
      /* prettier-ignore */
      box-shadow:
        var(--basic-box-shadow),
        var(--underbelly-shadow);
    }
    input[type='checkbox'] {
      @include checkbox-button();
    }
  }
  .help {
    position: relative;
    padding: px(8) px(10);
    grid-area: help;
    /* prettier-ignore */
    box-shadow: 
      px(0) px(0) px(0) px(1) rgba(#000, 0.5),
      px(-1) px(1) px(2) px(-1) rgba(#fff, 0.5),
      px(-1) px(1) px(2) px(-1) rgba(#fff, 0.5) inset;
  }
  .buttons {
    grid-area: buttons;
    display: flex;
    justify-content: space-between;
    margin-bottom: px(10);
    :global(.perks) {
      width: px(140);
    }
    :global(.items) {
      width: px(120);
    }
    :global(.stats) {
      width: px(120);
    }
  }
</style>
