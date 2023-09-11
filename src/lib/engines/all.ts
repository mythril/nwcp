import type { ObjectValues } from '$lib/typeUtils';
import { assert } from 'tsafe';
import type { HasHelpEntriesForEvery } from './help';

export const Role = {
  None: 'None',
  VaultDweller: 'Vault Dweller',
  ChosenOne: 'Chosen One',
  Warrior: 'Warrior',
  LoneWanderer: 'Lone Wanderer',
  Courier: 'Courier'
} as const;

export const RoleToSequel: { [key in ObjectValues<typeof Role>]: string } = {
  [Role.None]: '',
  [Role.VaultDweller]: '1',
  [Role.ChosenOne]: '2',
  [Role.Warrior]: 'T',
  [Role.LoneWanderer]: '3',
  [Role.Courier]: 'NV'
} as const;

export const SupportedRoles: { [key in ObjectValues<typeof Role>]: boolean } = {
  [Role.None]: true,
  [Role.VaultDweller]: true,
  [Role.ChosenOne]: true,
  [Role.Warrior]: false,
  [Role.LoneWanderer]: false,
  [Role.Courier]: false
} as const;

export const RoleRoutes: { [key in ObjectValues<typeof Role>]: string } = {
  [Role.None]: '/',
  [Role.VaultDweller]: '/vault-dweller',
  [Role.ChosenOne]: '/chosen-one',
  [Role.Warrior]: '/warrior',
  [Role.LoneWanderer]: '/lone-wanderer',
  [Role.Courier]: '/courier'
} as const;

export const Special = {
  Strength: 'Strength',
  Perception: 'Perception',
  Endurance: 'Endurance',
  Charisma: 'Charisma',
  Intelligence: 'Intelligence',
  Agility: 'Agility',
  Luck: 'Luck'
} as const;

type TBidiRoleChronoLookup = Record<ObjectValues<typeof Role>, number> &
  Record<number, ObjectValues<typeof Role>>;

export const BidiRoleChronoLookup: TBidiRoleChronoLookup = {
  0: Role.VaultDweller,
  [Role.VaultDweller]: 0,

  1: Role.ChosenOne,
  [Role.ChosenOne]: 1,

  2: Role.Warrior,
  [Role.Warrior]: 2,

  3: Role.LoneWanderer,
  [Role.LoneWanderer]: 3,

  4: Role.Courier,
  [Role.Courier]: 4,

  [NaN]: Role.None,
  [Role.None]: NaN
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

export const Sex = {
  Male: 'Male',
  Female: 'Female'
} as const;
