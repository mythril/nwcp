<script lang="ts">
  import { UnfinishedWarrior } from '$lib/engines/Warrior/main';
  import { character } from '../chosen-one/CharacterStore';

  const char = new UnfinishedWarrior();
  char.reset();
  $character = char;
</script>

{$character.role}
