<script lang="ts">
  import { Special, SpecialAbbreviation } from '$lib/engines/ChosenOne';
  import Attribute from './Attribute.svelte';
  import HelpSource from './HelpSource.svelte';
</script>

<div class="special">
  {#each Object.values(Special) as attr}
    <HelpSource subject={attr}>
      <Attribute
        label={SpecialAbbreviation(attr)}
        value={Math.round(Math.random() * 9 + 1)}
      />
    </HelpSource>
  {/each}
</div>

<style lang="postcss">
  .special {
    border-bottom-left-radius: 9rem 5rem;
    padding: 0rem 7rem;
    position: relative;
  }
</style>
