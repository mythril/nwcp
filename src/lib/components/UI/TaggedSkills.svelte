<script lang="ts">
  import { bonkSound, clickSound } from '$lib/utils';
  import { objectKeys } from 'tsafe';
  import HelpSource from '$lib/components/HelpSource.svelte';
  import TwoDigitDisplay from '$lib/components/TwoDigitDisplay.svelte';
  import { character } from '../../../routes/CharacterStore';
  import { toast } from '$lib/components/Toast.svelte';

  const Skill = $character.skillInfo;

  let skills = objectKeys(Skill);

  $: {
    if (tdd) {
      if (!tdd.set(3 - $character.tagged.length)) {
        $character.tagged = $character.tagged;
      }
    }
  }

  const skillHandler = (ev: Event) => {
    const cb = ev.target as HTMLInputElement;
    if ($character.tagged.length >= 3 && cb.checked) {
      bonkSound();
      toast.error({ message: 'YOU MUST TAG 3 SKILLS' });
      tdd.set(-1);
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
    clickSound();
  };

  let tdd: TwoDigitDisplay;
</script>

<div class="skill-content">
  <HelpSource subject="Skills">
    <div class="title-bg brightness-variance b-offset-5">
      <div
        role="link"
        tabindex="0"
        class="title"
      >
        <div class="worn-text">Skills</div>
      </div>
    </div>
  </HelpSource>
  <div class="skills terminal-font-defaults">
    {#each skills as key}
      <HelpSource subject={Skill[key]}>
        <div
          class="skill {$character.tagged.includes(Skill[key])
            ? 'selected'
            : ''}"
        >
          <div class="button">
            <input
              type="checkbox"
              class="checkbox-button"
              on:click={skillHandler}
              bind:group={$character.tagged}
              value={Skill[key]}
              name=""
              id=""
            />
          </div>
          <div class="label">
            {Skill[key]}
          </div>
          <div class="value">
            {$character.baseSkills[Skill[key]]}%
          </div>
        </div>
      </HelpSource>
    {/each}
  </div>
  <div class="skills-remaining brightness-variance b-offset-6">
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
          bind:this={tdd}
          value={3}
          min={0}
          max={3}
        />
      </div>
    </HelpSource>
  </div>
</div>

<style lang="postcss">
  .skill-content {
    width: 292rem;
    margin: auto;
  }
  .title-bg {
    content: ' ';
    box-shadow: var(--sharp-light-source);
    height: 22rem;
    background-color: hsl(var(--title-bg));
    border-top-left-radius: 8rem 9rem;
    border-top-right-radius: 8rem 9rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
  .title {
    padding-left: 46rem;
    padding-top: 1rem;
    height: 22rem;
    width: 292rem;
    font-size: 16rem;
  }

  .skills {
    display: flex;
    flex-flow: column;
    width: 286rem;
    padding: 0;
    margin: 0 auto;
    line-height: 8rem;
    height: 200rem;
    background: linear-gradient(
      0.25turn,
      hsl(300deg, 11.1%, 14.1%) 0,
      hsl(314.5, 31.2%, 18.2%) 2rem,
      hsl(117.6, 23.8%, 20.6%) 3rem,
      hsl(300, 1.5%, 25.5%) 4rem,
      hsl(300, 1%, 59.6%) 9rem,
      hsl(300, 2.5%, 23.3%) 12rem,
      hsl(33, 13.5%, 29%) 13rem,
      hsl(33, 13.5%, 29%) 14rem,
      hsl(40, 18.8%, 31.4%) 15rem,
      hsl(40, 18.8%, 31.4%) 24rem,
      hsl(31, 11.9%, 52.4%) 25rem,
      hsl(var(--terminal-bg)) 26rem,
      hsl(var(--terminal-bg)) 273rem,
      hsl(300deg, 11.1%, 14.1%) 274rem,
      hsl(314.5, 31.2%, 18.2%) 276rem,
      hsl(117.6, 23.8%, 20.6%) 277rem,
      hsl(300, 1.5%, 25.5%) 278rem,
      hsl(300, 1%, 59.6%) 283rem,
      hsl(300, 2.5%, 23.3%) 286rem
    );
    .skill {
      display: flex;
      flex-flow: row;
    }
    .activeHelpSubject .skill {
      color: hsl(var(--terminal-color-active));
    }
    .selected {
      color: hsl(var(--terminal-selected));
    }
    .activeHelpSubject .selected {
      color: hsl(var(--terminal-selected-active));
    }
    .button {
      width: 39rem;
      max-height: 11rem;
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
    input {
      margin: 0rem 6rem;
    }
  }
  .skills-remaining {
    height: 34rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: hsl(var(--title-bg));
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    border-bottom-left-radius: 6rem 11rem;
    border-bottom-right-radius: 6rem 11rem;
    box-shadow: var(--sharp-light-source);
    .unused {
      border-radius: 2rem;
      overflow: hidden;
      box-shadow: var(--inset);
    }
    .label {
      width: 90rem;
      font-size: 16rem;
      padding-right: 10rem;
    }
  }
</style>
