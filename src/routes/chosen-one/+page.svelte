<script lang="ts">
  import { character } from '../CharacterStore';
  import { UnfinishedChosenOne } from '$lib/engines/ChosenOne/main';
  import Main from '$lib/components/UI/Main.svelte';

  let char = new UnfinishedChosenOne();
  char.reset();

  $character = char;
</script>

<Main />
