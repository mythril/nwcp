<script lang="ts">
  import { loadFromChar, resetChar } from '../CharacterStore';
  import { UnfinishedChosenOne } from '$lib/engines/ChosenOne/Unfinished';
  import Main from '$lib/components/UI/Main.svelte';

  loadFromChar(new UnfinishedChosenOne());
  resetChar();
</script>

<Main />
