<script>
  import { Skills } from '$lib/engines/ChosenOne';
  import { clickSound } from '$lib/utils';
  import HelpSource from './HelpSource.svelte';
  import TwoDigitDisplay from './TwoDigitDisplay.svelte';
</script>

<HelpSource subject="Skills">
  <div class="title-bg">
    <div
      role="link"
      tabindex="0"
      class="title worn-text"
    >
      Skills
    </div>
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

<style lang="postcss">
  .skills-remaining {
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
  .title-bg {
    content: ' ';
    box-shadow: var(--sharp-light-source);
    height: 28rem;
    background-color: hsl(var(--title-bg));
    border-top-left-radius: 15rem;
    border-top-right-radius: 15rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
  .title {
    padding-left: 58rem;
    height: 28rem;
    font-size: 22rem;
  }

  .skills {
    display: flex;
    flex-flow: column;
    width: 97%;
    padding: 0;
    margin: 0 auto;
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
</style>
