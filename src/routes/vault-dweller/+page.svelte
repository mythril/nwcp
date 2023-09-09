<script lang="ts">
  import { loadFromChar, resetChar } from '../CharacterStore';
  import { UnfinishedVaultDweller } from '$lib/engines/VaultDweller/Unfinished';
  import Main from '$lib/components/UI/Main.svelte';
  import { role } from '../RoleStore';
  import { Role } from '$lib/engines/all';

  $role = Role.VaultDweller;
  loadFromChar(new UnfinishedVaultDweller());
  resetChar();
</script>

<Main />
