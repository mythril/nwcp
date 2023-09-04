import type { ObjectValues } from '$lib/typeUtils';
import type { UnfinishedChosenOne } from './ChosenOne/main';
import type { UnfinishedVaultDweller } from './VaultDweller/main';
import type { UnfinishedWarrior } from './Warrior/main';
import { Sex, type Role, type Attributes, Special } from './all';

// export type UnfinishedCharacter =
//   | UnfinishedVaultDweller
//   | UnfinishedChosenOne
//   | UnfinishedWarrior;
export type UnfinishedCharacter = UnfinishedChosenOne;

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
  _Strength = 0;
  get Strength() {
    return this._Strength;
  }
  set Strength(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Strength = s;
  }
  _Perception = 0;
  get Perception() {
    return this._Perception;
  }
  set Perception(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Perception = s;
  }
  _Endurance = 0;
  get Endurance() {
    return this._Endurance;
  }
  set Endurance(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Endurance = s;
  }
  _Charisma = 0;
  get Charisma() {
    return this._Charisma;
  }
  set Charisma(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Charisma = s;
  }
  _Intelligence = 0;
  get Intelligence() {
    return this._Intelligence;
  }
  set Intelligence(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Intelligence = s;
  }
  _Agility = 0;
  get Agility() {
    return this._Agility;
  }
  set Agility(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Agility = s;
  }
  _Luck = 0;
  get Luck() {
    return this._Luck;
  }
  set Luck(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Luck = s;
  }
  abstract readonly roleHasDifficultySetting: boolean;
  abstract difficultyInfo: D;
  abstract difficulty: ObjectValues<D>;

  abstract readonly roleHasTraits: boolean;
  abstract traitInfo: T;
  abstract _traits: Set<ObjectValues<T>>;
  hasTrait(trait: ObjectValues<T>) {
    return this._traits.has(trait);
  }
  addTrait(trait: ObjectValues<T>) {
    this._traits.add(trait);
  }
  deleteTrait(trait: ObjectValues<T>) {
    this._traits.delete(trait);
  }
  clearTraits() {
    this._traits.clear();
  }
  traitCount() {
    return this._traits.size;
  }
  traitsAsArray() {
    return [...this._traits];
  }

  abstract _tagged: Set<ObjectValues<S>>;
  hasTagged(tagged: ObjectValues<S>) {
    return this._tagged.has(tagged);
  }
  addTagged(tagged: ObjectValues<S>) {
    this._tagged.add(tagged);
  }
  deleteTagged(tagged: ObjectValues<S>) {
    this._tagged.delete(tagged);
  }
  clearTagged() {
    this._tagged.clear();
  }
  taggedCount() {
    return this._tagged.size;
  }
  taggedAsArray() {
    return [...this._tagged];
  }

  abstract skillInfo: S;
  abstract displayAttributes: Attributes;
  abstract baseSkills: Record<ObjectValues<S>, number>;
  abstract maxHitPoints: number;
  abstract derivedStatsDisplay: Record<ObjectValues<DS>, string>;

  get charPointsRemaining() {
    let cpr = 40;
    for (const key of Object.values(Special)) {
      cpr -= this[key];
    }
    return cpr;
  }

  abstract reset(): void;
}
