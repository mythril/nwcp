<script lang="ts">
  import { loadFromChar, resetChar } from '../CharacterStore';
  // import { UnfinishedWarrior } from '$lib/engines/Warrior/Unfinished';
  import Main from '$lib/components/UI/Main.svelte';
  import { role } from '../RoleStore';
  import { Role } from '$lib/engines/all';

  $role = Role.Courier;
  // loadFromChar(new UnfinishedWarrior());
  // resetChar();
</script>

<Main />
