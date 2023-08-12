import { writable, derived } from 'svelte/store';
import { CharacterHelpLookup } from '$lib/engines/help';
import { PerkHelpLookup } from '$lib/engines/perks';
import { objectKeys } from 'tsafe/objectKeys';
import {
  Special,
  type Attributes,
  Sex,
  type ChosenTraits,
  type TaggedSkills,
  type SkillSet,
  Skill,
  Trait,
  CombatSkill,
  type DerivedStats,
  DerivedStat
} from '$lib/engines/ChosenOne/main';
import type { ObjectValues } from '$lib/typeUtils';
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

export const charPointsRemaining = derived(attributes, (attrs) => {
  const cpr = Object.values(attrs).reduce((a, b) => a + b, 0);
  return 40 - cpr;
});

export const displayAttributes = derived(
  [attributes, chosenTraits],
  ([attrs, traits]) => {
    const display: Attributes = { ...attrs };

    if (traits.includes(Trait.Bruiser)) {
      display[Special.Strength] += 2;
    }

    if (traits.includes(Trait.Gifted)) {
      for (const attr of Object.values(Special)) {
        display[attr] += 1;
      }
    }

    if (traits.includes(Trait.SmallFrame)) {
      display[Special.Agility] += 1;
    }

    let correctionsNeeded = false;
    for (const attr of Object.values(Special)) {
      if (display[attr] > 10) {
        attrs[attr] = attrs[attr] - (display[attr] - attrs[attr]);
        correctionsNeeded = true;
      }
    }

    if (correctionsNeeded) {
      // setTimeout(() => {
      attributes.set(attrs);
      // }, 1);
    }

    return display;
  }
);

export const baseSkills = derived(
  [displayAttributes, chosenTraits, taggedSkills],
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

export const maxHitPoints = derived(attributes, (attrs) => {
  return 15 + attrs[Special.Strength] + 2 * attrs[Special.Endurance];
});

export const derivedStatsReal = derived(
  [displayAttributes, chosenTraits],
  ([attrs, traits]) => {
    const stats: DerivedStats = {
      [DerivedStat.ActionPoints]:
        5 +
        Math.floor(attrs[Special.Agility] / 2) +
        (traits.includes(Trait.Bruiser) ? -2 : 0),
      [DerivedStat.ArmorClass]: traits.includes(Trait.Kamikaze)
        ? 0
        : attrs[Special.Agility],
      [DerivedStat.CarryWeight]:
        25 +
        (traits.includes(Trait.SmallFrame) ? 15 : 25) * attrs[Special.Strength],
      [DerivedStat.CriticalChance]:
        attrs[Special.Luck] + (traits.includes(Trait.Finesse) ? 10 : 0),
      [DerivedStat.DamageRes]: 0,
      [DerivedStat.HealingRate]:
        Math.floor(attrs[Special.Endurance] / 3) +
        (traits.includes(Trait.FastMetabolism) ? 2 : 0),
      [DerivedStat.MeleeDamage]:
        Math.max(attrs[Special.Strength] - 5, 1) +
        (traits.includes(Trait.HeavyHanded) ? 4 : 0),
      [DerivedStat.PoisonRes]: traits.includes(Trait.FastMetabolism)
        ? 0
        : attrs[Special.Endurance] * 5,
      [DerivedStat.RadiationRes]: traits.includes(Trait.FastMetabolism)
        ? 0
        : attrs[Special.Endurance] * 2,
      [DerivedStat.Sequence]:
        2 * attrs[Special.Perception] +
        (traits.includes(Trait.Kamikaze) ? 5 : 0)
    };
    return stats;
  }
);

export const derivedStatsDisplay = derived(derivedStatsReal, (derivedStats) => {
  const stats: { [key in ObjectValues<typeof DerivedStat>]: string } = {
    [DerivedStat.ActionPoints]: '',
    [DerivedStat.ArmorClass]: '',
    [DerivedStat.CarryWeight]: '',
    [DerivedStat.CriticalChance]: '',
    [DerivedStat.DamageRes]: '',
    [DerivedStat.HealingRate]: '',
    [DerivedStat.MeleeDamage]: '',
    [DerivedStat.PoisonRes]: '',
    [DerivedStat.RadiationRes]: '',
    [DerivedStat.Sequence]: ''
  };

  for (const stat of objectKeys(derivedStats)) {
    stats[stat] = derivedStats[stat].toString();
  }

  stats[DerivedStat.DamageRes] += '%';
  stats[DerivedStat.PoisonRes] += '%';
  stats[DerivedStat.RadiationRes] += '%';
  stats[DerivedStat.CriticalChance] += '%';

  return stats;
});
