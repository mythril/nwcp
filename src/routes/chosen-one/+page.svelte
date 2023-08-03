<script lang="ts">
  import { Sex, Special, SpecialAbbreviation } from '$lib/engines/ChosenOne';
  import Attribute from './Attribute.svelte';
  import Help from './Help.svelte';
  import HelpSource from './HelpSource.svelte';
  import PlateButton from './PlateButton.svelte';
  import NameChanger from './NameChanger.svelte';
  import AgeChanger from './AgeChanger.svelte';
  import SexChanger from './SexChanger.svelte';
  import OptionalTraits from './OptionalTraits.svelte';
  import Health from './Health.svelte';
  import DerivedStats from './DerivedStats.svelte';
  import CharPoints from './CharPoints.svelte';
  import TaggedSkills from './TaggedSkills.svelte';

  let name = '';
  let age = 25;
  let sex = Sex.Male;
</script>

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
  <div class="health-section slate monitor terminal-font-defaults">
    <Health />
  </div>
  <div class="derived-stats slate monitor terminal-font-defaults">
    <DerivedStats />
  </div>
  <div class="char-points-section slate">
    <CharPoints />
  </div>
  <div class="traits-section">
    <OptionalTraits />
  </div>
  <div class="tagged-skills-section">
    <TaggedSkills />
  </div>
  <div class="help-section">
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
    grid-template-columns: 25% 26.125% 2rem 46.375%;
    grid-template-rows: repeat(30, 1fr);
    grid-column-gap: 3rem;
    grid-row-gap: 2rem;
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
    filter: drop-shadow(-4rem 4rem 3rem #000) drop-shadow(-4rem 4rem 3rem #000);
  }

  .name-age-sex {
    grid-area: nas;
    display: flex;
    justify-content: center;
    /* width: 93.75%; */
    .name {
      position: relative;
      width: 136rem;
    }
    .age {
      position: relative;
      width: 80rem;
    }
    .sex {
      position: relative;
      width: 81rem;
    }
  }

  .health-section {
    grid-area: health;
    z-index: -1;
  }

  .special {
    grid-area: special;
    border-radius: 2rem;
    border-bottom-left-radius: 9rem 5rem;
    padding: 4rem 7rem;
    position: relative;
  }
  .char-points-section {
    grid-area: points;
    position: relative;
    /*
     @TODO this area is not the right size, should 
     be 50rem tall
    */
  }
  .derived-stats {
    grid-area: derived;
  }
  .tagged-skills-section {
    grid-area: skills;
  }
  .traits-section {
    grid-area: traits;
    position: relative;
    /* &::after {
      pointer-events: none;
      position: absolute;
      content: ' ';
      outline: 1px solid red;
      top: 0;
      left: 15rem;
      height: 149rem;
      width: 303rem;
    } */
  }
  .help-section {
    grid-area: help;
    z-index: -1;
    display: flex;
  }
  .buttons {
    grid-area: buttons;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10rem;
    :global(.perks) {
      width: 108rem;
    }
    :global(.items) {
      width: 92rem;
    }
    :global(.stats) {
      width: 92rem;
    }
  }
</style>
