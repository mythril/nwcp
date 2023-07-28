<script lang="ts">
  import { bonkSound, clickSound } from '$lib/utils';
  import { onMount } from 'svelte';

  export let value = '';
  let text: HTMLInputElement;
  function keyHandler(event: KeyboardEvent) {
    text.value = '';
    event.preventDefault();
    if (value.length > 10) {
      bonkSound();
      return;
    }
    if (event.key.length === 1) {
      value = value + event.key;
      clickSound();
    }
  }

  function controlKeys(event: KeyboardEvent) {
    text.value = '';
    if (event.key === 'Backspace' || event.key === 'Delete') {
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
  });
</script>

<div class={$$props.class + ' wrapper'}>
  <input
    on:keypress={keyHandler}
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
      content: ' ';
      display: inline-block;
      vertical-align: text-top;
      width: 1rem;
      height: 1em;
      margin-left: 1rem;
      background-color: transparent;
    }
    input:focus + .display .value::after {
      width: 0.5em;
      background-color: hsl(var(--terminal-color));
      animation: cursor-blink 0.3s steps(2, start) infinite;
    }
    @keyframes cursor-blink {
      to {
        visibility: hidden;
      }
    }
  }
</style>
