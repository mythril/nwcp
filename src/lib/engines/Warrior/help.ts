import type { IRoleHelp } from '../UnfinishedCharacter';
import { Skill } from './data';

export const Help: IRoleHelp = {
  formulas: {
    [Skill.SmallGuns]: '5% + (4 x AG)',
    [Skill.BigGuns]: '0% + (2 x AG)',
    [Skill.EnergyWeapons]: '0% + (2 x AG)',
    [Skill.Unarmed]: '30% + (2 x (AG + ST))',
    [Skill.MeleeWeapons]: '20% + (2 x (AG + ST))',
    [Skill.Throwing]: '0% + (4 x AG)',
    [Skill.FirstAid]: '30% + (2 x (PE + IN))',
    [Skill.Doctor]: '0% + (PE + IN)',
    [Skill.Sneak]: '0% + (3 x AG)',
    [Skill.LockPick]: '10% + (PE + AG)',
    [Skill.Steal]: '0% + (3 x AG)',
    [Skill.Traps]: '10% + (PE + AG)',
    [Skill.Science]: '0% + (4 x IN)',
    [Skill.Repair]: '0% + (3 x IN)',
    [Skill.Pilot]: '0% + (2 x (PE + AG))',
    [Skill.Barter]: '0% + (4 x CH)',
    [Skill.Gambling]: '0% + (3 x LK) + (2 x IN)',
    [Skill.Outdoorsman]: '0% + (2 x (EN + IN))'
  },
  help: {
    Pilot: 'The ability to operate and maintain all vehicles effectively.'
  }
} as const;
