import type { ObjectValues } from '$lib/typeUtils';
import { assert } from 'tsafe';
import type { HasHelpEntriesForEvery } from '../help';

export const Skill = {
  Barter: 'Barter',
  Guns: 'Guns',
  EnergyWeapons: 'Energy Weapons',
  Explosives: 'Explosives',
  LockPick: 'Lockpick',
  Medicine: 'Medicine',
  MeleeWeapons: 'Melee Weapons',
  Repair: 'Repair',
  Science: 'Science',
  Sneak: 'Sneak',
  Speech: 'Speech',
  Survival: 'Survival',
  Unarmed: 'Unarmed'
} as const;

export const GoodNaturedPositiveSkills = [
  Skill.Speech,
  Skill.Medicine,
  Skill.Repair,
  Skill.Science,
  Skill.Barter
] as const;

export const GoodNaturedNegativeSkills = [
  Skill.EnergyWeapons,
  Skill.Explosives,
  Skill.Guns,
  Skill.MeleeWeapons,
  Skill.Unarmed
] as const;

// type error below indicates that not all values in
// Skills are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof Skill>>();

export const BaseTrait = {
  BuiltToDestroy: 'Built To Destroy',
  FastShot: 'Fast Shot',
  FourEyes: 'Four Eyes',
  GoodNatured: 'Good Natured',
  HeavyHanded: 'Heavy Handed',
  Kamikaze: 'Kamikaze',
  LooseCannon: 'Loose Cannon',
  SmallFrame: 'Small Frame',
  TriggerDiscipline: 'Trigger Discipline',
  WildWasteland: 'Wild Wasteland'
} as const;

export const OldWorldBluesTrait = {
  Claustrophobia: 'Claustrophobia',
  EarlyBird: 'Early Bird',
  Hoarder: 'Hoarder',
  HotBlooded: 'Hot Blooded',
  LogansLoophole: "Logan's Loophole",
  Skilled: 'Skilled'
} as const;

export const Trait = { ...BaseTrait, ...OldWorldBluesTrait } as const;

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
  CompanionNerve: 'Companion Nerve',
  CarryWeight: 'Carry Weight',
  CriticalChance: 'Critical Chance',
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
