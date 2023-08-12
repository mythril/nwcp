import { writable, derived } from 'svelte/store';
import { CharacterHelpLookup } from '$lib/engines/help';
import { PerkHelpLookup } from '$lib/engines/perks';
import {
  Special,
  type Attributes,
  Sex,
  type ChosenTraits,
  type TaggedSkills,
  type SkillSet,
  Skill,
  Trait,
  CombatSkill
} from '$lib/engines/ChosenOne/main';
import type { ObjectValues } from '$lib/utils';
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

export const taggedSkills = writable<TaggedSkills>([]);
export const chosenTraits = writable<ChosenTraits>([]);
export const age = writable<number>(25);
export const sex = writable<ObjectValues<typeof Sex>>(Sex.Male);
export const name = writable<string>('');

export const charPointsRemaining = derived(
  [attributes, chosenTraits],
  ([attrs, traits]) => {
    const cpr = Object.values(attrs).reduce((a, b) => a + b, 0);
    let max = 40;

    if (traits.includes(Trait.Bruiser)) {
      max += 2;
    }

    if (traits.includes(Trait.Gifted)) {
      max += 7;
    }

    if (traits.includes(Trait.SmallFrame)) {
      max += 1;
    }

    return max - cpr;
  }
);

/*
export const statMinimums = derived(chosenTraits, (traits) => {
  const mins = {
    [Special.Strength]: 1,
    [Special.Perception]: 1,
    [Special.Endurance]: 1,
    [Special.Charisma]: 1,
    [Special.Intelligence]: 1,
    [Special.Agility]: 1,
    [Special.Luck]: 1
  };

  if (traits.includes(Trait.Bruiser)) {
    mins[Special.Strength] += 2;
  }

  if (traits.includes(Trait.Gifted)) {
    for (const attr of Object.values(Special)) {
      mins[attr] += 1;
    }
  }

  if (traits.includes(Trait.SmallFrame)) {
    mins[Special.Agility] += 1;
  }

  return mins;
});
*/

export const baseSkills = derived(
  [attributes, chosenTraits, taggedSkills],
  ([attrs, traits, tagged]) => {
    const base: SkillSet = {
      [Skill.Barter]: 4 * attrs[Special.Charisma],
      [Skill.BigGuns]: 2 * attrs[Special.Agility],
      [Skill.Doctor]:
        5 + attrs[Special.Perception] + attrs[Special.Intelligence],
      [Skill.EnergyWeapons]: 2 * attrs[Special.Agility],
      [Skill.FirstAid]:
        2 * (attrs[Special.Perception] + attrs[Special.Intelligence]),
      [Skill.Gambling]: 5 * attrs[Special.Luck],
      [Skill.LockPick]: 10 + attrs[Special.Perception] + attrs[Special.Agility],
      [Skill.MeleeWeapons]:
        20 + 2 * (attrs[Special.Strength] + attrs[Special.Agility]),
      [Skill.Outdoorsman]:
        2 * (attrs[Special.Endurance] + attrs[Special.Intelligence]),
      [Skill.Repair]: 3 * attrs[Special.Intelligence],
      [Skill.Science]: 4 * attrs[Special.Intelligence],
      [Skill.SmallGuns]: 5 + 4 * attrs[Special.Agility],
      [Skill.Sneak]: 5 + 3 * attrs[Special.Agility],
      [Skill.Speech]: 5 * attrs[Special.Charisma],
      [Skill.Steal]: 3 * attrs[Special.Agility],
      [Skill.Throwing]: 4 * attrs[Special.Agility],
      [Skill.Traps]: 10 + attrs[Special.Perception] + attrs[Special.Agility],
      [Skill.Unarmed]:
        30 + 2 * (attrs[Special.Agility] + attrs[Special.Strength])
    };

    if (traits.includes(Trait.GoodNatured)) {
      base[Skill.FirstAid] += 15;
      base[Skill.Doctor] += 15;
      base[Skill.Speech] += 15;
      base[Skill.Barter] += 15;

      for (const combatSkill of Object.values(CombatSkill)) {
        base[combatSkill] -= 10;
      }
    }

    if (traits.includes(Trait.Gifted)) {
      for (const skill of Object.values(Skill)) {
        base[skill] -= 10;
      }
    }

    for (const taggedSkill of tagged) {
      base[taggedSkill] += 20;
    }

    return base;
  }
);
