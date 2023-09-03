import type { ObjectValues } from '$lib/typeUtils';
import type { UnfinishedChosenOne } from './ChosenOne/main';
import type { UnfinishedVaultDweller } from './VaultDweller/main';
import type { UnfinishedWarrior } from './Warrior/main';
import { Sex, type Role, type Attributes } from './all';

export type UnfinishedCharacter =
  | UnfinishedVaultDweller
  | UnfinishedChosenOne
  | UnfinishedWarrior;

export abstract class AbstractUnfinishedCharacter<
  T extends Record<keyof T, ObjectValues<T>>,
  S extends Record<keyof S, ObjectValues<S>>,
  D extends Record<keyof D, ObjectValues<D>>,
  DS extends Record<keyof DS, ObjectValues<DS>>
> {
  abstract readonly role: ObjectValues<typeof Role> & {};
  name = '';
  age = 0;
  sex: ObjectValues<typeof Sex> & {} = Sex.Male;
  attributes: Attributes = {
    Strength: 0,
    Perception: 0,
    Endurance: 0,
    Charisma: 0,
    Intelligence: 0,
    Agility: 0,
    Luck: 0
  };
  abstract readonly hasDifficultySetting: boolean;
  abstract difficultyInfo: D;
  abstract difficulty: ObjectValues<D>;

  abstract readonly hasTraits: boolean;
  abstract traitInfo: T;
  abstract traits: ObjectValues<T>[];

  abstract tagged: ObjectValues<S>[];
  abstract skillInfo: S;
  abstract displayAttributes(): Attributes;
  abstract baseSkills(): Record<ObjectValues<S>, number>;
  abstract maxHitPoints(): number;
  abstract derivedStatsDisplay(): Record<ObjectValues<DS>, string>;
  charPointsRemaining(): number {
    const cpr = Object.values(this.attributes).reduce((a, b) => a + b, 0);
    return 40 - cpr;
  }
  abstract reset(): void;
}
