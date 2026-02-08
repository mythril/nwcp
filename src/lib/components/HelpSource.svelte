<!-- @migration-task Error while migrating Svelte code: Cannot split a chunk that has already been edited (15:20 – "on:click={() => {
    helpSubject.set(subject);
  }}") -->
<script lang="ts">
  import { helpSubject } from './Help.svelte';

  export let subject: string;
  let activeHelpSubject = subject === $helpSubject;
  $: activeHelpSubject = subject === $helpSubject;
</script>

<div
  role="link"
  tabindex="0"
  data-help-subject={subject}
  class={$$props.class || ''}
  class:activeHelpSubject
  on:click={() => {
    helpSubject.set(subject);
  }}
  on:keydown={() => {
    helpSubject.set(subject);
  }}
  on:focusin={() => {
    helpSubject.set(subject);
  }}
>
  <slot />
</div>

<style lang="postcss">
  div {
    display: contents;
  }
</style>
