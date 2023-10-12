<script
  lang="ts"
  context="module"
>
  import { writable, derived } from 'svelte/store';
  import { character } from '../../routes/CharacterStore';

  export const helpSubject = writable<string>('Strength');

  export const helpText = derived(
    [helpSubject, character],
    ([$subject, $char]) => $char.getHelp($subject)
  );
</script>

<script lang="ts">
  let text = '';
  let extra = '';
  $: {
    text = $helpText;
    if ($helpSubject in $character.help.formulas) {
      extra = $character.help.formulas[$helpSubject];
    } else {
      extra = '';
    }
  }
</script>

<div class="help">
  <div class="paper-bg" />
  <div class="content">
    <h3 class="subject">
      {$helpSubject}
      <span class="extra">{extra}</span>
    </h3>
    <div class="info">
      <div class="text">
        {text}
      </div>
      <div class="image" />
    </div>
  </div>
</div>

<div class="offscreen">
  <svg>
    <defs>
      <filter id="paper">
        <feTurbulence
          x="0"
          y="0"
          baseFrequency="0.002"
          numOctaves="5"
          seed="1"
        />
        <feDisplacementMap
          in="SourceGraphic"
          scale="10"
        />
      </filter>
    </defs>
  </svg>
</div>

<style lang="postcss">
  .help {
    position: relative;
    padding: 3rem 6rem;
    width: 303rem;
    height: 190rem;
    margin-top: -2rem;
    /* prettier-ignore */
    box-shadow: 
      0 0 0 1rem rgba(0, 0, 0, 0.5),
      -1rem 1rem 2rem -1rem rgba(255, 255, 255, 0.5),
      -1rem 1rem 2rem -1rem rgba(218, 204, 18, 0.5) inset;
  }
  .content {
    position: absolute;
    isolation: isolate;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 12rem 15rem;
    display: flex;
    flex-flow: column;
    .subject {
      font-family: var(--label-font);
      padding: 0;
      width: 100%;
      border-bottom: 2rem solid #000;
      margin: 0;
      margin-bottom: 10rem;
      font-size: 21rem;
      line-height: 33rem;
      .extra {
        &:not(:empty)::before {
          content: 'Base: ';
        }
        font-family: var(--terminal-font);
        font-weight: 700;
        font-size: 8rem;
      }
    }
    .info {
      display: flex;
      flex-flow: row;
      font-weight: 700;
      .text {
        width: 155rem;
      }
    }
  }
  .paper-bg {
    width: 289rem;
    height: 180rem;
    box-shadow: 0 0 10rem 5rem hsla(42.4, 100%, 14.7%, 0.4) inset;
    background-color: hsl(32.3, 21.3%, 47.8%, 1);
    background-image: linear-gradient(
        0.3turn,
        hsla(32.3, 21.3%, 47.8%, 0),
        hsla(39.4, 52.2%, 39.4%, 0) 228rem,
        hsla(34.6, 43.3%, 47.1%, 0.35) 235rem,
        hsla(48, 67.6%, 29%, 0.35) 237rem,
        hsla(32.3, 21.3%, 47.8%, 0.35) 245rem
      ),
      linear-gradient(
        0.32turn,
        hsla(32.3, 21.3%, 47.8%, 0),
        hsla(39.4, 52.2%, 39.4%, 0) 304rem,
        hsla(34.6, 43.3%, 47.1%, 0.75) 311rem,
        hsla(48, 67.6%, 29%, 0.75) 313rem,
        hsla(32.3, 21.3%, 47.8%, 0.75) 320rem,
        hsla(34.6, 43.3%, 47.1%, 0.75) 323rem,
        hsla(48, 67.6%, 29%, 0.75) 328rem,
        hsla(32.3, 21.3%, 47.8%, 0.75) 334rem
      ),
      linear-gradient(
        0.25turn,
        #947c60,
        #997530 161rem,
        #ac8044 166rem,
        #7c6818 167rem,
        #947c60 175rem
      );
    filter: url(#paper) saturate(0.8) hue-rotate(5deg) brightness(0.8);
  }
</style>
