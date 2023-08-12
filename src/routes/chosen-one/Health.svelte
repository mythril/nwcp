<script lang="ts">
  import { AilmentStatus } from '$lib/engines/ChosenOne/main';
  import Bolthead from './Bolthead.svelte';
  import HelpSource from './HelpSource.svelte';
  import { maxHitPoints } from './stores';
</script>

<div class="display">
  <HelpSource subject="Hit Points">
    <div
      role="link"
      tabindex="0"
    >
      Hit Points {$maxHitPoints}/{$maxHitPoints}
    </div>
  </HelpSource>
  <div class="ailments">
    {#each Object.values(AilmentStatus) as ailment}
      <HelpSource subject={ailment}>
        <div
          role="link"
          tabindex="0"
        >
          {ailment}
        </div>
      </HelpSource>
    {/each}
  </div>
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
