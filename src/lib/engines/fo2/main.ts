import type { ObjectValues } from '$lib/utils';
import { assert, type Equals } from 'tsafe';
import type { CharacterHelpLookup } from '../help';
import type { Game } from '../all';

type HasHelpEntriesForEvery<T> = Equals<
  Extract<keyof typeof CharacterHelpLookup, ObjectValues<T>>,
  ObjectValues<T>
>;

export const Special = {
  Strength: 'Strength',
  Perception: 'Perception',
  Endurance: 'Endurance',
  Charisma: 'Charisma',
  Intelligence: 'Intelligence',
  Agility: 'Agility',
  Luck: 'Luck'
} as const;

// type error below indicates that not all values in
// Special are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof Special>>();

export function SpecialAbbreviation(
  special: ObjectValues<typeof Special>
): string {
  switch (special) {
    case Special.Strength:
      return 'ST';
    case Special.Perception:
      return 'PE';
    case Special.Endurance:
      return 'EN';
    case Special.Charisma:
      return 'CH';
    case Special.Intelligence:
      return 'IN';
    case Special.Agility:
      return 'AG';
    case Special.Luck:
      return 'LK';
    default:
      return '';
  }
}

export type Attributes = Record<ObjectValues<typeof Special>, number>;

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

export type TraitSet = Map<ObjectValues<typeof Trait>, boolean>;

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

// type error below indicates that not all values in
// DerivedStats are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof DerivedStat>>();

export const Sex = {
  Male: 'Male',
  Female: 'Female'
} as const;


export type LVL1Character = {
  game: (ObjectValues<typeof Game> & {}),
  name: string,
  age: number,
  sex: (ObjectValues<typeof Sex> & {}),
  attributes: Attributes,
  traits: (ObjectValues<typeof Trait> & {} | undefined)[],
  tagged: (ObjectValues<typeof Skill> & {} | undefined)[]
};

