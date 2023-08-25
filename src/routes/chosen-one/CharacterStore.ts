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
  DerivedStat,
  Difficulty,
  PassiveSkill,
  ActiveSkill,
  type UnfinishedChar
} from '$lib/engines/ChosenOne/main';
import type { ObjectValues } from '$lib/typeUtils';
import { Role } from '$lib/engines/all';
import { derived, get, writable } from 'svelte/store';

export const difficulty = writable<ObjectValues<typeof Difficulty> & {}>(
  Difficulty.Normal
);

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
export const sex = writable<ObjectValues<typeof Sex> & {}>(Sex.Male);
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
      attributes.set(attrs);
    }

    return display;
  }
);

export const baseSkills = derived(
  [displayAttributes, chosenTraits, taggedSkills, difficulty],
  ([attrs, traits, tagged, diff]) => {
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

    {
      let bonus: number;
      switch (diff) {
        case Difficulty.Easy:
          bonus = 20;
          break;
        case Difficulty.Normal:
          bonus = 0;
          break;
        case Difficulty.Hard:
          bonus = -10;
          break;
      }
      for (const k of Object.values(ActiveSkill)) {
        base[k] += bonus;
      }
      for (const k of Object.values(PassiveSkill)) {
        base[k] += bonus;
      }
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

export const loadFromChar = (char: UnfinishedChar) => {
  name.set(char.name);
  age.set(char.age);
  sex.set(char.sex);
  //$attributes
  const temp: Attributes = {
    [Special.Strength]: 0,
    [Special.Perception]: 0,
    [Special.Endurance]: 0,
    [Special.Charisma]: 0,
    [Special.Intelligence]: 0,
    [Special.Agility]: 0,
    [Special.Luck]: 0
  };
  for (const key of objectKeys(get(attributes))) {
    temp[key] = char.attributes[key];
  }
  attributes.set(temp);
  const isTrait = (
    item: ObjectValues<typeof Trait> | undefined
  ): item is ObjectValues<typeof Trait> => {
    return !!item;
  };
  chosenTraits.set(char.traits.filter(isTrait));
  const isTaggedSkill = (
    item: ObjectValues<typeof Skill> | undefined
  ): item is ObjectValues<typeof Skill> => {
    return !!item;
  };
  taggedSkills.set(char.tagged.filter(isTaggedSkill));
};

export const resetCharacter = () => {
  loadFromChar({
    age: 25,
    role: Role.ChosenOne,
    difficulty: Difficulty.Normal,
    name: '',
    sex: Sex.Male,
    tagged: [],
    attributes: {
      [Special.Strength]: 5,
      [Special.Perception]: 5,
      [Special.Endurance]: 5,
      [Special.Charisma]: 5,
      [Special.Intelligence]: 5,
      [Special.Agility]: 5,
      [Special.Luck]: 5
    },
    traits: []
  });
};
