<script lang="ts">
  import { UnfinishedVaultDweller } from '$lib/engines/VaultDweller/main';
  import { character } from '../chosen-one/CharacterStore';

  const char = new UnfinishedVaultDweller();
  char.reset();
  $character = char;
</script>

{$character.role}
