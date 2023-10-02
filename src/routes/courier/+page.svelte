<script lang="ts">
  import { loadFromChar, resetChar } from '../CharacterStore';
  import Main from '$lib/components/UI/Main.svelte';
  import { role } from '../RoleStore';
  import { Role } from '$lib/engines/all';
  import { UnfinishedCourier } from '$lib/engines/Courier/Unfinished';

  $role = Role.Courier;
  loadFromChar(new UnfinishedCourier());
  resetChar();
</script>

<Main />
