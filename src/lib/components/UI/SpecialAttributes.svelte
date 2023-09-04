<script lang="ts">
  import Attribute from './Attribute.svelte';
  import { character } from '../../../routes/CharacterStore';
  import HelpSource from '$lib/components/HelpSource.svelte';
  import { Special, SpecialAbbreviation } from '$lib/engines/all';
</script>

<div class="special">
  {#each Object.values(Special) as attr}
    <HelpSource subject={attr}>
      <Attribute
        label={SpecialAbbreviation(attr)}
        bind:value={$character[attr]}
        display={$character.displayAttributes[attr]}
        on:charPointsRemainingBonk
        charPointsRemaining={$character.charPointsRemaining}
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
