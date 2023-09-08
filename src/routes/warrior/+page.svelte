<script lang="ts">
  import { loadFromChar, resetChar } from '../CharacterStore';
  import { UnfinishedWarrior } from '$lib/engines/Warrior/Unfinished';
  import Main from '$lib/components/UI/Main.svelte';

  loadFromChar(new UnfinishedWarrior());
  resetChar();
</script>

<Main />
