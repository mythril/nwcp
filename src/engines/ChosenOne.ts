export const Special = {
  Strength: 'Strength',
  Perception: 'Perception',
  Endurance: 'Endurance',
  Charimsa: 'Charisma',
  Intelligence: 'Intelligence',
  Agility: 'Agility',
  Luck: 'Luck'
} as const;

type ObjectValues<T> = T[keyof T];
export type SPECIAL = ObjectValues<typeof Special>;

export function SpecialAbbreviation(special: SPECIAL): string {
  switch (special) {
    case Special.Strength:
      return 'ST';
    case Special.Perception:
      return 'PE';
    case Special.Endurance:
      return 'EN';
    case Special.Charimsa:
      return 'CH';
    case Special.Intelligence:
      return 'IN';
    case Special.Agility:
      return 'AG';
    case Special.Luck:
      return 'LK';
  }
}

export type Attributes = Map<SPECIAL, number>;

export const CombatSkills = {
  SmallGuns: 'Small Guns',
  BigGuns: 'Big Guns',
  EnergyWeapons: 'Energy Weapons',
  Unarmed: 'Unarmed',
  MeleeWeapons: 'Melee Weapons',
  Throwing: 'Throwing'
} as const;

export const ActiveSkills = {
  FirstAid : 'First Aid',
  Doctor : 'Doctor',
  Sneak : 'Sneak',
  LockPick : 'Lockpick',
  Steal : 'Steal',
  Traps : 'Traps',
  Science : 'Science',
  Repair : 'Repair'
} as const;

export const PassiveSkills = {
  Speech : 'Speech',
  Barder : 'Barter',
  Gambling : 'Gambling',
  Outdoorsman : 'Outdoorsman'
} as const;

export const Skills = { ...CombatSkills, ...ActiveSkills, ...PassiveSkills } as const;
export type SKILLS = ObjectValues<typeof Skills>;
export type SkillSet = Map<SKILLS, number>;

export const Traits = {
  FastMetabolism : 'Fast Metabolism',
  Bruiser : 'Bruiser',
  SmallFrame : 'Small Frame',
  OneHander : 'One Hander',
  Finesse : 'Finesse',
  Kamikaze : 'Kamikaze',
  HeavyHanded : 'Heavy Handed',
  FastShot : 'Fast Shot',
  BloodyMess : 'Bloody Mess',
  Jinxed : 'Jinxed',
  GoodNatured : 'Good Natured',
  ChemReliant : 'Chem Reliant',
  ChemResistant : 'Chem Resistant',
  SexAppeal : 'Sex Appeal',
  Skilled : 'Skilled',
  Gifted : 'Gifted',
} as const;

export type TRAITS = ObjectValues<typeof Traits>;
export type TraitSet = Map<TRAITS, boolean>;

