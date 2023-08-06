<script lang="ts">
  import { Special, SpecialAbbreviation } from '$lib/engines/ChosenOne';
  import Attribute from './Attribute.svelte';
  import HelpSource from './HelpSource.svelte';
  import { attributes, charPointsRemaining } from './stores';
</script>

<div class="special">
  {#each Object.values(Special) as attr}
    <HelpSource subject={attr}>
      <Attribute
        label={SpecialAbbreviation(attr)}
        value={$attributes[attr]}
        charPointsRemaining={$charPointsRemaining}
        onChange={(a) => {
          $attributes[attr] = a;
          $attributes = $attributes;
        }}
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
