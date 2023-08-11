<script lang="ts">
  import Help from './Help.svelte';
  import PlateButton from './PlateButton.svelte';
  import NameChanger from './NameChanger.svelte';
  import AgeChanger from './AgeChanger.svelte';
  import SexChanger from './SexChanger.svelte';
  import OptionalTraits from './OptionalTraits.svelte';
  import Health from './Health.svelte';
  import DerivedStats from './DerivedStats.svelte';
  import CharPoints from './CharPoints.svelte';
  import TaggedSkills from './TaggedSkills.svelte';
  import SpecialAttributes from './SpecialAttributes.svelte';
  import {
    age,
    attributes,
    chosenTraits,
    name,
    sex,
    taggedSkills
  } from './stores';
  import Save from './Save.svelte';
  import { onMount } from 'svelte';
  import { base64ToChar, unpacker } from '$lib/codec';
  import type { Skill, Trait, UnfinishedChar } from '$lib/engines/ChosenOne/main';
  import type { ObjectValues } from '$lib/utils';

  let fileInput: HTMLInputElement;

  let charPoints: CharPoints;
  const charPointsRemainingBonk = () => {
    if (charPoints) {
      charPoints.bonkDown();
    }
  };

  const loadFromChar = (char: UnfinishedChar) => {
    $name = char.name;
    $age = char.age;
    $sex = char.sex;
    $attributes = char.attributes;
    const isTrait = (
      item: ObjectValues<typeof Trait> | undefined
    ): item is ObjectValues<typeof Trait> => {
      return !!item;
    };
    $chosenTraits = char.traits.filter(isTrait);
    const isTaggedSkill = (
      item: ObjectValues<typeof Skill> | undefined
    ): item is ObjectValues<typeof Skill> => {
      return !!item;
    };
    $taggedSkills = char.tagged.filter(isTaggedSkill);
  };

  onMount(() => {
    if (window.location.hash) {
      loadFromChar(base64ToChar(window.location.hash.slice(1)));
    }
  });

  let files: FileList;

  $: if (files != null && files.length > 0) {
    files
      ?.item(0)
      ?.arrayBuffer()
      .then((data: ArrayBuffer) => {
        loadFromChar(unpacker(new Uint8Array(data)));
      });
  }
</script>

<!--
<div class="store-debug">
  Name: {$name}
  Age: {$age}
  Sex: {$sex}
  {#each Object.values(Special) as attr}
  {"\n  " + attr}: {$attributes[attr]}
  {/each}
  Traits: {$chosenTraits}
  Tagged Skills: {$taggedSkills}
</div>
-->

<div class="parent">
  <div class="name-age-sex">
    <div class="name">
      <NameChanger bind:value={$name} />
    </div>
    <div class="age">
      <AgeChanger bind:value={$age} />
    </div>
    <div class="sex">
      <SexChanger bind:value={$sex} />
    </div>
  </div>
  <div class="special-section slate">
    <SpecialAttributes on:charPointsRemainingBonk={charPointsRemainingBonk} />
  </div>
  <div class="health-section slate monitor terminal-font-defaults">
    <Health />
  </div>
  <div class="derived-stats slate monitor terminal-font-defaults">
    <DerivedStats />
  </div>
  <div class="char-points-section slate">
    <CharPoints bind:this={charPoints} />
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
    <PlateButton class="about">About</PlateButton>
    <Save />
    <PlateButton
      class="load"
      on:click={() => {
        if (fileInput) {
          fileInput.click();
        }
      }}
    >
      <div class="offscreen">
        <input
          bind:this={fileInput}
          bind:files
          accept=".nwcp"
          type="file"
        />
      </div>
      Load</PlateButton
    >
  </div>
</div>

<style lang="postcss">
  .parent {
    padding-left: 10rem;
    padding-bottom: 8rem;
    display: grid;
    grid-template-columns: 160rem 157rem 3rem 305rem;
    grid-template-rows: 32rem 129rem 90rem 12rem 50rem 128rem 32rem;
    row-gap: 2rem;
    column-gap: 2rem;
    grid-template-areas:
      'nas nas . skills'
      'special health . skills'
      'special derived . skills'
      'special derived . help'
      'points derived . help'
      'traits traits . help'
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

  .special-section {
    grid-area: special;
    border-radius: 2rem;
  }
  .char-points-section {
    grid-area: points;
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
  }
  .help-section {
    grid-area: help;
    z-index: -1;
    display: flex;
  }
  .buttons {
    width: 303rem;
    grid-area: buttons;
    display: flex;
    justify-content: space-between;
    :global(.about) {
      width: 108rem;
    }
    :global(.save) {
      width: 92rem;
    }
    :global(.load) {
      width: 92rem;
    }
  }
  /* .store-debug{
    white-space: pre;
    position: absolute;
    z-index:10;
    left:340rem;
    top:260rem;
    background-color:#fff;
    width: 300rem;
  } */
</style>
