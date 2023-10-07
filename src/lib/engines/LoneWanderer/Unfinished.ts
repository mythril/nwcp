import type { ObjectValues } from '$lib/typeUtils';
import { defaultValuesOf } from '$lib/utils';
import type { IPackingDescriptor } from '../BitPacking';
import { AbstractUnfinishedCharacter } from '../UnfinishedCharacter';
import { Role, type Attributes, Special, Sex } from '../all';
import { OrderedDescriptors } from './codec';
import { Difficulty, DerivedStat, Skill, Trait, AilmentStatus } from './data';

export class UnfinishedLoneWanderer extends AbstractUnfinishedCharacter<
  typeof Trait,
  typeof Skill,
  typeof Difficulty,
  typeof DerivedStat,
  typeof AilmentStatus
> {
  minAge = 19;
  maxAge = 19;
  _traits: Set<ObjectValues<typeof Trait>> = new Set();
  _tagged: Set<ObjectValues<typeof Skill>> = new Set();
  _difficulty: ObjectValues<typeof Difficulty> & {} = Difficulty.Normal;
  role: ObjectValues<typeof Role> & {} = Role.LoneWanderer;
  age = 19;
  readonly roleHasDifficultySetting = false;
  difficultyInfo = Difficulty;
  skillInfo = Skill;
  traitInfo = Trait;
  derivedStatInfo = DerivedStat;
  ailmentStatusInfo = AilmentStatus;
  readonly roleHasTraits = false;
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

  _skillReactorsByStat: Record<
    ObjectValues<typeof Special>,
    ObjectValues<typeof Skill>[]
  > = {
    [Special.Strength]: [],
    [Special.Perception]: [],
    [Special.Endurance]: [],
    [Special.Charisma]: [],
    [Special.Intelligence]: [],
    [Special.Agility]: [],
    [Special.Luck]: []
  };

  _derivedReactorsByStat: Record<
    ObjectValues<typeof Special>,
    ObjectValues<typeof DerivedStat>[]
  > = {
    [Special.Strength]: [],
    [Special.Perception]: [],
    [Special.Endurance]: [],
    [Special.Charisma]: [],
    [Special.Intelligence]: [],
    [Special.Agility]: [],
    [Special.Luck]: []
  };

  _skillReactor = (
    attr: ObjectValues<typeof Special> & {},
    skill: ObjectValues<typeof Skill> & {}
  ) => {
    this._skillReactorsByStat[attr].push(skill);
    this._skillReactorsByStat[Special.Luck].push(skill);
    return () => {
      const tagged = this.hasTagged(skill) ? 15 : 0;

      this.baseSkills[skill] =
        2 +
        this.displayAttributes[attr] * 2 +
        Math.ceil(this.displayAttributes[Special.Luck] / 2) +
        tagged;
    };
  };

  maxHitPoints = 0;

  _maxHPReactor = () => {
    this.maxHitPoints =
      90 + 20 * this.displayAttributes[Special.Endurance] + 1 * 10;
  };

  _skillReactors = {
    [Skill.Barter]: this._skillReactor(Special.Charisma, Skill.Barter),
    [Skill.BigGuns]: this._skillReactor(Special.Endurance, Skill.BigGuns),
    [Skill.EnergyWeapons]: this._skillReactor(
      Special.Perception,
      Skill.EnergyWeapons
    ),
    [Skill.Explosives]: this._skillReactor(
      Special.Perception,
      Skill.Explosives
    ),
    [Skill.LockPick]: this._skillReactor(Special.Perception, Skill.LockPick),
    [Skill.Medicine]: this._skillReactor(Special.Intelligence, Skill.Medicine),
    [Skill.MeleeWeapons]: this._skillReactor(
      Special.Strength,
      Skill.MeleeWeapons
    ),
    [Skill.Repair]: this._skillReactor(Special.Intelligence, Skill.Repair),
    [Skill.Science]: this._skillReactor(Special.Intelligence, Skill.Science),
    [Skill.SmallGuns]: this._skillReactor(Special.Agility, Skill.SmallGuns),
    [Skill.Sneak]: this._skillReactor(Special.Agility, Skill.Sneak),
    [Skill.Speech]: this._skillReactor(Special.Charisma, Skill.Speech),
    [Skill.Unarmed]: this._skillReactor(Special.Endurance, Skill.Unarmed)
  };

  get difficulty() {
    return this._difficulty;
  }

  set difficulty(d: ObjectValues<typeof Difficulty>) {
    this._difficulty = d;
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
    d += doMore();
    if (d > 10) {
      s = 10 - d + s;
      d = 10;
    }
    this.displayAttributes[k] = d;
    for (const skill of this._skillReactorsByStat[k]) {
      this._skillReactors[skill]();
    }
    for (const derived of this._derivedReactorsByStat[k]) {
      this._derivedStatReactors[derived]();
    }
    return s;
  }

  _specialReactors = {
    [Special.Strength]: (s: number | undefined = undefined) => {
      this._Strength = this._specialReactor(s, Special.Strength);
    },
    [Special.Perception]: (s: number | undefined = undefined) => {
      this._Perception = this._specialReactor(s, Special.Perception);
    },
    [Special.Endurance]: (s: number | undefined = undefined) => {
      this._Endurance = this._specialReactor(s, Special.Endurance);
      this._maxHPReactor();
    },
    [Special.Charisma]: (s: number | undefined = undefined) => {
      this._Charisma = this._specialReactor(s, Special.Charisma);
    },
    [Special.Intelligence]: (s: number | undefined = undefined) => {
      this._Intelligence = this._specialReactor(s, Special.Intelligence);
    },
    [Special.Agility]: (s: number | undefined = undefined) => {
      this._Agility = this._specialReactor(s, Special.Agility);
    },
    [Special.Luck]: (s: number | undefined = undefined) => {
      this._Luck = this._specialReactor(s, Special.Luck);
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
    attr: ObjectValues<typeof Special> & {},
    fn: (attr: number) => string,
    stat: ObjectValues<typeof DerivedStat> & {}
  ) => {
    this._derivedReactorsByStat[attr].push(stat);
    return () => {
      this.derivedStatsDisplay[stat] = fn(this.displayAttributes[attr]);
    };
  };

  _derivedStatReactors = {
    [DerivedStat.ActionPoints]: this._derivedStatReactor(
      Special.Agility,
      (agility) => {
        return '' + (65 + agility * 2);
      },
      DerivedStat.ActionPoints
    ),
    [DerivedStat.CarryWeight]: this._derivedStatReactor(
      Special.Strength,
      (strength) => {
        return '' + (150 + strength * 10);
      },
      DerivedStat.CarryWeight
    ),
    [DerivedStat.CriticalChance]: this._derivedStatReactor(
      Special.Luck,
      (luck) => {
        return luck + '%';
      },
      DerivedStat.CriticalChance
    ),
    [DerivedStat.DamageRes]: this._derivedStatReactor(
      Special.Strength,
      (_attrs) => '0%',
      DerivedStat.DamageRes
    ),
    [DerivedStat.FireRes]: this._derivedStatReactor(
      Special.Strength,
      (_attrs) => '0%',
      DerivedStat.FireRes
    ),
    [DerivedStat.MeleeDamage]: this._derivedStatReactor(
      Special.Strength,
      (strength) => {
        return '' + strength * 0.5;
      },
      DerivedStat.MeleeDamage
    ),
    [DerivedStat.PoisonRes]: this._derivedStatReactor(
      Special.Endurance,
      (endurance) => {
        return (endurance - 1) * 5 + '%';
      },
      DerivedStat.PoisonRes
    ),
    [DerivedStat.RadiationRes]: this._derivedStatReactor(
      Special.Endurance,
      (endurance) => {
        return (endurance - 1) * 2 + '%';
      },
      DerivedStat.RadiationRes
    ),
    [DerivedStat.SkillRate]: this._derivedStatReactor(
      Special.Intelligence,
      (intelligence) => {
        return 10 + intelligence + '';
      },
      DerivedStat.SkillRate
    ),
    [DerivedStat.UnarmedDamage]: this._derivedStatReactor(
      Special.Endurance,
      (_endurance) => {
        return Math.ceil((10 + this.baseSkills.Unarmed) / 20) + '';
      },
      DerivedStat.UnarmedDamage
    )
  };

  reactToSkill(skill: ObjectValues<typeof Skill>): void {
    this._skillReactors[skill]();
    if (skill === Skill.Unarmed) {
      this._derivedStatReactors[DerivedStat.UnarmedDamage]();
    }
  }

  reactToAllSkills(): void {
    for (const skill of Object.values(Skill)) {
      this._skillReactors[skill]();
    }
  }

  _traitReactors = {};

  reactToTrait(_trait: ObjectValues<typeof Trait>): void {
    // intentional
  }

  reactToAllTraits(): void {
    // intentional
  }

  toJSON() {
    return {
      name: this.name,
      role: this.role,
      age: this.age,
      sex: this.sex,
      difficulty: this.difficulty,
      tagged: this.taggedAsArray().sort(),
      traits: this.traitsAsArray().sort(),
      [Special.Strength]: this._Strength,
      [Special.Perception]: this._Perception,
      [Special.Endurance]: this._Endurance,
      [Special.Charisma]: this._Charisma,
      [Special.Intelligence]: this._Intelligence,
      [Special.Agility]: this._Agility,
      [Special.Luck]: this._Luck
    };
  }

  getPackingDescriptors(): IPackingDescriptor[] {
    return OrderedDescriptors;
  }

  _shufflePackingDescriptors(
    shuffler: (pd: IPackingDescriptor[]) => void
  ): void {
    shuffler(OrderedDescriptors);
  }

  /* should probably look to the reactive store instead of the model */
  _reset(): void {
    this.name = '';
    this.sex = Sex.Male;
    Object.assign(this, ...Object.values(Special).map((a) => ({ [a]: 5 })));
    this.difficulty = Difficulty.Normal;
    this.clearTraits();
    this.clearTagged();
  }
}
