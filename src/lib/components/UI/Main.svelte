<script
  lang="ts"
  context="module"
>
  export const hideMain = writable<boolean>(false);
</script>

<script lang="ts">
  import PlateButton from '$lib/components/Buttons/PlateButton.svelte';
  import OptionalTraits, { chosenTraits } from './OptionalTraits.svelte';
  import Health from './Health.svelte';
  import DerivedStats from './DerivedStats.svelte';
  import CharPoints from './CharPoints.svelte';
  import TaggedSkills, { chosenSkills } from './TaggedSkills.svelte';
  import SpecialAttributes from './SpecialAttributes.svelte';
  import { Menus, Modals } from '$lib/components/ModalManager.svelte';
  import ModalButton from '$lib/components/Buttons/ModalButton.svelte';
  import { character, loadFromChar } from '../../../routes/CharacterStore';
  import Anchor from '$lib/components/Anchor.svelte';
  import { errorMessage } from '$lib/components/ErrorMessageStore';
  import debug from '$lib/debug';
  import { toast } from '$lib/components/Toast.svelte';
  import {
    CodecError,
    base64ToChar,
    charToBase64
  } from '$lib/engines/BitPacking';
  import Help from '$lib/components/Help.svelte';
  import { fly } from 'svelte/transition';
  import { writable } from 'svelte/store';
  import { quintIn, quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import type { ObjectValues } from '$lib/typeUtils';
  import type { Role } from '$lib/engines/all';

  let charPoints: CharPoints;
  const charPointsRemainingBonk = () => {
    if (charPoints) {
      charPoints.bonkDown();
    }
  };

  function loadFromHash() {
    try {
      if (window.location.hash.length > 1) {
        const cTor = Object.getPrototypeOf($character).constructor;
        const fromHash = base64ToChar(
          window.location.hash.slice(1),
          new cTor()
        );
        loadFromChar(fromHash);
      }
    } catch (err) {
      let em = 'Unknown error.';
      if (err instanceof CodecError) {
        em = err.message;
      }
      $errorMessage = em;
      debug.error(err);
    }
  }
  loadFromHash();

  $: {
    const Skill = $character.skillInfo;
    const Trait = $character.traitInfo;

    let ctSet = new Set($chosenTraits);

    for (let trait of Object.values(Trait)) {
      if (ctSet.has(trait) && $character.hasTrait(trait) === false) {
        $character.addTrait(trait);
      }
      if (ctSet.has(trait) === false && $character.hasTrait(trait)) {
        $character.deleteTrait(trait);
      }
    }

    let csSet = new Set($chosenSkills);

    for (let skill of Object.values(Skill)) {
      if (csSet.has(skill) && $character.hasTagged(skill) === false) {
        $character.addTagged(skill);
      }
      if (csSet.has(skill) === false && $character.hasTagged(skill)) {
        $character.deleteTagged(skill);
      }
      $character = $character;
    }
  }

  let blanks: Partial<Record<ObjectValues<typeof Role>, string>> = {};

  $: {
    if (!($character.role in blanks)) {
      let cTor = Object.getPrototypeOf($character).constructor;
      let blankChar = new cTor();
      blankChar._reset();
      blanks[$character.role] = charToBase64(blankChar);
    }
    let hash = charToBase64($character);
    if (blanks[$character.role] === hash) {
      history.replaceState(undefined, '', ' ');
    } else {
      history.replaceState(undefined, '', '#' + hash);
    }
  }

  onMount(() => ($hideMain = false));
</script>

{#if $hideMain === false}
  <div
    class="parent interface-structure"
    in:fly={{ y: '-150%', duration: 300, opacity: 1, easing: quintOut }}
    out:fly={{ y: '-150%', duration: 300, opacity: 1, easing: quintIn }}
  >
    <div class="name-age-sex">
      <div class="name">
        <slot name="name">
          <Anchor location="name" />
          <ModalButton
            type="slate"
            modal={Modals.NameChanger}
          >
            <div class="worn-text">
              {$character.name || 'none'}
            </div>
          </ModalButton>
        </slot>
      </div>
      <div class="age">
        <slot name="age">
          <Anchor location="age" />
          <ModalButton
            type="slate"
            modal={Modals.AgeChanger}
          >
            <div class="worn-text">
              {$character.age}
            </div>
          </ModalButton>
        </slot>
      </div>
      <div class="sex">
        <slot name="sex">
          <Anchor location="sex" />
          <ModalButton
            type="slate"
            modal={Modals.SexChanger}
          >
            <div class="worn-text">
              {$character.sex}
            </div>
          </ModalButton>
        </slot>
      </div>
    </div>
    <div class="special-section slate brightness-variance b-offset-1">
      <slot name="special">
        <SpecialAttributes
          on:charPointsRemainingBonk={charPointsRemainingBonk}
        />
      </slot>
    </div>
    <div class="derived-section">
      <div
        class="health slate monitor terminal-font-defaults brightness-variance"
      >
        <slot name="health">
          <Health />
        </slot>
      </div>
      <div
        class="derived-stats slate monitor terminal-font-defaults brightness-variance b-offset-1"
      >
        <slot name="derived-stats">
          <DerivedStats />
        </slot>
      </div>
    </div>
    <div class="char-points-section slate brightness-variance b-offset-2">
      <slot name="char-points">
        <CharPoints bind:this={charPoints} />
      </slot>
    </div>
    <div class="traits-section">
      <slot name="traits">
        <OptionalTraits />
      </slot>
    </div>
    <div class="tagged-skills-section">
      <slot name="tagged-skills">
        <TaggedSkills />
      </slot>
    </div>
    <div class="help-section">
      <slot name="help">
        <Help />
      </slot>
    </div>
    <div class="buttons">
      <slot name="buttons">
        <ModalButton
          type="plate"
          modal={Menus.Options}>Options</ModalButton
        >
        <PlateButton
          on:click={() => toast.show({ message: 'Not implemented yet' })}
          >Done</PlateButton
        >
        <ModalButton
          type="plate"
          modal={Modals.About}>About</ModalButton
        >
      </slot>
    </div>
  </div>
{/if}

<style lang="postcss">
  .parent {
    grid-template-areas:
      'nas nas . skills'
      'special derived . skills'
      'special derived . skills'
      'special derived . help'
      'points derived . help'
      'traits traits . help'
      'traits traits . buttons';
    filter: drop-shadow(-4rem 4rem 3rem #000) drop-shadow(-4rem 4rem 3rem #000);
  }

  .name-age-sex {
    grid-area: nas;
    display: flex;
    justify-content: center;
    font-size: 16rem;
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

  .special-section {
    grid-area: special;
    border-radius: 2rem;
  }
  .char-points-section {
    grid-area: points;
  }
  .derived-section {
    grid-area: derived;
    display: flex;
    flex-flow: column;
    justify-content: stretch;
    gap: 2rem;
    .health,
    .derived-stats {
      height: fit-content;
    }
    .health {
      flex-grow: 1;
    }
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
    justify-content: stretch;
    gap: 2rem;
  }
</style>
