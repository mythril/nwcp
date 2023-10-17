import { get, writable } from 'svelte/store';
import type { UnfinishedCharacter } from '$lib/engines/UnfinishedCharacter';
import { chosenSkills } from '$lib/components/UI/TaggedSkills.svelte';
import { chosenTraits } from '$lib/components/UI/OptionalTraits.svelte';
import { helpSubject } from '$lib/components/Help.svelte';

export const character = writable<UnfinishedCharacter>();

export const resetChar = () => {
  helpSubject.set('');
  chosenSkills.set([]);
  chosenTraits.set([]);
  get(character)._reset();
  character.set(get(character));
};

export const loadFromChar = (char: UnfinishedCharacter) => {
  chosenSkills.set(char.taggedAsArray());
  chosenTraits.set(char.traitsAsArray());
  character.set(char);
};
