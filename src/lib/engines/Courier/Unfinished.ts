import type { ObjectValues } from '$lib/typeUtils';
import { defaultValuesOf, includes } from '$lib/utils';
import type { IPackingDescriptor } from '../BitPacking';
import { AbstractUnfinishedCharacter } from '../UnfinishedCharacter';
import { Role, type Attributes, Special, Sex } from '../all';
import { OrderedDescriptors } from './codec';
import {
  Difficulty,
  DerivedStat,
  Skill,
  Trait,
  GoodNaturedPositiveSkills,
  GoodNaturedNegativeSkills
} from './data';
import { Help } from './help';

const noOp = () => {
  // intentional
};

export class UnfinishedCourier extends AbstractUnfinishedCharacter<
  typeof Trait,
  typeof Skill,
  typeof Difficulty,
  typeof DerivedStat,
  typeof Help
> {
  help = Help;
  minAge = 16;
  maxAge = 65;
  _traits: Set<ObjectValues<typeof Trait>> = new Set();
  _tagged: Set<ObjectValues<typeof Skill>> = new Set();
  _difficulty: ObjectValues<typeof Difficulty> & {} = Difficulty.Normal;
  role: ObjectValues<typeof Role> & {} = Role.Courier;
  age = 30;
  readonly roleHasDifficultySetting = false;
  difficultyInfo = Difficulty;
  skillInfo = Skill;
  traitInfo = Trait;
  derivedStatInfo = DerivedStat;
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
      let goodNatured: -5 | 0 | 5 = 0;
      const skilled: 0 | 5 = this.hasTrait(Trait.Skilled) ? 5 : 0;

      if (this.hasTrait(Trait.GoodNatured)) {
        if (includes(GoodNaturedPositiveSkills, skill)) {
          goodNatured = 5;
        }
        if (includes(GoodNaturedNegativeSkills, skill)) {
          goodNatured = -5;
        }
      }

      this.baseSkills[skill] =
        2 +
        this.displayAttributes[attr] * 2 +
        Math.ceil(this.displayAttributes[Special.Luck] / 2) +
        goodNatured +
        skilled +
        tagged;
    };
  };

  maxHitPoints = 0;

  _maxHPReactor = () => {
    this.maxHitPoints = 100 + 20 * this.displayAttributes[Special.Endurance];
    1 * 5;
  };

  _skillReactors = {
    [Skill.Barter]: this._skillReactor(Special.Charisma, Skill.Barter),
    [Skill.Guns]: this._skillReactor(Special.Agility, Skill.Guns),
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
    [Skill.Survival]: this._skillReactor(Special.Endurance, Skill.Survival),
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
      this._Perception = this._specialReactor(s, Special.Perception, () => {
        return this.hasTrait(Trait.FourEyes) ? -1 : 0;
      });
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
      this._Agility = this._specialReactor(s, Special.Agility, () => {
        return this.hasTrait(Trait.SmallFrame) ? 1 : 0;
      });
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
        const kamikaze = this.hasTrait(Trait.Kamikaze) ? 10 : 0;
        return '' + (65 + kamikaze + agility * 3);
      },
      DerivedStat.ActionPoints
    ),
    [DerivedStat.CarryWeight]: this._derivedStatReactor(
      Special.Strength,
      (strength) => {
        const hoarder = this.hasTrait(Trait.Hoarder) ? 25 : 0;
        return '' + (hoarder + 150 + strength * 10);
      },
      DerivedStat.CarryWeight
    ),
    [DerivedStat.CompanionNerve]: this._derivedStatReactor(
      Special.Charisma,
      (charisma) => {
        return charisma * 5 + '%';
      },
      DerivedStat.CompanionNerve
    ),
    [DerivedStat.CriticalChance]: this._derivedStatReactor(
      Special.Luck,
      (luck) => {
        const btdBonus = this.hasTrait(Trait.BuiltToDestroy) ? 3 : 0;
        return luck + btdBonus + '%';
      },
      DerivedStat.CriticalChance
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
        return endurance * 5 - 5 + '%';
      },
      DerivedStat.PoisonRes
    ),
    [DerivedStat.RadiationRes]: this._derivedStatReactor(
      Special.Endurance,
      (endurance) => {
        return endurance * 2 - 2 + '%';
      },
      DerivedStat.RadiationRes
    ),
    [DerivedStat.SkillRate]: this._derivedStatReactor(
      Special.Intelligence,
      (intelligence) => {
        return 10 + intelligence / 2 + '';
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

  _traitReactors: Record<ObjectValues<typeof Trait>, () => void> = {
    [Trait.BuiltToDestroy]: () => {
      this._derivedStatReactors[DerivedStat.CriticalChance]();
    },
    [Trait.FourEyes]: () => {
      this._specialReactors[Special.Perception]();
    },
    [Trait.GoodNatured]: () => {
      for (const skill of [
        ...GoodNaturedPositiveSkills,
        ...GoodNaturedNegativeSkills
      ]) {
        this._skillReactors[skill]();
      }
    },
    [Trait.Kamikaze]: () => {
      this._derivedStatReactors[DerivedStat.ActionPoints]();
    },
    [Trait.SmallFrame]: () => {
      this._specialReactors[Special.Agility]();
    },
    [Trait.Hoarder]: () => {
      this._derivedStatReactors[DerivedStat.CarryWeight]();
    },
    [Trait.Skilled]: () => {
      for (const skill of Object.values(Skill)) {
        this._skillReactors[skill]();
      }
    },
    [Trait.EarlyBird]: noOp,
    [Trait.Claustrophobia]: noOp,
    [Trait.FastShot]: noOp,
    [Trait.HeavyHanded]: noOp,
    [Trait.HotBlooded]: noOp,
    [Trait.LogansLoophole]: noOp,
    [Trait.LooseCannon]: noOp,
    [Trait.TriggerDiscipline]: noOp,
    [Trait.WildWasteland]: noOp
  };

  reactToTrait(trait: ObjectValues<typeof Trait>): void {
    this._traitReactors[trait]();
  }

  reactToAllTraits(): void {
    for (const trait of Object.values(Trait)) {
      this._traitReactors[trait]();
    }
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

  _triggerReactors() {
    for (const special of Object.values(Special)) {
      this._specialReactors[special]();
    }
    this._maxHPReactor();
    this.reactToAllSkills();
    this.reactToAllTraits();
    for (const derived of Object.values(DerivedStat)) {
      this._derivedStatReactors[derived]();
    }
  }

  /* should probably look to the reactive store instead of the model */
  _reset(): void {
    this.name = '';
    this.sex = Sex.Male;
    this.age = 30;
    Object.assign(this, ...Object.values(Special).map((a) => ({ [a]: 5 })));
    this.difficulty = Difficulty.Normal;
    this.clearTraits();
    this.clearTagged();
    this._triggerReactors();
  }
}
