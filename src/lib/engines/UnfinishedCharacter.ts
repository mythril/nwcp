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
  abstract readonly hasDifficultySetting: boolean;
  abstract difficultyInfo: D;
  abstract difficulty: ObjectValues<D>;

  abstract readonly hasTraits: boolean;
  abstract traitInfo: T;
  abstract traits: ObjectValues<T>[];

  abstract tagged: ObjectValues<S>[];
  abstract skillInfo: S;
  abstract displayAttributes: Attributes;
  abstract baseSkills: Record<ObjectValues<S>, number>;
  abstract maxHitPoints: number;
  abstract derivedStatsDisplay: Record<ObjectValues<DS>, string>;

  get charPointsRemaining() {
    let cpr = 40;
    console.log(this.Strength);
    for (let key of Object.values(Special)) {
      console.log(this[key]);
      cpr -= this[key];
    }
    console.log(cpr);
    return cpr;
  }

  abstract reset(): void;
}
