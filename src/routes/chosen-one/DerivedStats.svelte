<script lang="ts">
  import { DerivedStats } from '$lib/engines/ChosenOne';
  import Bolthead from './Bolthead.svelte';
  import HelpSource from './HelpSource.svelte';
</script>

<div class="display">
  <table class="highlighted">
    <tbody>
      {#each Object.values(DerivedStats) as derived}
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
              {Math.round(Math.random() * 150) +
                (Math.random() > 0.25 ? '' : '%')}
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

<style lang="postcss">
  .activeHelpSubject {
    color: hsl(var(--terminal-color-active));
  }
</style>
