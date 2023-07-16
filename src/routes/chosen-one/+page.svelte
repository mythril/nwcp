<script lang="ts">
  import {
    Skills,
    Special,
    SpecialAbbreviation,
    Traits
  } from '$lib/engines/ChosenOne';
  import Attribute from './Attribute.svelte';
  import Bolthead from './Bolthead.svelte';
  import TwoDigitDisplay from './TwoDigitDisplay.svelte';

  let name = 'NONE';
  let age = 25;
  let sex = 'MALE';

  let chosenTraits: string[] = [];
  let traits = Object.keys(Traits) as (keyof typeof Traits)[];
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
      <div class="label">
        {name}
      </div>
    </div>
    <div class="age">
      <div class="label">
        AGE {age}
      </div>
    </div>
    <div class="sex">
      <div class="label">
        {sex}
      </div>
    </div>
  </div>
  <div class="special">
    {#each Object.values(Special) as attr}
      <Attribute
        label={SpecialAbbreviation(attr)}
        value={Math.round(Math.random() * 9 + 1)}
      />
    {/each}
  </div>
  <div class="health">
    <div class="display">
      <div class="highlighted">Hit Points 30/30</div>
      <div>Poisoned</div>
      <div>Radiated</div>
      <div>Eye Damage</div>
      <div>Crippled Right Arm</div>
      <div>Crippled Left Arm</div>
      <div>Crippled Right Leg</div>
      <div>Crippled Left Leg</div>
    </div>
    <Bolthead dir="tl" />
    <Bolthead dir="tr" />
    <Bolthead dir="br" />
    <Bolthead dir="ml" />
    <Bolthead dir="bl" />
    <Bolthead dir="mr" />
  </div>
  <div class="derived-stats">
    <div class="display">
      <table class="highlighted">
        <tbody>
          <tr>
            <th> Armor class </th>
            <td> 5 </td>
          </tr>
          <tr>
            <th> Action Points </th>
            <td> 7 </td>
          </tr>
          <tr>
            <th> Carry Weight </th>
            <td> 150 </td>
          </tr>
          <tr>
            <th> Melee Damage </th>
            <td> 1 </td>
          </tr>
          <tr>
            <th> Damage Res. </th>
            <td> 0% </td>
          </tr>
          <tr>
            <th> Poison Res. </th>
            <td> 25% </td>
          </tr>
          <tr>
            <th> Radiation Res. </th>
            <td> 10% </td>
          </tr>
          <tr>
            <th> Sequence </th>
            <td> 10 </td>
          </tr>
          <tr>
            <th> Healing Rate </th>
            <td> 1 </td>
          </tr>
          <tr>
            <th> Critical Chance </th>
            <td> 5% </td>
          </tr>
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
    <div class="label">CHAR POINTS</div>
    <div class="dorkyborder">
      <TwoDigitDisplay value={Math.round(Math.random() * 9 + 1)} />
    </div>
    <Bolthead dir="tl" />
    <Bolthead dir="tr" />
    <Bolthead dir="bl" />
    <Bolthead dir="br" />
  </div>
  <div class="traits">
    <div class="flanges">
      <div class="flangeset-left">
        <div class="flange" />
        <div class="flange" />
        <div class="flange" />
        <div class="flange" />
      </div>
      <div class="flangeset-right">
        <div class="flange" />
        <div class="flange" />
        <div class="flange" />
        <div class="flange" />
      </div>
      <div class="terminal">
        <div class="leftTraits">
          {#each leftTraits as trait}
            <div class="trait">
              <input
                type="checkbox"
                bind:group={chosenTraits}
                value={trait}
              />
              <div
                data-trait={trait}
                role="link"
                tabindex="0"
                class={chosenTraits.includes(trait) ? 'selected' : ''}
              >
                {Traits[trait]}
              </div>
            </div>
          {/each}
        </div>
        <div class="rightTraits">
          {#each rightTraits as trait}
            <div class="trait">
              <input
                type="checkbox"
                bind:group={chosenTraits}
                value={trait}
              />
              <div
                data-trait={trait}
                role="link"
                tabindex="0"
                class={chosenTraits.includes(trait) ? 'selected' : ''}
              >
                {Traits[trait]}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  <div class="tagged-skills">
    <div class="title">Skills</div>
    <div class="skills">
      {#each Object.values(Skills) as skill}
        <div class="skill">
          <div class="button">
            <input
              type="checkbox"
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
      {/each}
    </div>
    <div class="skills-remaining">
      <div class="label">Tag Skills</div>
      <div class="unused">
        <TwoDigitDisplay value={3} />
      </div>
    </div>
  </div>
  <div class="help">
    <div class="paper-bg" />
    <div class="content">
      noise here noise herenoise here noise herenoise here noise herenoise here
      noise herenoise here noise herenoise here noise herenoise here noise
      herenoise here noise herenoise here noise herenoise here noise herenoise
      here noise herenoise here noise herenoise here noise herenoise here noise
      herenoise here noise herenoise here noise herenoise here noise herenoise
      here noise herenoise here noise herenoise here noise herenoise here noise
      herenoise here noise here
    </div>
  </div>
  <div class="buttons">
    <button class="perks">
      <Bolthead
        dir="tl"
        size={4}
      />
      <Bolthead
        dir="tr"
        size={4}
      />
      <Bolthead
        dir="br"
        size={4}
      />
      <Bolthead
        dir="bl"
        size={4}
      />
      <div class="label">Perks</div>
    </button>
    <button class="items">
      <Bolthead
        dir="tr"
        size={4}
      />
      <Bolthead
        dir="bl"
        size={4}
      />
      <Bolthead
        dir="br"
        size={4}
      />
      <Bolthead
        dir="tl"
        size={4}
      />
      <div class="label">Items</div></button
    >
    <button class="stats">
      <Bolthead
        dir="tl"
        size={4}
      />
      <Bolthead
        dir="br"
        size={4}
      />
      <Bolthead
        dir="bl"
        size={4}
      />
      <Bolthead
        dir="tr"
        size={4}
      />
      <div class="label">Stats</div></button
    >
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
    text-align: center;
    font-size: px(22);
    line-height: 1.5;
    .name,
    .age,
    .sex {
      @include big-button-style();
      @include big-button-style-hover();
    }
    .label {
      @include worn-text();
    }
    .name {
      width: 36%;
    }
    .age {
      width: 24%;
    }
    .sex {
      width: 24%;
    }
  }

  @function basic-box-shadow() {
    @return px(-4) px(4) px(2) px(-3) rgba(255, 255, 255, 0.25) inset,
      px(4) px(-4) px(5) px(-5) rgba(darken($root-bg, 30%), 0.3) inset;
  }

  @mixin slate() {
    background-color: $root-bg;
    box-shadow: basic-box-shadow();
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
      background-color: $terminal-bg;
      border-radius: px(8) px(7);
      box-shadow: px(-4) px(4) px(4) px(-2) rgba(255, 255, 255, 0.2),
        px(4) px(-4) px(4) px(-2) rgba(0, 0, 0, 0.5);
      @include terminal-font();
      color: $terminal-text-unmarked;
      .highlighted {
        color: $terminal-text;
      }
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
    .dorkyborder {
      border-top: px(3) solid darken($root-bg, 10%);
      border-right: px(3) solid darken($root-bg, 10%);
      border-left: px(3) solid lighten($root-bg, 10%);
      border-bottom: px(3) solid lighten($root-bg, 10%);
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
      @include worn-text();
      font-size: px(23);
    }
  }
  .health {
    grid-area: health;
    @include slate();
    @include monitor();
    border-radius: px(7);
  }
  .derived-stats {
    grid-area: derived;
    @include slate();
    @include monitor();
    border-radius: px(7);
  }
  .tagged-skills {
    position: relative;
    padding-top: px(16);
    .skills-remaining {
      position: absolute;
      bottom: 0;
      height: px(44);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $title-bg;
      border-top-left-radius: px(2);
      border-top-right-radius: px(2);
      border-bottom-left-radius: px(15);
      border-bottom-right-radius: px(15);
      box-shadow: px(2) px(-2) px(2) px(-1) rgba(#000, 0.5) inset,
        px(-2) px(2) px(2) px(-1) rgba(#fff, 0.5) inset;
      .unused {
        border-radius: px(2);
        overflow: hidden;
        box-shadow: px(-2) px(2) px(2) px(-1) rgba(#fff, 0.5),
          px(2) px(-2) px(2) px(-1) rgba(#000, 0.5);
      }
      :global(.remaining) {
        border: 0;
      }
      .label {
        @include worn-text();
        font-size: px(22);
        padding-right: px(10);
      }
    }
    &::before {
      content: ' ';
      box-shadow: px(2) px(-2) px(2) px(0) rgba(#000, 0.9) inset,
        px(-2) px(2) px(2) px(-1) rgba(#fff, 0.5) inset;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: px(28);
      background-color: $title-bg;
      border-top-left-radius: px(15);
      border-top-right-radius: px(15);
      border-bottom-left-radius: px(2);
      border-bottom-right-radius: px(2);
    }
    &::after {
      content: 'Skills';
      padding-left: px(58);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: px(28);
      @include worn-text();
      font-size: px(22);
    }

    grid-area: skills;
    .skills {
      display: flex;
      flex-flow: column;
      margin: 0 auto;
      width: 97%;
      height: 87%;
      padding: 0;
      @include terminal-font();
      line-height: 1.48;
      background: linear-gradient(
        0.25turn,
        #0c0c0c 0%,
        #3c3c3c 2.1%,
        #0e0d09 3.7%,
        #343220 7.4%,
        #343220 8.4%,
        #545454 8.7%,
        $terminal-bg 9%,
        $terminal-bg 95.8%,
        #6b6b6b 98.4%,
        #1c1c1c 100%
      );
      .skill {
        display: flex;
        flex-flow: row;
      }
      .button {
        width: px(39);
        max-height: px(14);
        // background-color: red;
      }
      // .label,
      // .value {
      //   background-color: $terminal-bg;
      // }
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
      &::before {
        position: absolute;
        bottom: 100%;
        content: 'Optional Traits';
        z-index: 1;
        @include worn-text();
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
      .flangeset-left,
      .flangeset-right {
        filter: blur(1px);
        position: absolute;
        top: 26%;
      }
      .flangeset-left {
        left: px(-7);
        .flange {
          border-top-left-radius: px(2);
          border-bottom-left-radius: px(2);
          box-shadow: px(0) px(3) px(2) px(-2) rgba(#fff, 0) inset,
            px(3) px(-3) px(4) px(-1) darken($ruddy, 50%) inset;
          &:first-child {
            box-shadow: px(0) px(3) px(2) px(-2) rgba(#fff, 0.25) inset,
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
      .flangeset-right {
        right: px(-7);
        .flange {
          border-top-right-radius: px(2);
          border-bottom-right-radius: px(2);
          box-shadow: px(-3) px(0) px(2) px(-2) rgba(#fff, 0.25) inset,
            px(0) px(-3) px(2) px(-1) darken($ruddy, 50%) inset;
          &:first-child {
            box-shadow: px(-3) px(2) px(2) px(-2) rgba(#fff, 0.25) inset,
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
        $terminal-bg 8%,
        $terminal-bg 91.5%,
        $ruddy 92.3%,
        $ruddy 99%,
        mix($ruddy, #fff, 80%) 99.9%
      );
      @include terminal-font();
    }
    border-radius: px(15);
    background-color: $root-bg;
    margin: px(10);
    margin-top: 0;
    padding: 0;
    padding-top: px(22) * 1.5;
    background-color: $ruddy;
    // background-image: url('traits.png');
    // background-position:50%;
    // background-size: cover;
    position: relative;
    color: $terminal-text;
    [data-trait] {
      &:focus {
        color: $terminal-text-active;
      }
      &.selected {
        color: $terminal-text-selected;
        &:focus {
          color: $terminal-text-selected-active;
        }
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
      background-color: $root-bg;
    }
    &::before {
      border-top-left-radius: px(13);
      border-top-right-radius: px(13);
      border-bottom-left-radius: px(5);
      border-bottom-right-radius: px(5);
      box-shadow: basic-box-shadow(), px(0) px(6) px(3) px(0) rgba(#000, 0.4),
        px(0) px(-4) px(2) px(0) rgba(#000, 0.4) inset;
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
      box-shadow: basic-box-shadow(),
        px(0) px(-4) px(2) px(0) rgba(#000, 0.4) inset;
    }
    input[type='checkbox'] {
      @include checkbox-button();
    }
  }
  .help {
    position: relative;
    padding: px(8) px(10);
    grid-area: help;
    border: px(1) solid rgba(#000, 0.5);
    box-shadow: px(-1) px(1) px(2) px(-1) rgba(#fff, 0.5),
      px(-1) px(1) px(2) px(-1) rgba(#fff, 0.5) inset;
    .content {
      z-index: 1;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      padding: px(17) px(20);
    }
    .paper-bg {
      position: relative;
      z-index: 0;
      width: 100%;
      height: 100%;
      box-shadow: px(0) px(0) px(1) px(1) rgba(#000, 1) inset;
      background: linear-gradient(
          0.3turn,
          rgba(#947c60, 0),
          rgba(#997530, 0) px(300),
          rgba(#ac8044, 0.35) px(310),
          rgba(#7c6818, 0.35) px(312),
          rgba(#947c60, 0.35) px(322)
        ),
        linear-gradient(
          0.32turn,
          rgba(#947c60, 0),
          rgba(#997530, 0) px(400),
          rgba(#ac8044, 0.75) px(410),
          rgba(#7c6818, 0.75) px(412),
          rgba(#947c60, 0.75) px(422),
          rgba(#ac8044, 0.75) px(425),
          rgba(#7c6818, 0.75) px(432),
          rgba(#947c60, 0.75) px(440)
        ),
        linear-gradient(
          0.25turn,
          #947c60,
          #997530 px(212),
          #ac8044 px(223),
          #7c6818 px(225),
          #947c60 px(240)
        );
      filter: url(#paper);
    }
  }
  .buttons {
    grid-area: buttons;
    display: flex;
    justify-content: space-between;
    margin-bottom: px(10);
    button {
      position: relative;
      padding: px(0) px(10);
      display: block;
      appearance: none;
      background-color: $root-bg;
      border: 0;
      &::after {
        content: ' ';
        position: absolute;
        left: px(12);
        top: px(5);
        @include push-button(18);
      }
      &:active::after {
        @include push-button-active(18);
      }
      .label {
        @include worn-text();
        font-size: px(22);
        text-align: left;
        padding-left: px(25);
      }
      border-top-right-radius: px(2);
      border-bottom-right-radius: px(10) px(4);
      border-top-left-radius: px(2);
      border-bottom-left-radius: px(10) px(4);
      box-shadow: px(-1) px(1) px(2) px(-1) rgba(#fff, 0.5) inset,
        px(-1) px(-1) px(0) px(-3) rgba(#000, 0.5) inset;
      &.perks {
        width: px(140);
      }
      &.items {
        width: px(120);
      }
      &.stats {
        width: px(120);
      }
    }
  }
</style>
