<script lang="ts">
  import { loadFromChar, resetChar } from '../CharacterStore';
  import { UnfinishedVaultDweller } from '$lib/engines/VaultDweller/Unfinished';
  import Main from '$lib/components/UI/Main.svelte';

  loadFromChar(new UnfinishedVaultDweller());
  resetChar();
</script>

<Main />
