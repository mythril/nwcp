<script lang="ts">
  import { clickSound } from '$lib/utils';

  export let options: string[] = [];
  export let value: string;

  let index: number;
  let dir = 1;

  $: {
    index = options.indexOf(value);
    if (index < 0) {
      value = options[0];
    }
  }

  function clickHandler() {
    if (!options[index + dir]) {
      dir = dir * -1;
    }
    value = options[index + dir];
    clickSound();
  }

  function keyHandler(ev: KeyboardEvent) {
    switch (ev.code) {
      case 'Enter':
        clickHandler();
        return;
      default:
        return;
    }
  }
</script>

<div class="radial-menu">
  <div
    role="button"
    tabindex="0"
    class="switch-wrap"
    style={`--rsi: ${index}`}
    on:click={clickHandler}
    on:keydown={keyHandler}
  >
    <svg viewBox="0 0 24 26">
      <g transform="translate(-76.7 -52.8)">
        <circle
          cx="88.7"
          cy="66.9"
          r="12"
        />
        <path
          d="m87.7 53.7-5 24a.9.9 50.8 0 0 .9 1.1h10.3a.9.9 129.2 0 0 .8-1l-5-24.1a1 1 0 0 0-2 0z"
        />
      </g>
    </svg>
  </div>
  {#each options as option}
    <button on:click={() => (value = option)}>{option}</button>
  {/each}
</div>

<style lang="postcss">
  .radial-menu {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0.5fr 1fr 1fr 1fr;
    grid-template-areas:
      'top top top'
      't-left switch t-right'
      'b-left switch b-right'
      'bottom bottom bottom';
    button {
      user-select: none;
      appearance: none;
      padding: 0;
      margin: 0;
      border: 0;
      font-size: 8rem;
      line-height: 1;
      background-color: transparent;
      font-family: var(--terminal-font);
      font-weight: 700;
      color: hsl(var(--title-color));
    }
    button:nth-of-type(1) {
      grid-area: t-left;
      text-align: right;
    }
    button:nth-of-type(2) {
      grid-area: top;
      text-align: center;
    }
    button:nth-of-type(3) {
      grid-area: t-right;
      text-align: left;
    }
    button:nth-of-type(4) {
      grid-area: b-right;
      text-align: left;
    }
    button:nth-of-type(5) {
      grid-area: bottom;
      text-align: center;
    }
    button:nth-of-type(6) {
      grid-area: b-left;
      text-align: right;
    }
  }
  @property --rsi {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
  }
  .switch-wrap {
    margin: auto;
    grid-area: switch;
    width: 40rem;
    height: 40rem;
    transform: rotate(calc(-60deg + (var(--rsi) * 60deg)));
    transform-origin: 50% 58%;
    transition-property: --rsi;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
  }
</style>
