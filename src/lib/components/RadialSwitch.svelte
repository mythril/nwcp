<script lang="ts">
  import { clickSound } from '$lib/browserUtils';

  export let options: string[] = [];
  export let disabled: Record<string, boolean> = {};
  export let value: string;

  let enabled = options.filter((a) => !disabled[a]);

  let enabledIndex: number;
  let index: number;
  let dir = 1;

  enabledIndex = enabled.indexOf(value);
  index = options.indexOf(enabled[enabledIndex]);
  $: {
    enabledIndex = enabled.indexOf(value);
    index = options.indexOf(enabled[enabledIndex]);
    if (enabledIndex < 0) {
      value = options[0];
    }
  }

  function clickHandler() {
    if (!enabled[enabledIndex + dir]) {
      dir = dir * -1;
    }
    value = enabled[enabledIndex + dir];
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

  function createLabelHandler(option: string) {
    return function labelHandler() {
      let nIdx = options.indexOf(option);
      let count = Math.abs(index - nIdx);
      let delay = 100 / count;
      value = option;
      const doClicks = () => {
        if (count > 0) {
          clickSound();
          count -= 1;
          if (count > 0) {
            setTimeout(doClicks, delay);
          }
        }
      };
      doClicks();
    };
  }
</script>

<div class="offscreen">
  <svg>
    <defs>
      <filter id="radial">
        <feSpecularLighting
          in="SourceGraphic"
          lighting-color="#fff"
          specularExponent="50"
          result="specLight1"
        >
          <fePointLight
            x="75"
            y="-75"
            z="85"
          />
        </feSpecularLighting>
        <feGaussianBlur
          stdDeviation="1"
          result="blur1"
        />
        <feSpecularLighting
          in="SourceGraphic"
          lighting-color="#fff"
          specularExponent="50"
          result="specLight2"
        >
          <feDistantLight
            azimuth="135"
            elevation="140"
          />
        </feSpecularLighting>
        <feComposite
          in="specLight1"
          in2="SourceGraphic"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
        />
        <feComposite
          in2="SourceGraphic"
          operator="in"
        />
        <feBlend
          in2="SourceGraphic"
          mode="luminosity"
        />
      </filter>
    </defs>
  </svg>
</div>

<div class="radial-menu">
  <div
    role="button"
    tabindex="0"
    class="switch-wrap"
    style={`--rsi: ${index}`}
    on:click={clickHandler}
    on:keydown={keyHandler}
  >
    <svg viewBox="0 0 9.5 11.6">
      <g transform="translate(-76.7 -52.8)">
        <circle
          cx="81.5"
          cy="58.6"
          r="4.5"
        />
      </g>
    </svg>
  </div>
  <div
    role="button"
    tabindex="0"
    class="switch-wrap"
    style={`--rsi: ${index}`}
    on:click={clickHandler}
    on:keydown={keyHandler}
  >
    <svg viewBox="0 0 9.5 11.6">
      <g transform="translate(-76.7 -52.8)">
        <path
          d="m81.1 53.3-2 9.8a.4.4 50.8 0 0 .4.5h4a.4.4 129.2 0 0 .4-.5l-2-9.8a.4.4 0 0 0-.8 0z"
        />
      </g>
    </svg>
  </div>
  {#each options as option}
    <button
      on:click={createLabelHandler(option)}
      disabled={!!disabled[option]}>{option}</button
    >
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
    button:disabled {
      text-decoration: line-through;
      opacity: 0.5;
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
    filter: url(#radial) drop-shadow(-5rem 5rem 5rem black);
    margin: auto;
    grid-area: switch;
    width: 40rem;
    height: 40rem;
    color: hsl(var(--bakelite));
    svg {
      fill: currentColor;
      transform: rotate(calc(-60deg + (var(--rsi) * 60deg)));
      transform-origin: 50% 50%;
      transition-property: --rsi, transform;
      transition-duration: 0.1s;
      transition-timing-function: ease-in-out;
    }
  }
</style>
