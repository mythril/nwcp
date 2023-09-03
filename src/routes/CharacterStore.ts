import { writable } from 'svelte/store';
import type { UnfinishedCharacter } from '$lib/engines/UnfinishedCharacter';

export const character = writable<UnfinishedCharacter>();

export const loadFromChar = (char: UnfinishedCharacter) => {
  character.set(char);
};
