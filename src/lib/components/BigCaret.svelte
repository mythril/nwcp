<script lang="ts">
  import { bonkSound, clickSound } from '$lib/browserUtils';
  import { onMount } from 'svelte';

  export let value = '';
  let text: HTMLInputElement;

  function controlKeys(event: KeyboardEvent) {
    text.value = '';
    if (event.code === 'Backspace' || event.code === 'Delete') {
      if (value.length === 0) {
        bonkSound();
      } else {
        clickSound();
      }
      value = value.slice(0, -1);
      return;
    }
  }

  onMount(() => {
    text.focus();
    text.addEventListener('input', (ev) => {
      ev.preventDefault();
      if (value.length > 10) {
        bonkSound();
        return;
      }
      value = value + text.value.slice(-1);
      text.value = '';
      clickSound();
    });
  });
</script>

<div class={'wrapper ' + ($$props.class || '')}>
  <input
    on:keydown={controlKeys}
    on:change={() => (text.value = '')}
    bind:this={text}
    type="text"
  />
  <div class="display">
    <div
      role="textbox"
      class="value"
    >
      {value}
    </div>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .display,
    input {
      border: 0;
      margin: 0;
      padding: 0;
      display: block;
      font-size: 1em;
      font-family: inherit;
      line-height: inherit;
    }
    input {
      z-index: 1;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      appearance: none;
      color: transparent;
      background-color: transparent;
      &:focus {
        outline: 0;
      }
    }
    .display {
      color: inherit;
      white-space: pre;
    }
    .display .value::after {
      content: '\2588';
      display: inline;
      opacity: 0;
    }
    input:focus + .display .value::after {
      width: 0.5em;
      /* background-color: hsl(var(--terminal-color)); */
      animation: 0.3s cursor-blink step-end infinite;
    }
    @keyframes cursor-blink {
      from,
      to {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }
  }
</style>
