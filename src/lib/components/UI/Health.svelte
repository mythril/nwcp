<script lang="ts">
  import Bolthead from '$lib/components/Bolthead.svelte';
  import HelpSource from '$lib/components/HelpSource.svelte';
  import { character } from '../../../routes/CharacterStore';
</script>

<div class="display">
  <HelpSource subject="Hit Points">
    <div
      role="link"
      tabindex="0"
    >
      Hit Points {$character.maxHitPoints}/{$character.maxHitPoints}
    </div>
  </HelpSource>
  <div class="ailments" />
</div>
<Bolthead dir="tl" />
<Bolthead dir="tr" />
<Bolthead dir="br" />
<Bolthead dir="ml" />
<Bolthead dir="bl" />
<Bolthead dir="mr" />

<style lang="postcss">
  .display :global(.activeHelpSubject) {
    color: hsl(var(--terminal-color-active));
  }
  .ailments {
    color: hsl(var(--terminal-faded));
    :global(.activeHelpSubject) {
      color: hsl(var(--terminal-faded-active));
    }
  }
</style>
