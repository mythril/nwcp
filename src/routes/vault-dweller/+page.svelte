<script lang="ts">
  import { character } from '../CharacterStore';
  import Main from '$lib/components/UI/Main.svelte';
  import { UnfinishedVaultDweller } from '$lib/engines/VaultDweller/main';

  let char = new UnfinishedVaultDweller();
  char.reset();

  //$character = char;
</script>

<Main  />
