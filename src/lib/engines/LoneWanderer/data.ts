import { assert } from 'tsafe';
import type { HasHelpEntriesForEvery } from '../help';

export const Skill = {
  Barter: 'Barter',
  BigGuns: 'Big Guns',
  EnergyWeapons: 'Energy Weapons',
  Explosives: 'Explosives',
  LockPick: 'Lockpick',
  Medicine: 'Medicine',
  MeleeWeapons: 'Melee Weapons',
  Repair: 'Repair',
  Science: 'Science',
  SmallGuns: 'Small Guns',
  Sneak: 'Sneak',
  Speech: 'Speech',
  Unarmed: 'Unarmed'
} as const;

// type error below indicates that not all values in
// Skills are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof Skill>>();

export const Trait = {} as const;

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
  ActionPoints: 'Action Points',
  CarryWeight: 'Carry Weight',
  CriticalChance: 'Critical Chance',
  DamageRes: 'Damage Res.',
  FireRes: 'Fire Res.',
  MeleeDamage: 'Melee Damage',
  PoisonRes: 'Poison Res.',
  RadiationRes: 'Radiation Res.',
  SkillRate: 'Skill Rate',
  UnarmedDamage: 'Unarmed Damage'
} as const;

// type error below indicates that not all values in
// DerivedStats are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof DerivedStat>>();

export const Difficulty = {
  Normal: 'Normal'
} as const;
