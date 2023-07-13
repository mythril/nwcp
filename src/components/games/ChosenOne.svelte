<script lang="ts">
  import {
    Skills,
    Special,
    SpecialAbbreviation,
    Traits,
    type TraitSet
  } from '../../engines/ChosenOne';
  import Attribute from './chosen-one/Attribute.svelte';
  import Bolthead from './chosen-one/Bolthead.svelte';
  import TwoDigitDisplay from './chosen-one/TwoDigitDisplay.svelte';

  let name = 'NONE';
  let age = 25;
  let sex = 'MALE';

  let chosenTraits: string[] = [];
  let traits = Object.keys(Traits) as (keyof typeof Traits)[];
  let leftTraits = traits.slice(0, 8);
  let rightTraits = traits.slice(8, 16);
</script>

<div class="parent">
  <div class="name-age-sex">
    <div class="name">
      {name}
    </div>
    <div class="age">
      AGE {age}
    </div>
    <div class="sex">
      {sex}
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
  <div class="help" />
  <div class="buttons" />
</div>

<style lang="scss">
  @mixin size-ref($w, $h, $disabled: false) {
    @if $disabled == false {
      position: relative;
      z-index: 1;
      &::after {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0%;
        width: $w;
        height: $h;
        outline: px(1) dashed pink;
      }
    }
  }

  .parent {
    @include size-ref(px(855), px(642), true);
    display: grid;
    grid-template-columns: repeat(2, 26.3125%) 46.375%;
    grid-template-rows: repeat(30, 1fr);
    grid-column-gap: 0.5%;
    grid-row-gap: px(5);
    grid-template-areas:
      'nas nas skills'
      'nas nas skills'
      'special health skills'
      'special health skills'
      'special health skills'
      'special health skills'
      'special health skills'
      'special health skills'
      'special health skills'
      'special health skills'
      'special derived skills'
      'special derived skills'
      'special derived skills'
      'special derived skills'
      'special derived skills'
      'special derived skills'
      'special derived help'
      'points derived help'
      'points derived help'
      'points derived help'
      'traits traits help'
      'traits traits help'
      'traits traits help'
      'traits traits help'
      'traits traits help'
      'traits traits help'
      'traits traits help'
      'traits traits help'
      'traits traits buttons'
      'traits traits buttons';
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
        font-weight: normal;
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
    @include size-ref(px(214), px(312), true);
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
      user-select: none; /* Standard syntax */
      font-family: title-font();
      color: $title-color;
      font-size: px(22);
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
      box-shadow:
        px(2) px(-2) px(2) px(-1) rgba(#000, 0.5) inset,
        px(-2) px(2) px(2) px(-1) rgba(#fff, 0.5) inset;
      .unused{
        border-radius:px(2);
        overflow:hidden;
        box-shadow:
          px(-2) px(2) px(2) px(-1) rgba(#fff, 0.5),
          px(2) px(-2) px(2) px(-1) rgba(#000, 0.5);
      }
      :global(.remaining) {
        border: 0;
      }
      .label {
        font-family: title-font();
        color: $title-color;
        font-weight: 400;
        text-transform: uppercase;
        font-size: px(22);
        padding-right: px(10);
      }
    }
    &::before {
      content: 'Skills';
      box-shadow:
        px(2) px(-2) px(2) px(0) rgba(#000, 0.9) inset,
        px(-2) px(2) px(2) px(-1) rgba(#fff, 0.5) inset;
      padding-left: px(58);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: px(28);
      background-color: $title-bg;
      font-family: title-font();
      font-weight: 400;
      text-transform: uppercase;
      font-size: px(22);
      color: $title-color;
      border-top-left-radius: px(15);
      border-top-right-radius: px(15);
      border-bottom-left-radius: px(2);
      border-bottom-right-radius: px(2);
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
      background: linear-gradient(0.25turn, #0c0c0c 0%, #3c3c3c 2.1%, #0e0d09 3.7%, #343220 7.4%, #343220 8.4%, #545454 8.7%, $terminal-bg 9%, $terminal-bg 95.8%, #6b6b6b 98.4%, #1c1c1c 100%);
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
      appearance: none;
      transition: box-shadow 0.1s linear;
      margin: px(1) px(9);
      padding: 0;
      box-sizing: border-box;
      background-color: #580000;
      box-shadow: px(-2) px(2) px(1) px(-1) rgba(#fff, 0.25) inset,
        px(1) px(-1) px(1) px(0) rgba(#000, 0.25) inset,
        px(-6) px(-3) px(0) px(0) #2d2b25 inset,
        px(6) px(3) px(0) px(0) #2d2b25 inset,
        px(6) px(-3) px(1) px(1) rgba(#fff, 0.25) inset,
        px(0) px(0) px(0) px(1) rgba(#000, 0.25);
      width: px(20);
      height: px(12);
      border-radius: px(3);
      border: px(1) solid #040c00;
      &:active {
        background-color: #fc3030;
        box-shadow: px(0) px(0) px(1) px(-1) rgba(#fff, 0.25) inset,
          px(1) px(-1) px(1) px(0) rgba(#000, 0.25) inset,
          px(-6) px(-3) px(0) px(0) #2d2b25 inset,
          px(6) px(3) px(0) px(0) #2d2b25 inset,
          px(6) px(-3) px(1) px(1) rgba(#fff, 0.25) inset,
          px(0) px(0) px(0) px(0) rgba(#000, 0.25);
      }
    }
  }
  .traits {
    grid-area: traits;
    .flanges {
      height: 92%;
      .flange {
        background-color: #43281d;
        width: px(12);
        height: px(15);
        margin-bottom: px(2);
      }
      .flangeset-left,
      .flangeset-right {
        position: absolute;
        top: 35%;
      }
      .flangeset-left {
        left: px(-7);
        .flange {
          border-top-left-radius: px(2);
          border-bottom-left-radius: px(2);
          box-shadow: px(0) px(3) px(2) px(-2) rgba(#fff, 0.25) inset,
            px(3) px(-3) px(2) px(-2) darken(#43281d, 5%) inset;
        }
        .flange:first-child {
          border-top-left-radius: px(4);
        }
        .flange:last-child {
          border-bottom-left-radius: px(4);
        }
      }
      .flangeset-right {
        right: px(-8);
        .flange {
          border-top-right-radius: px(2);
          border-bottom-right-radius: px(2);
          box-shadow: px(-3) px(3) px(2) px(-2) rgba(#fff, 0.25) inset,
            px(0) px(-3) px(2) px(-2) darken(#43281d, 5%) inset;
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
        darken(#43281d, 20%) 0%,
        #43281d 1%,
        #43281d 7.2%,
        lighten(#43281d, 20%) 8%,
        $terminal-bg 8%,
        $terminal-bg 91.5%,
        #43281d 92.3%,
        #43281d 99%,
        mix(#43281d, #fff, 80%) 99.9%
      );
      @include terminal-font();
    }
    border-radius: px(15);
    background-color: $root-bg;
    margin: px(10);
    margin-top: 0;
    padding: 0;
    padding-top: px(22) * 1.5;
    background-color: #43281d;
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
        &::after{
          content: ' ';
          position:absolute;
          top:px(8);
          left:px(30);
          width:px(5);
          height:px(2);
          background-color:rgba(#000, 0.25);
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
      .trait{
        &::after{
          content: ' ';
          position:absolute;
          top:px(8);
          right:px(30);
          width:px(5);
          height:px(2);
          background-color:rgba(#000, 0.25);
        }
      }
    }
    &::after,
    &::before {
      position: absolute;
      left: px(-3);
      right: px(-3);
      background-color: $root-bg;
      box-shadow: basic-box-shadow(),
        px(0) px(-6) px(3) px(-2) rgba(#000, 0.25) inset;
    }
    &::before {
      border-top-left-radius: px(15);
      border-top-right-radius: px(15);
      border-bottom-left-radius: px(5);
      border-bottom-right-radius: px(5);
      content: 'Optional Traits';
      filter: drop-shadow(px(-3) px(3) px(2) rgba(#000, 0.7));
      top: 0;
      padding: 0;
      padding-left: px(40);
      margin: 0;
      font-family: title-font();
      color: $title-color;
      text-transform: uppercase;
      font-size: px(22);
      line-height: 1.5;
      font-weight: 400;
    }
    &::after {
      content: ' ';
      height: px(20);
      bottom: 0;
      border-bottom-left-radius: px(15);
      border-bottom-right-radius: px(15);
      border-top-left-radius: px(2);
      border-top-right-radius: px(2);
    }
    input[type='checkbox'] {
      appearance: none;
      transition: box-shadow 0.1s linear;
      margin: px(3) px(9);
      padding: 0;
      box-sizing: border-box;
      background-color: #580000;
      box-shadow: px(-2) px(2) px(1) px(-1) rgba(#fff, 0.25) inset,
        px(1) px(-1) px(1) px(0) rgba(#000, 0.25) inset,
        px(-6) px(-3) px(0) px(0) #2d2b25 inset,
        px(6) px(3) px(0) px(0) #2d2b25 inset,
        px(6) px(-3) px(1) px(1) rgba(#fff, 0.25) inset,
        px(0) px(0) px(0) px(1) rgba(#000, 0.25);
      width: px(20);
      height: px(12);
      border-radius: px(3);
      border: px(1) solid #040c00;
      &:active {
        background-color: #fc3030;
        box-shadow: px(0) px(0) px(1) px(-1) rgba(#fff, 0.25) inset,
          px(1) px(-1) px(1) px(0) rgba(#000, 0.25) inset,
          px(-6) px(-3) px(0) px(0) #2d2b25 inset,
          px(6) px(3) px(0) px(0) #2d2b25 inset,
          px(6) px(-3) px(1) px(1) rgba(#fff, 0.25) inset,
          px(0) px(0) px(0) px(0) rgba(#000, 0.25);
      }
    }
  }
  .help {
    grid-area: help;
    border: px(1) solid rgba(#000, 0.5);
    box-shadow:
      px(-1) px(1) px(2) px(-1) rgba(#fff, 0.5),
      px(-1) px(1) px(2) px(-1) rgba(#fff, 0.5) inset;
  }
  .buttons {
    grid-area: buttons;
    background-color: red;
  }
</style>
