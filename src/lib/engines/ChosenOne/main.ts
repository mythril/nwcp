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

const GoodNaturedPositiveSkills = [
  Skill.FirstAid,
  Skill.Doctor,
  Skill.Speech,
  Skill.Barter
];

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

const noOp = () => {
  //intentional
};

export class UnfinishedChosenOne extends AbstractUnfinishedCharacter<
  typeof Trait,
  typeof Skill,
  typeof Difficulty,
  typeof DerivedStat
> {
  _traits: Set<ObjectValues<typeof Trait>> = new Set();
  _tagged: Set<ObjectValues<typeof Skill>> = new Set();
  _difficulty: ObjectValues<typeof Difficulty> & {} = Difficulty.Normal;
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

  /* should probably look to the reactive store instead of the model */
  constructor() {
    super();
  }

  baseSkills: Record<ObjectValues<typeof Skill>, number> = defaultValuesOf(
    Skill,
    0
  );

  _skillReactor = (
    fn: (dal: Attributes) => number,
    skill: ObjectValues<typeof Skill> & {}
  ) => {
    return () => {
      const tagged = this.hasTagged(skill) ? 20 : 0;
      let goodNatured: -10 | 0 | 15 = 0;
      if (this.hasTrait(Trait.GoodNatured)) {
        if (includes(GoodNaturedPositiveSkills, skill)) {
          goodNatured = 15;
        }
        if (includes(Object.values(CombatSkill), skill)) {
          goodNatured = -10;
        }
      }
      let difficultyMod: -10 | 0 | 20 = 0;
      if (
        includes(Object.values(PassiveSkill), skill) ||
        includes(Object.values(ActiveSkill), skill)
      ) {
        switch (this._difficulty) {
          case Difficulty.Easy:
            difficultyMod = 20;
            break;
          case Difficulty.Hard:
            difficultyMod = -10;
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

  _maxHPReactor = () => {
    this.maxHitPoints =
      15 + this[Special.Strength] + 2 * this[Special.Endurance];
  };

  _skillReactors = {
    [Skill.Barter]: this._skillReactor(
      (attrs) => 4 * attrs[Special.Charisma],
      Skill.Barter
    ),
    [Skill.BigGuns]: this._skillReactor(
      (attrs) => 2 * attrs[Special.Agility],
      Skill.BigGuns
    ),
    [Skill.Doctor]: this._skillReactor(
      (attrs) => 5 + attrs[Special.Perception] + attrs[Special.Intelligence],
      Skill.Doctor
    ),
    [Skill.EnergyWeapons]: this._skillReactor(
      (attrs) => 2 * attrs[Special.Agility],
      Skill.EnergyWeapons
    ),
    [Skill.FirstAid]: this._skillReactor(
      (attrs) => 2 * (attrs[Special.Perception] + attrs[Special.Intelligence]),
      Skill.FirstAid
    ),
    [Skill.Gambling]: this._skillReactor(
      (attrs) => 5 * attrs[Special.Luck],
      Skill.Gambling
    ),
    [Skill.LockPick]: this._skillReactor(
      (attrs) => 10 + attrs[Special.Perception] + attrs[Special.Agility],
      Skill.LockPick
    ),
    [Skill.MeleeWeapons]: this._skillReactor(
      (attrs) => 20 + 2 * (attrs[Special.Strength] + attrs[Special.Agility]),
      Skill.MeleeWeapons
    ),
    [Skill.Outdoorsman]: this._skillReactor(
      (attrs) => 2 * (attrs[Special.Endurance] + attrs[Special.Intelligence]),
      Skill.Outdoorsman
    ),
    [Skill.Repair]: this._skillReactor(
      (attrs) => 3 * attrs[Special.Intelligence],
      Skill.Repair
    ),
    [Skill.Science]: this._skillReactor(
      (attrs) => 4 * attrs[Special.Intelligence],
      Skill.Science
    ),
    [Skill.SmallGuns]: this._skillReactor(
      (attrs) => 5 + 4 * attrs[Special.Agility],
      Skill.SmallGuns
    ),
    [Skill.Sneak]: this._skillReactor(
      (attrs) => 5 + 3 * attrs[Special.Agility],
      Skill.Sneak
    ),
    [Skill.Steal]: this._skillReactor(
      (attrs) => 3 * attrs[Special.Agility],
      Skill.Steal
    ),
    [Skill.Throwing]: this._skillReactor(
      (attrs) => 4 * attrs[Special.Agility],
      Skill.Throwing
    ),
    [Skill.Speech]: this._skillReactor(
      (attrs) => 5 * attrs[Special.Charisma],
      Skill.Speech
    ),
    [Skill.Traps]: this._skillReactor(
      (attrs) => 10 + attrs[Special.Perception] + attrs[Special.Agility],
      Skill.Traps
    ),

    [Skill.Unarmed]: this._skillReactor(
      (attrs) => 30 + 2 * (attrs[Special.Agility] + attrs[Special.Strength]),
      Skill.Unarmed
    )
  };

  get difficulty() {
    return this._difficulty;
  }

  set difficulty(d: ObjectValues<typeof Difficulty>) {
    this._difficulty = d;
    for (const skill of [
      ...Object.values(PassiveSkill),
      ...Object.values(ActiveSkill)
    ]) {
      this._skillReactors[skill]();
    }
  }

  _specialReactor(
    s: number | undefined,
    k: ObjectValues<typeof Special>,
    doMore: () => number = () => 0
  ) {
    if (typeof s === 'undefined') {
      s = this[`_${k}`];
    }
    let d = s;
    if (this.hasTrait(Trait.Gifted)) {
      d += 1;
    }
    d += doMore();
    if (d > 10) {
      s = 10 - d + s;
      d = 10;
    }
    this.displayAttributes[k] = d;
    return s;
  }

  _specialReactors = {
    [Special.Strength]: (s: number | undefined = undefined) => {
      this._Strength = this._specialReactor(s, Special.Strength, () => {
        return this.hasTrait(Trait.Bruiser) ? 2 : 0;
      });
      this._skillReactors[Skill.MeleeWeapons]();
      this._skillReactors[Skill.Unarmed]();
      this._derivedStatReactors[DerivedStat.CarryWeight]();
      this._derivedStatReactors[DerivedStat.MeleeDamage]();
      this._maxHPReactor();
    },
    [Special.Perception]: (s: number | undefined = undefined) => {
      this._Perception = this._specialReactor(s, Special.Perception);
      this._skillReactors[Skill.Doctor]();
      this._skillReactors[Skill.FirstAid]();
      this._skillReactors[Skill.LockPick]();
      this._skillReactors[Skill.Traps]();
      this._derivedStatReactors[DerivedStat.Sequence]();
    },
    [Special.Endurance]: (s: number | undefined = undefined) => {
      this._Endurance = this._specialReactor(s, Special.Endurance);
      this._skillReactors[Skill.Outdoorsman]();
      this._derivedStatReactors[DerivedStat.DamageRes]();
      this._derivedStatReactors[DerivedStat.HealingRate]();
      this._derivedStatReactors[DerivedStat.PoisonRes]();
      this._derivedStatReactors[DerivedStat.RadiationRes]();
      this._maxHPReactor();
    },
    [Special.Charisma]: (s: number | undefined = undefined) => {
      this._Charisma = this._specialReactor(s, Special.Charisma);
      this._skillReactors[Skill.Barter]();
      this._skillReactors[Skill.Speech]();
    },
    [Special.Intelligence]: (s: number | undefined = undefined) => {
      this._Intelligence = this._specialReactor(s, Special.Intelligence);
      this._skillReactors[Skill.Doctor]();
      this._skillReactors[Skill.FirstAid]();
      this._skillReactors[Skill.Outdoorsman]();
      this._skillReactors[Skill.Science]();
      this._skillReactors[Skill.Repair]();
    },
    [Special.Agility]: (s: number | undefined = undefined) => {
      this._Agility = this._specialReactor(s, Special.Agility, () => {
        return this.hasTrait(Trait.SmallFrame) ? 1 : 0;
      });
      this._skillReactors[Skill.BigGuns]();
      this._skillReactors[Skill.EnergyWeapons]();
      this._skillReactors[Skill.LockPick]();
      this._skillReactors[Skill.MeleeWeapons]();
      this._skillReactors[Skill.SmallGuns]();
      this._skillReactors[Skill.Sneak]();
      this._skillReactors[Skill.Steal]();
      this._skillReactors[Skill.Throwing]();
      this._skillReactors[Skill.Unarmed]();
      this._derivedStatReactors[DerivedStat.ArmorClass]();
      this._derivedStatReactors[DerivedStat.ActionPoints]();
    },
    [Special.Luck]: (s: number | undefined = undefined) => {
      this._Luck = this._specialReactor(s, Special.Luck);
      this._skillReactors[Skill.Gambling]();
      this._derivedStatReactors[DerivedStat.CriticalChance]();
    }
  };

  get Strength() {
    return this._Strength;
  }
  set Strength(s: number) {
    this._specialReactors[Special.Strength](s);
  }
  get Perception() {
    return this._Perception;
  }
  set Perception(s: number) {
    this._specialReactors[Special.Perception](s);
  }
  get Endurance() {
    return this._Endurance;
  }
  set Endurance(s: number) {
    this._specialReactors[Special.Endurance](s);
  }
  get Charisma() {
    return this._Charisma;
  }
  set Charisma(s: number) {
    this._specialReactors[Special.Charisma](s);
  }
  get Intelligence() {
    return this._Intelligence;
  }
  set Intelligence(s: number) {
    this._specialReactors[Special.Intelligence](s);
  }
  get Agility() {
    return this._Agility;
  }
  set Agility(s: number) {
    this._specialReactors[Special.Agility](s);
  }
  get Luck() {
    return this._Luck;
  }
  set Luck(s: number) {
    this._specialReactors[Special.Luck](s);
  }

  derivedStatsDisplay: Record<ObjectValues<typeof DerivedStat>, string> =
    defaultValuesOf(DerivedStat, '');

  _derivedStatReactor = (
    fn: (dal: Attributes) => string,
    stat: ObjectValues<typeof DerivedStat> & {}
  ) => {
    return () => {
      this.derivedStatsDisplay[stat] = fn(this.displayAttributes);
    };
  };

  _derivedStatReactors = {
    [DerivedStat.ActionPoints]: this._derivedStatReactor((attrs) => {
      return (
        '' +
        (5 +
          Math.floor(attrs[Special.Agility] / 2) +
          (this.hasTrait(Trait.Bruiser) ? -2 : 0))
      );
    }, DerivedStat.ActionPoints),
    [DerivedStat.ArmorClass]: this._derivedStatReactor((attrs) => {
      return '' + (this.hasTrait(Trait.Kamikaze) ? 0 : attrs[Special.Agility]);
    }, DerivedStat.ArmorClass),
    [DerivedStat.CarryWeight]: this._derivedStatReactor((attrs) => {
      return (
        '' +
        (25 +
          (this.hasTrait(Trait.SmallFrame) ? 15 : 25) * attrs[Special.Strength])
      );
    }, DerivedStat.CarryWeight),
    [DerivedStat.CriticalChance]: this._derivedStatReactor((attrs) => {
      return (
        '' +
        (attrs[Special.Luck] + (this.hasTrait(Trait.Finesse) ? 10 : 0)) +
        '%'
      );
    }, DerivedStat.CriticalChance),
    [DerivedStat.DamageRes]: this._derivedStatReactor(() => {
      return '' + 0 + '%';
    }, DerivedStat.DamageRes),
    [DerivedStat.HealingRate]: this._derivedStatReactor((attrs) => {
      return (
        '' +
        (Math.floor(attrs[Special.Endurance] / 3) +
          (this.hasTrait(Trait.FastMetabolism) ? 2 : 0))
      );
    }, DerivedStat.HealingRate),
    [DerivedStat.MeleeDamage]: this._derivedStatReactor((attrs) => {
      return (
        '' +
        (Math.max(attrs[Special.Strength] - 5, 1) +
          (this.hasTrait(Trait.HeavyHanded) ? 4 : 0))
      );
    }, DerivedStat.MeleeDamage),
    [DerivedStat.PoisonRes]: this._derivedStatReactor((attrs) => {
      return (
        '' +
        (this.hasTrait(Trait.FastMetabolism)
          ? 0
          : attrs[Special.Endurance] * 5) +
        '%'
      );
    }, DerivedStat.PoisonRes),
    [DerivedStat.RadiationRes]: this._derivedStatReactor((attrs) => {
      return (
        '' +
        (this.hasTrait(Trait.FastMetabolism)
          ? 0
          : attrs[Special.Endurance] * 2) +
        '%'
      );
    }, DerivedStat.RadiationRes),
    [DerivedStat.Sequence]: this._derivedStatReactor((attrs) => {
      return (
        '' +
        (2 * attrs[Special.Perception] +
          (this.hasTrait(Trait.Kamikaze) ? 5 : 0))
      );
    }, DerivedStat.Sequence)
  };

  reactToSkill(skill: ObjectValues<typeof Skill>): void {
    this._skillReactors[skill]();
  }

  reactToAllSkills(): void {
    for (const skill of Object.values(Skill)) {
      this._skillReactors[skill]();
    }
  }

  _traitReactors = {
    [Trait.BloodyMess]: noOp,
    [Trait.Bruiser]: () => {
      this._specialReactors[Special.Strength]();
      this._derivedStatReactors[DerivedStat.ActionPoints]();
    },
    [Trait.ChemReliant]: noOp,
    [Trait.ChemResistant]: noOp,
    [Trait.FastMetabolism]: () => {
      this._derivedStatReactors[DerivedStat.HealingRate]();
      this._derivedStatReactors[DerivedStat.PoisonRes]();
      this._derivedStatReactors[DerivedStat.RadiationRes]();
    },
    [Trait.FastShot]: () => {
      this._derivedStatReactors[DerivedStat.ActionPoints]();
    },
    [Trait.Finesse]: () => {
      this._derivedStatReactors[DerivedStat.CriticalChance]();
    },
    [Trait.Gifted]: () => {
      for (const special of Object.values(Special)) {
        this._specialReactors[special]();
      }
    },
    [Trait.GoodNatured]: () => {
      for (const skill of GoodNaturedPositiveSkills) {
        this._skillReactors[skill]();
      }
      for (const skill of Object.values(CombatSkill)) {
        this._skillReactors[skill]();
      }
    },
    [Trait.HeavyHanded]: () => {
      this._derivedStatReactors[DerivedStat.MeleeDamage]();
      this._derivedStatReactors[DerivedStat.CriticalChance]();
    },
    [Trait.Jinxed]: noOp,
    [Trait.Kamikaze]: () => {
      this._derivedStatReactors[DerivedStat.Sequence]();
      this._derivedStatReactors[DerivedStat.ArmorClass]();
    },
    [Trait.SmallFrame]: () => {
      this._specialReactors[Special.Agility]();
      this._derivedStatReactors[DerivedStat.CarryWeight]();
    },
    [Trait.OneHander]: noOp,
    [Trait.SexAppeal]: noOp,
    [Trait.Skilled]: noOp
  };

  reactToTrait(trait: ObjectValues<typeof Trait>): void {
    this._traitReactors[trait]();
  }

  reactToAllTraits(): void {
    for (const trait of Object.values(Trait)) {
      this._traitReactors[trait]();
    }
  }

  /* should probably look to the reactive store instead of the model */
  _reset(): void {
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
