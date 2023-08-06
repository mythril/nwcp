import type { ObjectValues } from '$lib/utils';
import { assert, type Equals } from 'tsafe';
import type { CharacterHelpLookup } from './help';

type HelpKeys = keyof typeof CharacterHelpLookup;

export const Special = {
  Strength: 'Strength',
  Perception: 'Perception',
  Endurance: 'Endurance',
  Charisma: 'Charisma',
  Intelligence: 'Intelligence',
  Agility: 'Agility',
  Luck: 'Luck'
} as const;

export type SPECIAL = ObjectValues<typeof Special>;

// ensures there are help entries for each attribute
type SpecialHelp = Extract<HelpKeys, SPECIAL>;
assert<Equals<SpecialHelp, SPECIAL>>();

export function SpecialAbbreviation(special: SPECIAL): string {
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

export type Attributes = Record<SPECIAL, number>;

export const CombatSkills = {
  SmallGuns: 'Small Guns',
  BigGuns: 'Big Guns',
  EnergyWeapons: 'Energy Weapons',
  Unarmed: 'Unarmed',
  MeleeWeapons: 'Melee Weapons',
  Throwing: 'Throwing'
} as const;

export const ActiveSkills = {
  FirstAid: 'First Aid',
  Doctor: 'Doctor',
  Sneak: 'Sneak',
  LockPick: 'Lockpick',
  Steal: 'Steal',
  Traps: 'Traps',
  Science: 'Science',
  Repair: 'Repair'
} as const;

export const PassiveSkills = {
  Speech: 'Speech',
  Barter: 'Barter',
  Gambling: 'Gambling',
  Outdoorsman: 'Outdoorsman'
} as const;

export const Skills = {
  ...CombatSkills,
  ...ActiveSkills,
  ...PassiveSkills
} as const;

export type SKILLS = ObjectValues<typeof Skills>;
export type SkillSet = Record<SKILLS, number>;

// ensures there are help entries for each skill
type SkillsHelp = Extract<HelpKeys, SKILLS>;
assert<Equals<SkillsHelp, SKILLS>>();

export const Traits = {
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

export type TRAITS = ObjectValues<typeof Traits>;
export type TraitSet = Map<TRAITS, boolean>;

// ensures there are help entries for each trait
type TraitsHelp = Extract<HelpKeys, TRAITS>;
assert<Equals<TraitsHelp, TRAITS>>();

export const AilmentStatus = {
  Poisoned: 'Poisoned',
  Radiated: 'Radiated',
  EyeDamage: 'Eye Damage',
  CrippledRightArm: 'Crippled Right Arm',
  CrippledLeftArm: 'Crippled Left Arm',
  CrippledRightLeg: 'Crippled Right Leg',
  CrippledLeftLeg: 'Crippled Left Leg'
} as const;

export type AILMENT_STATUSES = ObjectValues<typeof AilmentStatus>;

// ensures there are help entries for each ailment status
type AilmentHelp = Extract<HelpKeys, AILMENT_STATUSES>;
assert<Equals<AilmentHelp, AILMENT_STATUSES>>();

type DerivedStatsEnum = { [key: string]: HelpKeys };

export const DerivedStats: DerivedStatsEnum = {
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

export type DERIVED_STATS = ObjectValues<typeof DerivedStats>;

// ensures there are help entries for each derived stat entry
type DerivedStatsHelp = Extract<HelpKeys, DERIVED_STATS>;
assert<Equals<DerivedStatsHelp, DERIVED_STATS>>();

export const Sex = {
  Male: 'Male',
  Female: 'Female'
} as const;

export type SEX = ObjectValues<typeof Sex>;
