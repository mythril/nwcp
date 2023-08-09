<script lang="ts">
  import { Trait } from '$lib/engines/ChosenOne/main';
  import { bonkSound, clickSound } from '$lib/utils';
  import { objectKeys } from 'tsafe';
  import HelpSource from './HelpSource.svelte';
  import { chosenTraits } from './stores';

  let traits = objectKeys(Trait);
  let leftTraits = traits.slice(0, 8);
  let rightTraits = traits.slice(8, 16);

  const traitHandler = (e: Event) => {
    const cb = e.target as HTMLInputElement;
    if ($chosenTraits.length >= 2 && cb.checked) {
      bonkSound();
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    clickSound();
  };
</script>

<div class="traits">
  <HelpSource subject="Optional Traits">
    <div
      role="link"
      tabindex="0"
      class="title"
    >
      <div class="worn-text">Optional traits</div>
    </div>
  </HelpSource>
  <div class="flanges">
    <div class="fl-left">
      <div class="flange" />
      <div class="flange" />
      <div class="flange" />
      <div class="flange" />
    </div>
    <div class="fl-right">
      <div class="flange" />
      <div class="flange" />
      <div class="flange" />
      <div class="flange" />
    </div>
    <div class="terminal terminal-font-defaults">
      <div class="leftTraits">
        {#each leftTraits as trait}
          <div class="trait">
            <HelpSource subject={Trait[trait]}>
              <input
                type="checkbox"
                class="checkbox-button"
                on:click={traitHandler}
                bind:group={$chosenTraits}
                value={Trait[trait]}
              />
              <div
                data-trait={trait}
                role="link"
                class={$chosenTraits.includes(Trait[trait]) ? 'selected' : ''}
              >
                {Trait[trait]}
              </div>
            </HelpSource>
          </div>
        {/each}
      </div>
      <div class="rightTraits">
        {#each rightTraits as trait}
          <div class="trait">
            <HelpSource subject={Trait[trait]}>
              <input
                type="checkbox"
                class="checkbox-button"
                on:click={traitHandler}
                bind:group={$chosenTraits}
                value={Trait[trait]}
              />
              <div
                data-trait={trait}
                role="link"
                class={$chosenTraits.includes(Trait[trait]) ? 'selected' : ''}
              >
                {Trait[trait]}
              </div>
            </HelpSource>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="footer" />
</div>

<style lang="postcss">
  .fl-left,
  .fl-right {
    position: absolute;
    display: flex;
    flex-flow: column;
    gap: 2rem;
    top: 51rem;
  }

  .fl-right {
    right: -6rem;
    .flange:first-child {
      border-top-right-radius: 6rem 2rem;
    }
    .flange:last-child {
      border-bottom-right-radius: 6rem 2rem;
    }
    .flange {
      /* prettier-ignore */
      box-shadow:
        inset 0 -1rem 1rem 0 rgba(0, 0, 0, 0.6),
        inset -1rem 1rem 1rem 0 rgba(255,255,255,0.15);
      &:after {
        left: -1rem;
      }
    }
  }

  .fl-left {
    left: -6rem;
    .flange:first-child {
      border-top-left-radius: 6rem 2rem;
    }
    .flange:last-child {
      border-bottom-left-radius: 6rem 2rem;
    }
    .flange {
      /* prettier-ignore */
      box-shadow:
        inset 1rem -1rem 1rem 0 rgba(0, 0, 0, 0.6),
        inset 0rem 1rem 1rem 0 rgba(255,255,255,0.15);
      &:after {
        right: -1rem;
      }
    }
  }

  .flange {
    width: 10rem;
    height: 11rem;
    background-color: hsl(var(--ruddy));
    &:after {
      position: absolute;
      width: 4rem;
      top: 0rem;
      bottom: 0rem;
      content: ' ';
      background-color: hsl(var(--ruddy));
    }
  }

  .traits {
    /* $ruddy: #43281d; */
    /* $ruddy: #412520; */
    /* $ruddy: #381B15; */
    /* $ruddy: #383328; */
    /* $ruddy: mix(#383328, #43281d); */
    --ruddy-hs: 24.4, 27.8%;
    --ruddy-l: 19%;
    --ruddy: var(--ruddy-hs), var(--ruddy-l);
    width: 303rem;
    position: relative;
    border-radius: 15rem;
    background-color: hsl(var(--bg));
    margin: 2rem auto;
    padding: 0;
    background-color: hsl(var(--ruddy));
    position: relative;
    color: hsl(var(--terminal-color));
    .title {
      position: relative;
      z-index: 1;
      font-size: 16rem;
      line-height: 24rem;
      padding: 0;
      padding-left: 40rem;
      margin-left: -2rem;
      margin-right: -2rem;
      background-color: hsl(var(--bg));
      border-top-left-radius: 7rem 8rem;
      border-top-right-radius: 7rem 8rem;
      border-bottom-left-radius: 2rem;
      border-bottom-right-radius: 2rem;
      /* prettier-ignore */
      box-shadow: 
        var(--basic-box-shadow),
        0 6rem 3rem 0 rgba(0, 0, 0, 0.4),
        var(--underbelly-shadow);
    }
    .terminal {
      height: 100%;
      display: flex;
      flex-flow: row;
      background: linear-gradient(
        0.25turn,
        hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 20%)) 0%,
        hsl(var(--ruddy)) 3rem,
        hsl(var(--ruddy)) 25rem,
        hsl(var(--ruddy-hs), calc(var(--ruddy-l) + 20%)) 27rem,
        hsl(var(--terminal-bg)) 27rem,
        hsl(var(--terminal-bg)) 276rem,
        hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 20%)) 276rem,
        hsl(var(--ruddy)) 280rem,
        hsl(var(--ruddy)) 300rem,
        #65584f 303rem
      );
      /* ^ruddy mixed with #fff 80% */
    }
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
        margin: 2rem 6rem;
      }
    }
    .leftTraits {
      width: 185rem;
      [data-trait] {
        padding-left: 40rem;
      }
      input {
        left: 0;
      }
      .trait {
        &::after {
          content: ' ';
          position: absolute;
          top: 6rem;
          left: 22rem;
          width: 5rem;
          border-top: 1rem solid rgba(0, 0, 0, 0.5);
          border-bottom: 1rem solid rgba(255, 255, 255, 0.25);
        }
      }
    }
    .rightTraits {
      width: 122rem;
      [data-trait] {
        padding-right: 27rem;
      }
      input {
        right: 0;
      }
      .trait {
        &::after {
          content: ' ';
          position: absolute;
          top: 6rem;
          right: 22rem;
          width: 5rem;
          border-top: 1rem solid rgba(0, 0, 0, 0.5);
          border-bottom: 1rem solid rgba(255, 255, 255, 0.15);
        }
      }
    }
    .footer {
      margin-left: -2rem;
      margin-right: -2rem;
      background-color: hsl(var(--bg));
      content: ' ';
      height: 15rem;
      border-bottom-left-radius: 6rem 5rem;
      border-bottom-right-radius: 6rem 5rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      /* prettier-ignore */
      box-shadow:
        var(--basic-box-shadow),
        var(--underbelly-shadow);
    }
  }
</style>
