<script lang="ts">
  import { DerivedStat } from '$lib/engines/ChosenOne/main';
  import Bolthead from '$lib/components/Bolthead.svelte';
  import HelpSource from '$lib/components/HelpSource.svelte';
  import { character } from '../../../routes/CharacterStore';
</script>

<div class="section">
  <div class="display">
    <table class="highlighted">
      <tbody>
        {#each Object.values(DerivedStat) as derived}
          <tr>
            <th>
              <HelpSource subject={derived}>
                <div
                  role="link"
                  tabindex="0"
                >
                  {derived}
                </div>
              </HelpSource>
            </th>
            <td>
              <HelpSource subject={derived}>
                {$character.derivedStatsDisplay[derived]}
              </HelpSource>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <Bolthead dir="ml" />
  <Bolthead dir="tr" />
  <Bolthead dir="bl" />
  <Bolthead dir="tl" />
  <Bolthead dir="br" />
  <Bolthead dir="mr" />
</div>

<style lang="postcss">
  .display :global(.activeHelpSubject) {
    color: hsl(var(--terminal-color-active));
  }
  .section {
    margin-top: 2rem;
  }
</style>
