import type { ObjectValues } from '$lib/typeUtils';
import { assert } from 'tsafe';
import { Role, type Attributes, Special, Sex } from '../all';
import type { HasHelpEntriesForEvery } from '../help';
import { AbstractUnfinishedCharacter } from '../UnfinishedCharacter';
import { defaultValuesOf, includes } from '$lib/utils';

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
  Speech: 'Speech',
  Barter: 'Barter',
  Gambling: 'Gambling',
  Outdoorsman: 'Outdoorsman'
} as const;

export const Skill = {
  ...CombatSkill,
  ...ActiveSkill,
  ...PassiveSkill
} as const;

export type SkillSet = Record<ObjectValues<typeof Skill>, number>;
export type TaggedSkills = ObjectValues<typeof Skill>[];

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
  SexAppeal: 'Sex Appeal',
  Skilled: 'Skilled',
  Gifted: 'Gifted'
} as const;

export type ChosenTraits = (ObjectValues<typeof Trait> & {})[];

// type error below indicates that not all values in
// Traits are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof Trait>>();

export const AilmentStatus = {
  Poisoned: 'Poisoned',
  Radiated: 'Radiated',
  EyeDamage: 'Eye Damage',
  CrippledRightArm: 'Crippled Right Arm',
  CrippledLeftArm: 'Crippled Left Arm',
  CrippledRightLeg: 'Crippled Right Leg',
  CrippledLeftLeg: 'Crippled Left Leg'
} as const;

// type error below indicates that not all values in
// AilmentStatus are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof AilmentStatus>>();

export const DerivedStat = {
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
} as const;

export type DerivedStats = Record<ObjectValues<typeof DerivedStat>, number>;

// type error below indicates that not all values in
// DerivedStats are represented in CharacterHelpLookup
// Could be a typo or missing help entry
assert<HasHelpEntriesForEvery<typeof DerivedStat>>();

export const Difficulty = {
  Easy: 'Easy',
  Normal: 'Normal',
  Hard: 'Hard'
} as const;

export class UnfinishedChosenOne extends AbstractUnfinishedCharacter<
  typeof Trait,
  typeof Skill,
  typeof Difficulty,
  typeof DerivedStat
> {
  _traits: Set<ObjectValues<typeof Trait>> = new Set();
  _tagged: Set<ObjectValues<typeof Skill>> = new Set();
  difficulty: ObjectValues<typeof Difficulty> & {} = Difficulty.Normal;
  role: ObjectValues<typeof Role> & {} = Role.ChosenOne;
  readonly roleHasDifficultySetting = true;
  difficultyInfo = Difficulty;
  skillInfo = Skill;
  traitInfo = Trait;
  readonly roleHasTraits = true;
  displayAttributes: Attributes = {
    Strength: this._Strength,
    Perception: this._Perception,
    Endurance: this._Endurance,
    Charisma: this._Charisma,
    Intelligence: this._Intelligence,
    Agility: this._Agility,
    Luck: this._Luck
  };

  #defaultDerivedAttribute(
    s: number,
    k: ObjectValues<typeof Special>,
    doMore: () => number = () => 0
  ) {
    let d = s;
    if (this.hasTrait(Trait.Gifted)) {
      d += 1;
    }
    d += doMore();
    if (d > 10) {
      s = 10 - d + s;
    }
    if (d < 1) {
      // debugger;
    }
    this.displayAttributes[k] = d;
    return s;
  }

  baseSkills: Record<ObjectValues<typeof Skill>, number> = defaultValuesOf(
    Skill,
    0
  );

  #sd = (
    fn: (dal: Attributes) => number,
    skill: ObjectValues<typeof Skill> & {}
  ) => {
    return () => {
      const tagged = this.hasTagged(skill) ? 20 : 0;
      let goodNatured = 0;
      if (this.hasTrait(Trait.GoodNatured)) {
        switch (skill) {
          case Skill.FirstAid:
          case Skill.Doctor:
          case Skill.Speech:
          case Skill.Barter:
            goodNatured += 15;
            break;
          case CombatSkill.BigGuns:
          case CombatSkill.EnergyWeapons:
          case CombatSkill.MeleeWeapons:
          case CombatSkill.SmallGuns:
          case CombatSkill.Throwing:
          case CombatSkill.Unarmed:
            goodNatured -= 10;
            break;
        }
      }
      let difficultyMod = 0;
      if (
        includes(Object.values(PassiveSkill), skill) ||
        includes(Object.values(ActiveSkill), skill)
      ) {
        switch (this.difficulty) {
          case Difficulty.Easy:
            difficultyMod += 20;
            break;
          case Difficulty.Hard:
            difficultyMod -= 10;
            break;
        }
      }

      const gifted = this.hasTrait(Trait.Gifted) ? -10 : 0;

      this.baseSkills[skill] =
        fn(this.displayAttributes) +
        tagged +
        goodNatured +
        gifted +
        difficultyMod;
    };
  };

  maxHitPoints = 0;

  #maxHPDeriver = () => {
    this.maxHitPoints =
      15 + this[Special.Strength] + 2 * this[Special.Endurance];
  };

  skillDerivers = {
    [Skill.Barter]: this.#sd(
      (attrs) => 4 * attrs[Special.Charisma],
      Skill.Barter
    ),
    [Skill.BigGuns]: this.#sd(
      (attrs) => 2 * attrs[Special.Agility],
      Skill.BigGuns
    ),
    [Skill.Doctor]: this.#sd(
      (attrs) => 5 + attrs[Special.Perception] + attrs[Special.Intelligence],
      Skill.Doctor
    ),
    [Skill.EnergyWeapons]: this.#sd(
      (attrs) => 2 * attrs[Special.Agility],
      Skill.EnergyWeapons
    ),
    [Skill.FirstAid]: this.#sd(
      (attrs) => 2 * (attrs[Special.Perception] + attrs[Special.Intelligence]),
      Skill.FirstAid
    ),
    [Skill.Gambling]: this.#sd(
      (attrs) => 5 * attrs[Special.Luck],
      Skill.Gambling
    ),
    [Skill.LockPick]: this.#sd(
      (attrs) => 10 + attrs[Special.Perception] + attrs[Special.Agility],
      Skill.LockPick
    ),
    [Skill.MeleeWeapons]: this.#sd(
      (attrs) => 20 + 2 * (attrs[Special.Strength] + attrs[Special.Agility]),
      Skill.MeleeWeapons
    ),
    [Skill.Outdoorsman]: this.#sd(
      (attrs) => 2 * (attrs[Special.Endurance] + attrs[Special.Intelligence]),
      Skill.Outdoorsman
    ),
    [Skill.Repair]: this.#sd(
      (attrs) => 3 * attrs[Special.Intelligence],
      Skill.Repair
    ),
    [Skill.Science]: this.#sd(
      (attrs) => 4 * attrs[Special.Intelligence],
      Skill.Science
    ),
    [Skill.SmallGuns]: this.#sd(
      (attrs) => 5 + 4 * attrs[Special.Agility],
      Skill.SmallGuns
    ),
    [Skill.Sneak]: this.#sd(
      (attrs) => 5 + 3 * attrs[Special.Agility],
      Skill.Sneak
    ),
    [Skill.Steal]: this.#sd((attrs) => 3 * attrs[Special.Agility], Skill.Steal),
    [Skill.Throwing]: this.#sd(
      (attrs) => 4 * attrs[Special.Agility],
      Skill.Throwing
    ),
    [Skill.Speech]: this.#sd(
      (attrs) => 5 * attrs[Special.Charisma],
      Skill.Speech
    ),
    [Skill.Traps]: this.#sd(
      (attrs) => 10 + attrs[Special.Perception] + attrs[Special.Agility],
      Skill.Traps
    ),

    [Skill.Unarmed]: this.#sd(
      (attrs) => 30 + 2 * (attrs[Special.Agility] + attrs[Special.Strength]),
      Skill.Unarmed
    )
  };

  get Strength() {
    return this._Strength;
  }
  set Strength(s: number) {
    this._Strength = this.#defaultDerivedAttribute(s, Special.Strength, () => {
      return this.hasTrait(Trait.Bruiser) ? 2 : 0;
    });
    this.skillDerivers[Skill.MeleeWeapons]();
    this.skillDerivers[Skill.Unarmed]();
    this.#maxHPDeriver();
  }
  get Perception() {
    return this._Perception;
  }
  set Perception(s: number) {
    this._Perception = this.#defaultDerivedAttribute(s, Special.Perception);
    this.skillDerivers[Skill.Doctor]();
    this.skillDerivers[Skill.FirstAid]();
    this.skillDerivers[Skill.LockPick]();
    this.skillDerivers[Skill.Traps]();
  }
  get Endurance() {
    return this._Endurance;
  }
  set Endurance(s: number) {
    this._Endurance = this.#defaultDerivedAttribute(s, Special.Endurance);
    this.skillDerivers[Skill.Outdoorsman]();
    this.#maxHPDeriver();
  }
  get Charisma() {
    return this._Charisma;
  }
  set Charisma(s: number) {
    this._Charisma = this.#defaultDerivedAttribute(s, Special.Charisma);
    this.skillDerivers[Skill.Barter]();
    this.skillDerivers[Skill.Speech]();
  }
  get Intelligence() {
    return this._Intelligence;
  }
  set Intelligence(s: number) {
    this._Intelligence = this.#defaultDerivedAttribute(s, Special.Intelligence);
    this.skillDerivers[Skill.Doctor]();
    this.skillDerivers[Skill.FirstAid]();
    this.skillDerivers[Skill.Outdoorsman]();
    this.skillDerivers[Skill.Science]();
    this.skillDerivers[Skill.Repair]();
  }
  get Agility() {
    return this._Agility;
  }
  set Agility(s: number) {
    this._Agility = this.#defaultDerivedAttribute(s, Special.Agility, () => {
      return this.hasTrait(Trait.SmallFrame) ? 1 : 0;
    });
    this.skillDerivers[Skill.BigGuns]();
    this.skillDerivers[Skill.EnergyWeapons]();
    this.skillDerivers[Skill.LockPick]();
    this.skillDerivers[Skill.MeleeWeapons]();
    this.skillDerivers[Skill.SmallGuns]();
    this.skillDerivers[Skill.Sneak]();
    this.skillDerivers[Skill.Steal]();
    this.skillDerivers[Skill.Throwing]();
    this.skillDerivers[Skill.Unarmed]();
  }
  get Luck() {
    return this._Luck;
  }
  set Luck(s: number) {
    this._Luck = this.#defaultDerivedAttribute(s, Special.Luck);
    this.skillDerivers[Skill.Gambling]();
  }

  derivedStatsDisplay: Record<ObjectValues<typeof DerivedStat>, string> =
    defaultValuesOf(DerivedStat, '');

  #dsd = (
    fn: (dal: Attributes) => string,
    stat: ObjectValues<typeof DerivedStat> & {}
  ) => {
    return () => {
      this.derivedStatsDisplay[stat] = fn(this.displayAttributes);
    };
  };

  statDerivers = {
    [DerivedStat.ActionPoints]: this.#dsd((attrs) => {
      return (
        '' +
        (5 +
          Math.floor(attrs[Special.Agility] / 2) +
          (this.hasTrait(Trait.Bruiser) ? -2 : 0))
      );
    }, DerivedStat.ActionPoints),
    [DerivedStat.ArmorClass]: this.#dsd((attrs) => {
      return '' + (this.hasTrait(Trait.Kamikaze) ? 0 : attrs[Special.Agility]);
    }, DerivedStat.ArmorClass),
    [DerivedStat.CarryWeight]: this.#dsd((attrs) => {
      return (
        '' +
        (25 +
          (this.hasTrait(Trait.SmallFrame) ? 15 : 25) * attrs[Special.Strength])
      );
    }, DerivedStat.CarryWeight),
    [DerivedStat.CriticalChance]: this.#dsd((attrs) => {
      return (
        '' +
        (attrs[Special.Luck] + (this.hasTrait(Trait.Finesse) ? 10 : 0)) +
        '%'
      );
    }, DerivedStat.CriticalChance),
    [DerivedStat.DamageRes]: this.#dsd(() => {
      return '' + 0 + '%';
    }, DerivedStat.DamageRes),
    [DerivedStat.HealingRate]: this.#dsd((attrs) => {
      return (
        '' +
        (Math.floor(attrs[Special.Endurance] / 3) +
          (this.hasTrait(Trait.FastMetabolism) ? 2 : 0))
      );
    }, DerivedStat.HealingRate),
    [DerivedStat.MeleeDamage]: this.#dsd((attrs) => {
      return (
        '' +
        (Math.max(attrs[Special.Strength] - 5, 1) +
          (this.hasTrait(Trait.HeavyHanded) ? 4 : 0))
      );
    }, DerivedStat.MeleeDamage),
    [DerivedStat.PoisonRes]: this.#dsd((attrs) => {
      return (
        '' +
        (this.hasTrait(Trait.FastMetabolism)
          ? 0
          : attrs[Special.Endurance] * 5) +
        '%'
      );
    }, DerivedStat.PoisonRes),
    [DerivedStat.RadiationRes]: this.#dsd((attrs) => {
      return (
        '' +
        (this.hasTrait(Trait.FastMetabolism)
          ? 0
          : attrs[Special.Endurance] * 2) +
        '%'
      );
    }, DerivedStat.RadiationRes),
    [DerivedStat.Sequence]: this.#dsd((attrs) => {
      return (
        '' +
        (2 * attrs[Special.Perception] +
          (this.hasTrait(Trait.Kamikaze) ? 5 : 0))
      );
    }, DerivedStat.Sequence)
  };

  reset(): void {
    // TODO figure out how to trigger a reactive update here
    this.age = 25;
    this.name = '';
    this.sex = Sex.Male;
    this.Strength = 5;
    Object.assign(this, ...Object.values(Special).map((a) => ({ [a]: 5 })));
    this.difficulty = Difficulty.Normal;
    this.clearTraits();
    this.clearTagged();
  }
}
