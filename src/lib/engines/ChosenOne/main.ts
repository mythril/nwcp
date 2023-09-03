import type { ObjectValues } from '$lib/typeUtils';
import { assert, objectKeys } from 'tsafe';
import { Role, type Attributes, Special, Sex } from '../all';
import type { HasHelpEntriesForEvery } from '../help';
import { AbstractUnfinishedCharacter } from '../UnfinishedCharacter';

export const CombatSkill = {
  SmallGuns: 'Small Guns',
  BigGuns: 'Big Guns',
  EnergyWeapons: 'Energy Weapons',
  Unarmed: 'Unarmed',
  MeleeWeapons: 'Melee Weapons',
  Throwing: 'Throwing'
} as const;

export const ActiveSkill = {
  FirstAid: 'First Aid',
  Doctor: 'Doctor',
  Sneak: 'Sneak',
  LockPick: 'Lockpick',
  Steal: 'Steal',
  Traps: 'Traps',
  Science: 'Science',
  Repair: 'Repair'
} as const;

export const PassiveSkill = {
  Speech: 'Speech',
  Barter: 'Barter',
  Gambling: 'Gambling',
  Outdoorsman: 'Outdoorsman'
} as const;

export const Skill = {
  ...CombatSkill,
  ...ActiveSkill,
  ...PassiveSkill
} as const;

export type SkillSet = Record<ObjectValues<typeof Skill>, number>;
export type TaggedSkills = ObjectValues<typeof Skill>[];

// type error below indicates that not all values in
// Skills are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof Skill>>();

export const Trait = {
  FastMetabolism: 'Fast Metabolism',
  Bruiser: 'Bruiser',
  SmallFrame: 'Small Frame',
  OneHander: 'One Hander',
  Finesse: 'Finesse',
  Kamikaze: 'Kamikaze',
  HeavyHanded: 'Heavy Handed',
  FastShot: 'Fast Shot',
  BloodyMess: 'Bloody Mess',
  Jinxed: 'Jinxed',
  GoodNatured: 'Good Natured',
  ChemReliant: 'Chem Reliant',
  ChemResistant: 'Chem Resistant',
  SexAppeal: 'Sex Appeal',
  Skilled: 'Skilled',
  Gifted: 'Gifted'
} as const;

export type ChosenTraits = (ObjectValues<typeof Trait> & {})[];

// type error below indicates that not all values in
// Traits are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof Trait>>();

export const AilmentStatus = {
  Poisoned: 'Poisoned',
  Radiated: 'Radiated',
  EyeDamage: 'Eye Damage',
  CrippledRightArm: 'Crippled Right Arm',
  CrippledLeftArm: 'Crippled Left Arm',
  CrippledRightLeg: 'Crippled Right Leg',
  CrippledLeftLeg: 'Crippled Left Leg'
} as const;

// type error below indicates that not all values in
// AilmentStatus are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof AilmentStatus>>();

export const DerivedStat = {
  ArmorClass: 'Armor Class',
  ActionPoints: 'Action Points',
  CarryWeight: 'Carry Weight',
  MeleeDamage: 'Melee Damage',
  DamageRes: 'Damage Res.',
  PoisonRes: 'Poison Res.',
  RadiationRes: 'Radiation Res.',
  Sequence: 'Sequence',
  HealingRate: 'Healing Rate',
  CriticalChance: 'Critical Chance'
} as const;

export type DerivedStats = Record<ObjectValues<typeof DerivedStat>, number>;

// type error below indicates that not all values in
// DerivedStats are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof DerivedStat>>();

export const Difficulty = {
  Easy: 'Easy',
  Normal: 'Normal',
  Hard: 'Hard'
} as const;

export class UnfinishedChosenOne extends AbstractUnfinishedCharacter<
  typeof Trait,
  typeof Skill,
  typeof Difficulty,
  typeof DerivedStat
> {
  traits: (ObjectValues<typeof Trait> & {})[] = [];
  tagged: (ObjectValues<typeof Skill> & {})[] = [];
  difficulty: ObjectValues<typeof Difficulty> & {} = Difficulty.Normal;
  role: ObjectValues<typeof Role> & {} = Role.ChosenOne;
  readonly hasDifficultySetting = true;
  difficultyInfo = Difficulty;
  skillInfo = Skill;
  traitInfo = Trait;
  readonly hasTraits = true;
  displayAttributes(): Attributes {
    const display: Attributes = { ...this.attributes };
    const corrections: Attributes = { ...this.attributes };

    if (this.traits.includes(Trait.Bruiser)) {
      display[Special.Strength] += 2;
    }

    if (this.traits.includes(Trait.Gifted)) {
      for (const attr of Object.values(Special)) {
        display[attr] += 1;
      }
    }

    if (this.traits.includes(Trait.SmallFrame)) {
      display[Special.Agility] += 1;
    }

    let correctionsNeeded = false;
    for (const attr of Object.values(Special)) {
      if (display[attr] > 10) {
        corrections[attr] =
          corrections[attr] - (display[attr] - corrections[attr]);
        correctionsNeeded = true;
      }
    }

    if (correctionsNeeded) {
      // TODO figure out how to trigger a reactive update here
      this.attributes = corrections;
    }

    return display;
  }

  baseSkills(): Record<ObjectValues<typeof Skill>, number> {
    const attrs = this.attributes;
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

    if (this.traits.includes(Trait.GoodNatured)) {
      base[Skill.FirstAid] += 15;
      base[Skill.Doctor] += 15;
      base[Skill.Speech] += 15;
      base[Skill.Barter] += 15;

      for (const combatSkill of Object.values(CombatSkill)) {
        base[combatSkill] -= 10;
      }
    }

    if (this.traits.includes(Trait.Gifted)) {
      for (const skill of Object.values(Skill)) {
        base[skill] -= 10;
      }
    }

    for (const taggedSkill of this.tagged) {
      if (taggedSkill === undefined) {
        continue;
      }
      base[taggedSkill] += 20;
    }

    {
      let bonus: number;
      switch (this.difficulty) {
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

  maxHitPoints(): number {
    return (
      15 +
      this.attributes[Special.Strength] +
      2 * this.attributes[Special.Endurance]
    );
  }

  derivedStatsDisplay(): Record<ObjectValues<typeof DerivedStat>, string> {
    const attrs = this.attributes;
    const traits = this.traits;
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

    const displayStats: Record<ObjectValues<typeof DerivedStat>, string> = {
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

    for (const stat of objectKeys(stats)) {
      displayStats[stat] = stats[stat].toString();
    }

    displayStats[DerivedStat.DamageRes] += '%';
    displayStats[DerivedStat.PoisonRes] += '%';
    displayStats[DerivedStat.RadiationRes] += '%';
    displayStats[DerivedStat.CriticalChance] += '%';

    return displayStats;
  }

  reset(): void {
    // TODO figure out how to trigger a reactive update here
    this.age = 25;
    this.name = '';
    this.sex = Sex.Male;
    this.attributes = Object.assign(
      {},
      ...Object.keys(this.attributes).map((a) => ({ [a]: 5 }))
    );
    this.difficulty = Difficulty.Normal;
    this.traits = [];
    this.tagged = [];
  }
}
