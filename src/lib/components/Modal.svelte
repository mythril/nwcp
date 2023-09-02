<script
  lang="ts"
  context="module"
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

<svelte:body on:keydown={cancelHandler} />

<Portal target="#modals">
  <div
    class="focus-grabber"
    use:grabFocus
  >
    <slot />
  </div>
</Portal>

<style lang="postcss">
  .focus-grabber {
    display: contents;
  }
</style>
