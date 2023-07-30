<script lang="ts">
  import Sprite from '$lib/components/Sprite.svelte';
  import { helpSubject, helpText } from './stores';

  let text = '';
  let extra = '';
  $: {
    if (typeof $helpText === 'string') {
      text = $helpText;
      extra = '';
    } else {
      text = $helpText[0];
      extra = $helpText[1];
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
      <div class="image">
        <Sprite />
      </div>
    </div>
  </div>
</div>

<svg>
  <filter id="paper">
    <feTurbulence
      x="0"
      y="0"
      baseFrequency="0.01"
      numOctaves="5"
      seed="1"
    />
    <feDisplacementMap
      in="SourceGraphic"
      scale="10"
    />
  </filter>
</svg>

<style lang="postcss">
  .help{
    position: relative;
    padding: 8rem 10rem;
    width:100%;
    height:100%;
    /* prettier-ignore */
    box-shadow: 
      0 0 0 1rem rgba(0, 0, 0, 0.5),
      -1rem 1rem 2rem -1rem rgba(255, 255, 255, 0.5),
      -1rem 1rem 2rem -1rem rgba(255, 255, 255, 0.5) inset;
  }
  .content {
    position: absolute;
    isolation: isolate;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 17rem 20rem;
    display: flex;
    flex-flow: column;
    .subject {
      font-family: var(--label-font);
      padding: 0;
      width: 100%;
      border-bottom: 2rem solid #000;
      margin: 0;
      margin-bottom: 10rem;
      font-size: 30rem;
      line-height: 1.5;
      .extra {
        &:not(:empty)::before {
          content: 'Base: ';
        }
        font-family: var(--terminal-font);
        font-weight: 700;
        font-size: 10rem;
      }
    }
    .info {
      display: flex;
      flex-flow: row;
      font-weight: 700;
    }
  }
  .paper-bg {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 1) inset;
    background: linear-gradient(
        0.3turn,
        hsla(32.3, 21.3%, 47.8%, 0),
        hsla(39.4, 52.2%, 39.4%, 0) 300rem,
        hsla(34.6, 43.3%, 47.1%, 0.35) 310rem,
        hsla(48, 67.6%, 29%, 0.35) 312rem,
        hsla(32.3, 21.3%, 47.8%, 0.35) 322rem
      ),
      linear-gradient(
        0.32turn,
        hsla(32.3, 21.3%, 47.8%, 0),
        hsla(39.4, 52.2%, 39.4%, 0) 400rem,
        hsla(34.6, 43.3%, 47.1%, 0.75) 410rem,
        hsla(48, 67.6%, 29%, 0.75) 412rem,
        hsla(32.3, 21.3%, 47.8%, 0.75) 422rem,
        hsla(34.6, 43.3%, 47.1%, 0.75) 425rem,
        hsla(48, 67.6%, 29%, 0.75) 432rem,
        hsla(32.3, 21.3%, 47.8%, 0.75) 440rem
      ),
      linear-gradient(
        0.25turn,
        #947c60,
        #997530 212rem,
        #ac8044 223rem,
        #7c6818 225rem,
        #947c60 240rem
      );
    filter: url(#paper);
  }
</style>
