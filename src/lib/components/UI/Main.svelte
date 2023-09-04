<script lang="ts">
  import PlateButton from '$lib/components/Buttons/PlateButton.svelte';
  import OptionalTraits from './OptionalTraits.svelte';
  import Health from './Health.svelte';
  import DerivedStats from './DerivedStats.svelte';
  import CharPoints from './CharPoints.svelte';
  import TaggedSkills from './TaggedSkills.svelte';
  import SpecialAttributes from './SpecialAttributes.svelte';
  import { Menus, Modals } from '$lib/components/ModalManager.svelte';
  import ModalButton from '$lib/components/Buttons/ModalButton.svelte';
  import { character, loadFromChar } from '../../../routes/CharacterStore';
  import Anchor from '$lib/components/Anchor.svelte';
  import { errorMessage } from '$lib/components/Modals/ErrorMessage.svelte';
  import debug from '$lib/debug';
  import { toast } from '$lib/components/Toast.svelte';
  import { base64ToChar } from '$lib/engines/ChosenOne/codec';
  import { CodecError } from '$lib/BitPacking';
  import Help from '$lib/components/Help.svelte';

  let charPoints: CharPoints;
  const charPointsRemainingBonk = () => {
    if (charPoints) {
      charPoints.bonkDown();
    }
  };

  try {
    if (window.location.hash.length > 1) {
      const fromHash = base64ToChar(window.location.hash.slice(1));
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
</script>

<svelte:head>
  {#if $character.name !== ''}
    <title>{$character.name} - NWCP</title>
  {:else}
    <title>The {$character.role} - NWCP</title>
  {/if}
</svelte:head>

<div class="parent">
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
      <SpecialAttributes on:charPointsRemainingBonk={charPointsRemainingBonk} />
    </slot>
  </div>
  <div
    class="health-section slate monitor terminal-font-defaults brightness-variance"
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
    justify-content: stretch;
    gap: 2rem;
  }
</style>
