<script
  context="module"
  lang="ts"
>
  import { Raise } from '$lib/utils';

  import { tick } from 'svelte';

  type Target = HTMLElement | string;

  function move(node: HTMLElement, to: HTMLElement) {
    node.parentNode?.removeChild(node);
    to.appendChild(node);
  }

  /** @type {import('svelte/action').Action<HTMLElement, Target>}  */
  export function portal(node: HTMLElement, target: Target = 'body') {
    let destination: HTMLElement;

    async function update(newTarget: Target) {
      if (typeof newTarget === 'string') {
        if (document.querySelector(newTarget) === null) {
          await tick();
        }
        destination =
          document.querySelector(newTarget) ||
          Raise('Could not find target element: ' + newTarget);
      }
      move(node, destination);
      node.hidden = false;
    }
    update(target);
    return {
      update,
      destroy() {
        node.parentNode?.removeChild(node);
      }
    };
  }
</script>

<script lang="ts">
  export let target: Target = 'body';
</script>

<div
  use:portal={target}
  class={'portal ' + ($$props.class || '')}
  hidden
>
  <slot />
</div>

<style>
  .portal {
    display: contents;
  }
</style>
