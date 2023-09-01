import type { ObjectValues } from '$lib/typeUtils';

export const Role = {
  VaultDweller: 'Vault Dweller',
  ChosenOne: 'Chosen One',
  Warrior: 'Warrior',
  LoneWanderer: 'Lone Wanderer',
  Courier: 'Courier'
} as const;

export const RoleToSequel: { [key in ObjectValues<typeof Role>]: string } = {
  [Role.VaultDweller]: '1',
  [Role.ChosenOne]: '2',
  [Role.Warrior]: 'T',
  [Role.LoneWanderer]: '3',
  [Role.Courier]: 'NV'
} as const;

export const SupportedRoles: { [key in ObjectValues<typeof Role>]: boolean } = {
  [Role.VaultDweller]: true,
  [Role.ChosenOne]: true,
  [Role.Warrior]: false,
  [Role.LoneWanderer]: false,
  [Role.Courier]: false
} as const;
