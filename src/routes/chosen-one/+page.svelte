<script lang="ts">
  import Help from './Help.svelte';
  import PlateButton from './Widgets/Buttons/PlateButton.svelte';
  import OptionalTraits from './OptionalTraits.svelte';
  import Health from './Health.svelte';
  import DerivedStats from './DerivedStats.svelte';
  import CharPoints from './CharPoints.svelte';
  import TaggedSkills from './TaggedSkills.svelte';
  import SpecialAttributes from './SpecialAttributes.svelte';
  import Toast, { toast } from './Toast.svelte';
  import { Menus, Modals } from './ModalManager.svelte';
  import ModalButton from './Widgets/Buttons/ModalButton.svelte';
  import { age, loadFromChar, name, sex } from './CharacterStore';
  import Anchor from './Widgets/Anchor.svelte';
  import { onMount } from 'svelte';
  import { CodecError, base64ToChar } from '$lib/codec';
  import { errorMessage } from './Modals/ErrorMessage.svelte';
  import debug from '$lib/debug';

  let charPoints: CharPoints;
  const charPointsRemainingBonk = () => {
    if (charPoints) {
      charPoints.bonkDown();
    }
  };

  onMount(() => {
    try {
      if (window.location.hash.length > 1) {
        loadFromChar(base64ToChar(window.location.hash.slice(1)));
      }
    } catch (err) {
      let em = 'Unknown error.';
      if (err instanceof CodecError) {
        em = err.message;
      }
      $errorMessage = em;
      debug.error(err);
    }
  });
</script>

<div class="parent">
  <div class="name-age-sex">
    <div class="name">
      <Anchor location="name" />
      <ModalButton
        type="slate"
        modal={Modals.NameChanger}
      >
        <div class="worn-text">
          {$name || 'none'}
        </div>
      </ModalButton>
    </div>
    <div class="age">
      <Anchor location="age" />
      <ModalButton
        type="slate"
        modal={Modals.AgeChanger}
      >
        <div class="worn-text">
          {$age}
        </div>
      </ModalButton>
    </div>
    <div class="sex">
      <Anchor location="sex" />
      <ModalButton
        type="slate"
        modal={Modals.SexChanger}
      >
        <div class="worn-text">
          {$sex}
        </div>
      </ModalButton>
    </div>
  </div>
  <div class="special-section slate brightness-variance b-offset-1">
    <SpecialAttributes on:charPointsRemainingBonk={charPointsRemainingBonk} />
  </div>
  <div
    class="health-section slate monitor terminal-font-defaults brightness-variance"
  >
    <Health />
  </div>
  <div
    class="derived-stats slate monitor terminal-font-defaults brightness-variance b-offset-1"
  >
    <DerivedStats />
  </div>
  <div class="char-points-section slate brightness-variance b-offset-2">
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
    <ModalButton
      type="plate"
      modal={Menus.Options}>Options</ModalButton
    >
    <PlateButton on:click={() => toast.show({ message: 'Not implemented yet' })}
      >Done</PlateButton
    >
    <ModalButton
      type="plate"
      modal={Modals.About}>About</ModalButton
    >
  </div>
  <Toast />
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
