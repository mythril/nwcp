import type { IRoleHelp } from '../UnfinishedCharacter';
import { Skill } from './data';

export const Help: IRoleHelp = {
  formulas: {
    [Skill.Barter]: '2% + (CH x 2) + (LK / 2)',
    [Skill.Guns]: '2% + (AG x 2) + (LK / 2)',
    [Skill.EnergyWeapons]: '2% + (PE x 2) + (LK / 2)',
    [Skill.Explosives]: '2% + (PE x 2) + (LK / 2)',
    [Skill.LockPick]: '2% + (PE x 2) + (LK / 2)',
    [Skill.Medicine]: '2% + (IN x 2) + (LK / 2)',
    [Skill.MeleeWeapons]: '2% + (ST x 2) + (LK / 2)',
    [Skill.Repair]: '2% + (IN x 2) + (LK / 2)',
    [Skill.Science]: '2% + (IN x 2) + (LK / 2)',
    [Skill.Sneak]: '2% + (AG x 2) + (LK / 2)',
    [Skill.Speech]: '2% + (CH x 2) + (LK / 2)',
    [Skill.Survival]: '2% + (EN x 2) + (LK / 2)',
    [Skill.Unarmed]: '2% + (EN x 2) + (LK / 2)'
  },
  help: {
    Guns: 'Proficiency at using weapons that fire standard ammunition.'
  }
} as const;
