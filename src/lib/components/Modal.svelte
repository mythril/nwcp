<script
  lang="ts"
  module
>
  export const ModalNavEvents = {
    navBack: 'navBack',
    navExit: 'navExit'
  } as const;
  export type ModalEventSignature = {
    [k in keyof typeof ModalNavEvents]: null;
  };
</script>

<script lang="ts">
  import { grabFocus } from '$lib/actions/grabFocus';
  import Portal from './Portal.svelte';

  import { createEventDispatcher } from 'svelte';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
  const dispatch = createEventDispatcher<ModalEventSignature>();

  function cancelHandler(event: KeyboardEvent) {
    switch (event.code) {
      case 'Escape':
        dispatch(ModalNavEvents.navBack);
        return;
      default:
        return;
    }
  }
</script>

<svelte:body onkeydown={cancelHandler} />

<Portal target="#modals">
  <div
    class="focus-grabber"
    use:grabFocus
  >
    {@render children?.()}
  </div>
</Portal>

<style lang="postcss">
  .focus-grabber {
    display: contents;
  }
</style>
