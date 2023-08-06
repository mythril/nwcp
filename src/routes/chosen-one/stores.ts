import { writable, derived } from 'svelte/store';
import { CharacterHelpLookup } from '$lib/engines/help';
import { PerkHelpLookup } from '$lib/engines/perks';
import { Special, type Attributes } from '$lib/engines/ChosenOne';
const HelpLookup = { ...CharacterHelpLookup, ...PerkHelpLookup };

export const helpSubject = writable<keyof typeof HelpLookup>('Strength');

export const helpText = derived(
  helpSubject,
  ($subject) => HelpLookup[$subject]
);

export const modalShown = writable<boolean>(false);

export const attributes = writable<Attributes>({
  [Special.Strength]: 5,
  [Special.Perception]: 5,
  [Special.Endurance]: 5,
  [Special.Charisma]: 5,
  [Special.Intelligence]: 5,
  [Special.Agility]: 5,
  [Special.Luck]: 5
});

export const charPointsRemaining = derived(attributes, (a) => {
  const cpr = Object.values(a).reduce((a, b) => a + b, 0);
  return 40 - cpr;
});
