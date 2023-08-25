<script lang="ts">
  import { Special, SpecialAbbreviation } from '$lib/engines/ChosenOne/main';
  import Attribute from './Attribute.svelte';
  import {
    attributes,
    charPointsRemaining,
    displayAttributes
  } from './CharacterStore';
  import HelpSource from './HelpSource.svelte';
</script>

<div class="special">
  {#each Object.values(Special) as attr}
    <HelpSource subject={attr}>
      <Attribute
        label={SpecialAbbreviation(attr)}
        bind:value={$attributes[attr]}
        bind:display={$displayAttributes[attr]}
        on:charPointsRemainingBonk
        charPointsRemaining={$charPointsRemaining}
      />
    </HelpSource>
  {/each}
</div>

<style lang="postcss">
  .special {
    border-bottom-left-radius: 9rem 5rem;
    padding: 2rem 7rem;
    position: relative;
  }
</style>
