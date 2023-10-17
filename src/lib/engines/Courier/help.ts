import type { IRoleHelp } from '../UnfinishedCharacter';
import { Skill, Trait } from './data';

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
    [Skill.Guns]: 'Proficiency at using weapons that fire standard ammunition.',
    [Trait.FastShot]:
      'While using Guns and Energy Weapons, you fire 20% more quickly but your shots are 20% less accurate.',
    [Trait.GoodNatured]:
      "You're Good Natured at heart, more prone to solving problems with your mind than violence. You gain +5 to Barter, Medicine, Repair, Science, and Speech, but have -5 to Energy Weapons, Explosives, Guns, Melee Weapons, and Unarmed.",
    [Trait.HeavyHanded]:
      'Your melee and unarmed attacks do more damage, but less critical hit damage.',
    [Trait.Kamikaze]:
      'You have +10 Action Points but your reckless nature causes you to have -2 Damage Threshold.',
    [Trait.SmallFrame]:
      'Due to your small size, you have +1 Agility but your limbs are more easily crippled (25% extra limb damage).',
    [Trait.Skilled]:
      "You're skilled, but not experienced. You gain +5 points to every skill, but you suffer -10% from experience gained from now on."
  }
} as const;
