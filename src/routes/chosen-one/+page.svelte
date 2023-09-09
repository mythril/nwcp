<script lang="ts">
  import { loadFromChar, resetChar } from '../CharacterStore';
  import { UnfinishedChosenOne } from '$lib/engines/ChosenOne/Unfinished';
  import Main from '$lib/components/UI/Main.svelte';
  import { Role } from '$lib/engines/all';
  import { role } from '../RoleStore';

  $role = Role.ChosenOne;
  loadFromChar(new UnfinishedChosenOne());
  resetChar();
</script>

<Main />
