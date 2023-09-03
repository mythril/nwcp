import type { ObjectValues } from '$lib/typeUtils';
import { assert } from 'tsafe';
import { Role, type Attributes, Sex } from '../all';
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
  Pilot: 'Pilot',
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
  NightPerson: 'Night Person',
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

export class UnfinishedWarrior extends AbstractUnfinishedCharacter<
  typeof Trait,
  typeof Skill,
  typeof Difficulty,
  typeof DerivedStat
> {
  traits: ((ObjectValues<typeof Trait> & {}) | undefined)[] = [];
  tagged: ((ObjectValues<typeof Skill> & {}) | undefined)[] = [];
  difficulty: ObjectValues<typeof Difficulty> & {} = Difficulty.Normal;
  role: ObjectValues<typeof Role> & {} = Role.Warrior;
  readonly hasDifficultySetting = true;
  difficultyInfo = Difficulty;
  skillInfo = Skill;
  traitInfo = Trait;
  readonly hasTraits = true;
  displayAttributes(): Attributes {
    return this.attributes;
  }
  baseSkills(): Record<ObjectValues<typeof Skill>, number> {
    return Object.assign({}, ...Object.keys(Skill).map((a) => ({ [a]: 0 })));
  }
  maxHitPoints(): number {
    return Infinity;
  }
  derivedStatsDisplay(): Record<ObjectValues<typeof DerivedStat>, string> {
    return Object.assign(
      {},
      ...Object.keys(DerivedStat).map((a) => ({ [a]: '' }))
    );
  }
  reset(): void {
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
