import type { ObjectValues } from '$lib/typeUtils';
import { Sex, type Role, type Attributes } from './all';

export abstract class UnfinishedCharacter<
  Trait extends Record<string, string>,
  Skill extends Record<string, string>,
  Difficulty extends Record<string, string>
> {
  abstract readonly role: ObjectValues<typeof Role> & {};
  name = '';
  age = 0;
  sex: ObjectValues<typeof Sex> & {} = Sex.Male;
  attributes: Attributes = {
    Strength: 0,
    Perception: 0,
    Endurance: 0,
    Charisma: 0,
    Intelligence: 0,
    Agility: 0,
    Luck: 0
  };
  getRole() {
    return this.role;
  }
  abstract hasDifficultySetting(): boolean;
  abstract traits: (ObjectValues<Trait> | undefined)[];
  abstract tagged: (ObjectValues<Skill> | undefined)[];
  abstract difficulty: ObjectValues<Difficulty>;
  abstract getTraitInfo(): Trait;
  abstract getSkillInfo(): Skill;
  abstract getDifficultyInfo(): Difficulty;
}
