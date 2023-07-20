import { CharacterHelpLookup } from './help';
import { PerkHelpLookup } from './perks';

// ensures there are help entries for each attribute
type SpecialEnum = { [key: string]: keyof typeof HelpLookup };

export const Special: SpecialEnum = {
  Strength: 'Strength',
  Perception: 'Perception',
  Endurance: 'Endurance',
  Charisma: 'Charisma',
  Intelligence: 'Intelligence',
  Agility: 'Agility',
  Luck: 'Luck'
} as const;

type ObjectValues<T> = T[keyof T];
export type SPECIAL = ObjectValues<typeof Special>;

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

export type Attributes = Map<SPECIAL, number>;

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

// ensures there are help entries for each skill
type SkillsEnum = { [key: string]: keyof typeof HelpLookup };

export const Skills: SkillsEnum = {
  ...CombatSkills,
  ...ActiveSkills,
  ...PassiveSkills
} as const;
export type SKILLS = ObjectValues<typeof Skills>;
export type SkillSet = Map<SKILLS, number>;

// ensures there are help entries for each trait
type TraitsEnum = { [key: string]: keyof typeof HelpLookup };

export const Traits: TraitsEnum = {
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

type AilmentStatusEnum = { [key: string]: keyof typeof HelpLookup };

export const AilmentStatus: AilmentStatusEnum = {
  Poisoned: 'Poisoned',
  Radiated: 'Radiated',
  EyeDamage: 'Eye Damage',
  CrippledRightArm: 'Crippled Right Arm',
  CrippledLeftArm: 'Crippled Left Arm',
  CrippledRightLeg: 'Crippled Right Leg',
  CrippledLeftLeg: 'Crippled Left Leg'
};

type DerivedStatsEnum = { [key: string]: keyof typeof HelpLookup };

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
};

export const HelpLookup = { ...CharacterHelpLookup, ...PerkHelpLookup };
