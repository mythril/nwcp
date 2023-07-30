<script lang="ts">
  import { Traits } from '$lib/engines/ChosenOne';
  import { clickSound } from '$lib/utils';
  import HelpSource from './HelpSource.svelte';

  let chosenTraits: string[] = [];
  let traits = Object.keys(Traits);
  let leftTraits = traits.slice(0, 8);
  let rightTraits = traits.slice(8, 16);
</script>

<div class="traits">
  <div class="flanges">
    <HelpSource subject="Optional Traits">
      <div
        role="link"
        tabindex="0"
        class="before worn-text"
      >
        Optional traits
      </div>
    </HelpSource>
    <div class="flange-set-left">
      <div class="flange" />
      <div class="flange" />
      <div class="flange" />
      <div class="flange" />
    </div>
    <div class="flange-set-right">
      <div class="flange" />
      <div class="flange" />
      <div class="flange" />
      <div class="flange" />
    </div>
    <div class="terminal terminal-font-defaults">
      <div class="leftTraits">
        {#each leftTraits as trait}
          <div class="trait">
            <HelpSource subject={Traits[trait]}>
              <input
                type="checkbox"
                class="checkbox-button"
                on:click={clickSound}
                bind:group={chosenTraits}
                value={trait}
              />
              <div
                data-trait={trait}
                role="link"
                class={chosenTraits.includes(trait) ? 'selected' : ''}
              >
                {Traits[trait]}
              </div>
            </HelpSource>
          </div>
        {/each}
      </div>
      <div class="rightTraits">
        {#each rightTraits as trait}
          <div class="trait">
            <HelpSource subject={Traits[trait]}>
              <input
                type="checkbox"
                class="checkbox-button"
                on:click={clickSound}
                bind:group={chosenTraits}
                value={trait}
              />
              <div
                data-trait={trait}
                role="link"
                class={chosenTraits.includes(trait) ? 'selected' : ''}
              >
                {Traits[trait]}
              </div>
            </HelpSource>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .traits {
    /* $ruddy: #43281d; */
    /* $ruddy: #412520; */
    /* $ruddy: #381B15; */
    /* $ruddy: #383328; */
    /* $ruddy: mix(#383328, #43281d); */
    --ruddy-hs: 24.4, 27.8%;
    --ruddy-l: 19%;
    --ruddy: var(--ruddy-hs), var(--ruddy-l);
    position: relative;
    border-radius: 15rem;
    background-color: hsl(var(--bg));
    margin: 10rem;
    margin-top: 0;
    padding: 0;
    padding-top: 33rem;
    background-color: hsl(var(--ruddy));
    position: relative;
    color: hsl(var(--terminal-color));
    .flanges {
      height: 92%;
      position: relative;
      .before {
        position: absolute;
        bottom: 100%;
        z-index: 1;
        font-size: 22rem;
        line-height: 1.5;
        padding: 0;
        padding-left: 40rem;
      }
      .flange {
        background-color: hsl(var(--ruddy));
        width: 12rem;
        height: 17rem;
      }
      .flange-set-left,
      .flange-set-right {
        position: absolute;
        top: 26%;
      }
      .flange-set-left {
        left: -7rem;
        &::after {
          content: ' ';
          background-color: hsl(var(--ruddy));
          position: absolute;
          left: 10rem;
          top: 0;
          bottom: 0;
          width: 5rem;
        }
        .flange {
          border-top-left-radius: 2rem;
          border-bottom-left-radius: 2rem;
          /* prettier-ignore */
          box-shadow:
            0 3rem 2rem -2rem rgba(255, 255, 255, 0) inset,
            3rem -3rem 4rem -1rem hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 50%)) inset;
          &:first-child {
            /* prettier-ignore */
            box-shadow:
              0 3rem 2rem -2rem rgba(255, 255, 255, 0.25) inset,
              3rem -3rem 4rem -1rem hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 50%)) inset;
          }
        }
        .flange:first-child {
          border-top-left-radius: 4rem;
        }
        .flange:last-child {
          border-bottom-left-radius: 4rem;
        }
      }
      .flange-set-right {
        right: -7rem;
        &::after {
          content: ' ';
          background-color: hsl(var(--ruddy));
          position: absolute;
          right: 7rem;
          top: 0;
          bottom: 0;
          width: 5rem;
        }
        .flange {
          border-top-right-radius: 2rem;
          border-bottom-right-radius: 2rem;
          /* prettier-ignore */
          box-shadow:
            -3rem 0 2rem -2rem rgba(255, 255, 255, 0.25) inset,
            0 -3rem 2rem -1rem hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 50%)) inset;
          &:first-child {
            /* prettier-ignore */
            box-shadow:
              -3rem 2rem 2rem -2rem rgba(255, 255, 255, 0.25) inset,
              0 -3rem 3rem -1rem hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 50%)) inset;
          }
        }
        .flange:first-child {
          border-top-right-radius: 4rem;
        }
        .flange:last-child {
          border-bottom-right-radius: 4rem;
        }
      }
    }
    .terminal {
      height: 100%;
      display: flex;
      flex-flow: row;
      padding-top: 4rem;
      background: linear-gradient(
        0.25turn,
        hsl(var(--ruddy-hs), calc(var(--ruddy-l) - 20%)) 0%,
        hsl(var(--ruddy)) 1%,
        hsl(var(--ruddy)) 7.2%,
        hsl(var(--ruddy-hs), calc(var(--ruddy-l) + 20%)) 8%,
        hsl(var(--terminal-bg)) 8%,
        hsl(var(--terminal-bg)) 91.5%,
        hsl(var(--ruddy)) 92.3%,
        hsl(var(--ruddy)) 99%,
        #65584f 99.9%
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
      }
    }
    .leftTraits {
      width: 60%;
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
          top: 8rem;
          left: 30rem;
          width: 5rem;
          height: 2rem;
          background-color: rgba(0, 0, 0, 0.25);
        }
      }
    }
    .rightTraits {
      width: 40%;
      [data-trait] {
        padding-right: 54rem;
      }
      input {
        right: 0;
      }
      .trait {
        &::after {
          content: ' ';
          position: absolute;
          top: 8rem;
          right: 30rem;
          width: 5rem;
          height: 2rem;
          background-color: rgba(0, 0, 0, 0.25);
        }
      }
    }
    &::after,
    &::before {
      z-index: 1;
      position: absolute;
      left: -3rem;
      right: -3rem;
      background-color: hsl(var(--bg));
    }
    &::before {
      border-top-left-radius: 13rem;
      border-top-right-radius: 13rem;
      border-bottom-left-radius: 5rem;
      border-bottom-right-radius: 5rem;
      /* prettier-ignore */
      box-shadow: 
        var(--basic-box-shadow),
        0 6rem 3rem 0 rgba(0, 0, 0, 0.4),
        var(--underbelly-shadow);
      height: 33rem;
      content: ' ';
      top: 0;
      margin: 0;
    }
    &::after {
      content: ' ';
      height: 20rem;
      bottom: -20rem;
      border-bottom-left-radius: 15rem;
      border-bottom-right-radius: 15rem;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      /* prettier-ignore */
      box-shadow:
        var(--basic-box-shadow),
        var(--underbelly-shadow);
    }
  }
</style>
