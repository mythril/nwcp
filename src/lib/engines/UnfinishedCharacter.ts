import type { ObjectValues } from '$lib/typeUtils';
import type { IPackingDescriptor } from './BitPacking';
import { Sex, Role, type Attributes, Special } from './all';
import type { CharacterHelpLookup } from './help';

interface ITrait {
  [key: string]: keyof typeof CharacterHelpLookup;
}

interface ISkill {
  [key: string]: keyof typeof CharacterHelpLookup;
}

interface IDifficulty {
  [key: string]: string; // this has no help entries, and doesn't need any
}

interface IDerivedStat {
  [key: string]: keyof typeof CharacterHelpLookup;
}

export interface SerializedUnfinishedCharacter
  extends Record<ObjectValues<typeof Special>, number> {
  role: ObjectValues<typeof Role> & {};
  name: string;
  age?: number;
  sex: ObjectValues<typeof Sex> & {};
  difficulty: ObjectValues<IDifficulty>;
  tagged: ObjectValues<ISkill>[];
  traits?: ObjectValues<ITrait>[];
}

export abstract class AbstractSerializedUnfinishedCharacter<
  T extends ITrait,
  S extends ISkill,
  D extends IDifficulty
> implements SerializedUnfinishedCharacter
{
  abstract role: ObjectValues<typeof Role> & {};
  abstract name: string;
  abstract age?: number;
  abstract [Special.Strength]: number;
  abstract [Special.Perception]: number;
  abstract [Special.Endurance]: number;
  abstract [Special.Charisma]: number;
  abstract [Special.Intelligence]: number;
  abstract [Special.Agility]: number;
  abstract [Special.Luck]: number;
  abstract sex: ObjectValues<typeof Sex> & {};
  abstract difficulty: ObjectValues<D>;
  abstract tagged: ObjectValues<S>[];
  abstract traits?: ObjectValues<T>[];
}

export interface UnfinishedCharacter
  extends Record<ObjectValues<typeof Special>, number> {
  readonly role: ObjectValues<typeof Role> & {};
  name: string;

  readonly ageIsReadOnly: boolean;
  age: number;
  sex: ObjectValues<typeof Sex> & {};

  readonly roleHasDifficultySetting: boolean;
  difficultyInfo: IDifficulty;
  difficulty: ObjectValues<IDifficulty>;

  readonly roleHasTraits: boolean;
  traitInfo: ITrait;
  _traits: Set<ObjectValues<ITrait>>;
  reactToTrait(trait: ObjectValues<ITrait>): void;
  reactToAllTraits(): void;
  hasTrait(trait: ObjectValues<ITrait>): boolean;
  addTrait(trait: ObjectValues<ITrait>): void;
  deleteTrait(trait: ObjectValues<ITrait>): void;
  clearTraits(): void;
  traitCount(): number;
  traitsAsArray(): ObjectValues<ITrait>[];

  _tagged: Set<ObjectValues<ISkill>>;
  reactToSkill(skill: ObjectValues<ISkill>): void;
  reactToAllSkills(): void;
  hasTagged(tagged: ObjectValues<ISkill>): boolean;
  addTagged(tagged: ObjectValues<ISkill>): void;
  deleteTagged(tagged: ObjectValues<ISkill>): void;
  clearTagged(): void;
  taggedCount(): number;
  taggedAsArray(): ObjectValues<ISkill>[];

  skillInfo: ISkill;
  displayAttributes: Attributes;
  baseSkills: Partial<Record<ObjectValues<ISkill>, number>>;
  maxHitPoints: number;
  derivedStatsDisplay: Partial<Record<ObjectValues<IDerivedStat>, string>>;
  derivedStatInfo: IDerivedStat;

  charPointsRemaining: number;

  /* should probably look to the reactive store instead of the model */
  _reset(): void;

  toJSON(): SerializedUnfinishedCharacter;
  getPackingDescriptors(): IPackingDescriptor[];

  /* this is just for testing the robustness of the packing algorithm */
  _shufflePackingDescriptors(
    shuffler: (pd: IPackingDescriptor[]) => void
  ): void;
}

export abstract class AbstractUnfinishedCharacter<
  T extends ITrait,
  S extends ISkill,
  D extends IDifficulty,
  DS extends IDerivedStat
> implements UnfinishedCharacter
{
  abstract readonly role: ObjectValues<typeof Role> & {};
  name = '';
  ageIsReadOnly = false;
  age = 0;
  sex: ObjectValues<typeof Sex> & {} = Sex.Male;

  abstract displayAttributes: Attributes;
  _Strength = 0;
  get Strength() {
    return this.displayAttributes[Special.Strength];
  }
  set Strength(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Strength = s;
  }
  _Perception = 0;
  get Perception() {
    return this.displayAttributes[Special.Perception];
  }
  set Perception(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Perception = s;
  }
  _Endurance = 0;
  get Endurance() {
    return this.displayAttributes[Special.Endurance];
  }
  set Endurance(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Endurance = s;
  }
  _Charisma = 0;
  get Charisma() {
    return this.displayAttributes[Special.Charisma];
  }
  set Charisma(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Charisma = s;
  }
  _Intelligence = 0;
  get Intelligence() {
    return this.displayAttributes[Special.Intelligence];
  }
  set Intelligence(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Intelligence = s;
  }
  _Agility = 0;
  get Agility() {
    return this.displayAttributes[Special.Agility];
  }
  set Agility(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Agility = s;
  }
  _Luck = 0;
  get Luck() {
    return this.displayAttributes[Special.Luck];
  }
  set Luck(s: number) {
    if (s > 10) {
      s = 10;
    }
    this._Luck = s;
  }

  constructor() {
    /* should probably look to the reactive store instead of the model */
    // intentionally empty
  }

  getConstructor() {
    return this.constructor;
  }

  abstract readonly roleHasDifficultySetting: boolean;
  abstract difficultyInfo: D;
  abstract _difficulty: ObjectValues<D>;
  abstract get difficulty(): ObjectValues<D>;
  abstract set difficulty(s: ObjectValues<D>);

  abstract readonly roleHasTraits: boolean;
  abstract traitInfo: T;
  abstract _traits: Set<ObjectValues<T>>;
  abstract reactToTrait(trait: ObjectValues<T>): void;
  abstract reactToAllTraits(): void;
  hasTrait(trait: ObjectValues<T>) {
    return this._traits.has(trait);
  }
  addTrait(trait: ObjectValues<T>) {
    this._traits.add(trait);
    this.reactToTrait(trait);
  }
  deleteTrait(trait: ObjectValues<T>) {
    this._traits.delete(trait);
    this.reactToTrait(trait);
  }
  clearTraits() {
    this._traits.clear();
    this.reactToAllTraits();
  }
  traitCount() {
    return this._traits.size;
  }
  traitsAsArray() {
    return [...this._traits];
  }

  abstract _tagged: Set<ObjectValues<S>>;
  abstract reactToSkill(skill: ObjectValues<S>): void;
  abstract reactToAllSkills(): void;
  hasTagged(tagged: ObjectValues<S>) {
    return this._tagged.has(tagged);
  }
  addTagged(tagged: ObjectValues<S>) {
    this._tagged.add(tagged);
    this.reactToSkill(tagged);
  }
  deleteTagged(tagged: ObjectValues<S>) {
    this._tagged.delete(tagged);
    this.reactToSkill(tagged);
  }
  clearTagged() {
    this._tagged.clear();
    this.reactToAllSkills();
  }
  taggedCount() {
    return this._tagged.size;
  }
  taggedAsArray() {
    return [...this._tagged];
  }

  abstract skillInfo: S;
  abstract baseSkills: Record<ObjectValues<S>, number>;
  abstract maxHitPoints: number;
  abstract derivedStatsDisplay: Record<ObjectValues<DS>, string>;
  abstract derivedStatInfo: IDerivedStat;

  get charPointsRemaining() {
    let cpr = 40;
    for (const key of Object.values(Special)) {
      cpr -= this[key];
    }
    return cpr;
  }

  abstract toJSON(): AbstractSerializedUnfinishedCharacter<T, S, D>;

  abstract getPackingDescriptors(): IPackingDescriptor[];
  abstract _shufflePackingDescriptors(
    shuffler: (pd: IPackingDescriptor[]) => void
  ): void;

  /* should probably look to the reactive store instead of the model */
  abstract _reset(): void;
}
