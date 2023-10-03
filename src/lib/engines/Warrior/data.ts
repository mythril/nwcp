import type { ObjectValues } from '$lib/typeUtils';
import { assert } from 'tsafe';
import type { HasHelpEntriesForEvery } from '../help';

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

export const GoodNaturedPositiveSkills = [
  Skill.Doctor,
  Skill.Barter,
  Skill.FirstAid
] as const;

export const OneHanderPositiveSkills = [
  Skill.SmallGuns,
  Skill.Throwing,
  Skill.Unarmed
] as const;

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

// type error below indicates that not all values in
// Traits are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof Trait>>();

export const AilmentStatus = {} as const;

// type error below indicates that not all values in
// AilmentStatus are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof AilmentStatus>>();

export const DerivedStat = {
  ArmorClass: 'Armor Class',
  MeleeDamage: 'Melee Damage',
  BonusDamage: 'Bonus Damage',
  DamageRes: 'Damage Res.',
  PoisonRes: 'Poison Res.',
  RadiationRes: 'Radiation Res.',
  ActionPoints: 'Action Points',
  CarryWeight: 'Carry Weight',
  HealingRate: 'Healing Rate',
  CriticalChance: 'Critical Chance',
  SkillRate: 'Skill Rate',
  PerkRate: 'Perk Rate'
} as const;

// type error below indicates that not all values in
// DerivedStats are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof DerivedStat>>();

export const Difficulty = {
  Easy: 'Easy',
  Normal: 'Normal',
  Hard: 'Hard'
} as const;
