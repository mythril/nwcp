<script lang="ts">
  import type { HelpLookup } from "$lib/engines/ChosenOne";
  import { helpSubject } from "./stores";

  export let subject : keyof typeof HelpLookup;
  let activeHelpSubject = subject === $helpSubject
  $: activeHelpSubject = subject === $helpSubject;
</script>

<div 
  role="link"
  tabindex="0"
  data-help-subject={subject}
  class={$$props.class}
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

<style lang="scss">
  div {
    display:contents;
  }
</style>