import type { IRoleHelp } from '../UnfinishedCharacter';
import { Skill, Trait } from './data';

export const Help: IRoleHelp = {
  formulas: {
    [Skill.SmallGuns]: '35% + AG',
    [Skill.BigGuns]: '10% + AG',
    [Skill.EnergyWeapons]: '10% + AG',
    [Skill.Unarmed]: '65% + ((ST + AG) / 2)',
    [Skill.MeleeWeapons]: '55% + ((ST + AG) / 2)',
    [Skill.Throwing]: '40% + AG',
    [Skill.FirstAid]: '30% + ((PE + IN) / 2)',
    [Skill.Doctor]: '15% + ((PE + IN) / 2)',
    [Skill.Sneak]: '25% + AG',
    [Skill.LockPick]: '20% + ((PE + AG) / 2)',
    [Skill.Steal]: '20% + AG',
    [Skill.Traps]: '20% + ((PE + AG) / 2)',
    [Skill.Science]: '25% + (2 x IN)',
    [Skill.Repair]: '20% + IN',
    [Skill.Speech]: '25% + (2 x CH)',
    [Skill.Barter]: '20% + (2 x CH)',
    [Skill.Gambling]: '20% + (3 x LK)',
    [Skill.Outdoorsman]: '5% + ((EN + IN) / 2)'
  },
  help: {
    [Trait.FastShot]:
      "You don't have time to aim for a targeted attack, because you attack faster than normal people. It costs you one less action point to use a weapon.",
    [Trait.Skilled]:
      'Since you spend more time improving your skills than a normal person, you start with better skills levels. The tradeoff is that you do not gain as many extra abilities. You will gain a perk every four levels.'
  }
} as const;
