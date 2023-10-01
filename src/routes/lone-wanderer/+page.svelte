<script lang="ts">
  import { loadFromChar, resetChar } from '../CharacterStore';
  import Main from '$lib/components/UI/Main.svelte';
  import { Role } from '$lib/engines/all';
  import { role } from '../RoleStore';
  import { UnfinishedLoneWanderer } from '$lib/engines/LoneWanderer/Unfinished';

  $role = Role.LoneWanderer;
  loadFromChar(new UnfinishedLoneWanderer());
  resetChar();
</script>

<Main />
