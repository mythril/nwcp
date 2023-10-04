import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { Role, Sex, Special } from '$lib/engines/all';
import {
  base64ToChar,
  charToBase64,
  packer,
  unpacker
} from '$lib/engines/BitPacking';
import type { UnfinishedCharacter } from '$lib/engines/UnfinishedCharacter';
import { UnfinishedChosenOne } from '$lib/engines/ChosenOne/Unfinished';
import { UnfinishedVaultDweller } from '$lib/engines/VaultDweller/Unfinished';
import { UnfinishedWarrior } from '$lib/engines/Warrior/Unfinished';
import { UnfinishedCourier } from '$lib/engines/Courier/Unfinished';
import { UnfinishedLoneWanderer } from '$lib/engines/LoneWanderer/Unfinished';

const fake = (char: UnfinishedCharacter) => {
  const traits = faker.helpers.arrayElements(Object.values(char.traitInfo), {
    min: 0,
    max: 2
  });

  const tagged = faker.helpers.arrayElements(Object.values(char.skillInfo), {
    min: 0,
    max: 3
  });

  const sex = faker.person.sex();

  char.difficulty = faker.helpers.arrayElement(
    Object.values(char.difficultyInfo)
  );
  char.name = faker.person.firstName(sex === 'female' ? 'female' : 'male');
  char.age = faker.number.int({ min: char.minAge, max: char.maxAge });
  char.sex = sex === 'female' ? Sex.Female : Sex.Male;
  char[Special.Strength] = faker.number.int({ min: 1, max: 10 });
  char[Special.Perception] = faker.number.int({ min: 1, max: 10 });
  char[Special.Endurance] = faker.number.int({ min: 1, max: 10 });
  char[Special.Charisma] = faker.number.int({ min: 1, max: 10 });
  char[Special.Intelligence] = faker.number.int({ min: 1, max: 10 });
  char[Special.Agility] = faker.number.int({ min: 1, max: 10 });
  char[Special.Luck] = faker.number.int({ min: 1, max: 10 });
  traits.forEach((v) => char.addTrait(v));
  tagged.forEach((v) => char.addTagged(v));
};

function serialize(obj: {}) {
  return JSON.stringify(obj);
}

describe('Bit packing/unpacking a character', () => {
  faker.seed(45);
  for (const unfinished of [
    UnfinishedVaultDweller,
    UnfinishedChosenOne,
    UnfinishedWarrior,
    UnfinishedLoneWanderer,
    UnfinishedCourier
  ]) {
    const max = 1000;
    it(
      unfinished.name +
        ' packs and unpacks even with randomized descriptor order, 1,000 times',
      () => {
        let count = 0;
        for (let i = 0; i < max; i += 1) {
          const char: UnfinishedCharacter = new unfinished();
          fake(char);
          const packed = packer(char.getPackingDescriptors(), char.toJSON());
          const unpacked = unpacker(
            packed,
            char.getPackingDescriptors(),
            new unfinished()
          );
          char._shufflePackingDescriptors((pd) => faker.helpers.shuffle(pd));
          if (serialize(char) !== serialize(unpacked)) {
            throw 'Pack/unpack issue detected.';
          }
          count += 1;
        }
        expect(count).toEqual(max);
      }
    );
    it(
      unfinished.name + ' packs and unpacks cleanly through base64 encoding',
      () => {
        const source = new unfinished();
        fake(source);
        const b64 = charToBase64(source);
        const newChar = new unfinished();
        const dest = base64ToChar(b64, newChar);
        expect(serialize(source)).toEqual(serialize(dest));
      }
    );
    it('Chosen-one survives serialization and un-serialization with all data intact', () => {
      const source = new UnfinishedChosenOne();
      source._reset();
      source.addTrait('Chem Reliant');
      source.addTrait('Chem Resistant');
      source.addTagged('Barter');
      source.addTagged('Big Guns');
      source.addTagged('Doctor');
      source.Strength = 10;
      source.age = 16;
      source.name = "I'm the BOS";
      source.sex = Sex.Male;
      const b64 = charToBase64(source);
      const newChar = new UnfinishedChosenOne();
      const dest = base64ToChar(b64, newChar);
      expect(dest.hasTrait('Chem Reliant')).toBe(true);
      expect(dest.hasTrait('Chem Resistant')).toBe(true);
      expect(dest.hasTagged('Barter')).toBe(true);
      expect(dest.hasTagged('Big Guns')).toBe(true);
      expect(dest.hasTagged('Doctor')).toBe(true);
      expect(dest.Strength).toEqual(10);
      expect(dest.age).toEqual(16);
      expect(dest.name).toEqual("I'm the BOS");
      expect(dest.sex).toEqual('Male');
    });
  }
  it('unpacks chosen-one link build correctly', () => {
    const hashPacked = 'EAFkTh2akyBMcApXaXRjaHVudGVy';
    const newChar = new UnfinishedChosenOne();
    const dest = base64ToChar(hashPacked, newChar);
    const Skill = dest.skillInfo;
    const DerivedStat = dest.derivedStatInfo;
    expect(dest.hasTrait('Fast Shot')).toBe(true);
    expect(dest.hasTrait('Gifted')).toBe(true);
    expect(dest.hasTagged('Small Guns')).toBe(true);
    expect(dest.hasTagged('Big Guns')).toBe(true);
    expect(dest.hasTagged('Speech')).toBe(true);
    expect(dest.displayAttributes.Strength).toEqual(7);
    expect(dest.displayAttributes.Perception).toEqual(7);
    expect(dest.displayAttributes.Endurance).toEqual(4);
    expect(dest.displayAttributes.Charisma).toEqual(2);
    expect(dest.displayAttributes.Intelligence).toEqual(9);
    expect(dest.displayAttributes.Agility).toEqual(10);
    expect(dest.displayAttributes.Luck).toEqual(8);
    expect(dest.age).toEqual(25);
    expect(dest.role).toEqual(Role.ChosenOne);
    expect(dest.name).toEqual('Witchunter');
    expect(dest.sex).toEqual('Male');
    expect(dest.maxHitPoints).toEqual(30);
    expect(dest.derivedStatsDisplay[DerivedStat.ArmorClass]).toBe('10');
    expect(dest.derivedStatsDisplay[DerivedStat.ActionPoints]).toBe('10');
    expect(dest.derivedStatsDisplay[DerivedStat.CarryWeight]).toBe('200');
    expect(dest.derivedStatsDisplay[DerivedStat.MeleeDamage]).toBe('2');
    expect(dest.derivedStatsDisplay[DerivedStat.DamageRes]).toBe('0%');
    expect(dest.derivedStatsDisplay[DerivedStat.PoisonRes]).toBe('20%');
    expect(dest.derivedStatsDisplay[DerivedStat.RadiationRes]).toBe('8%');
    expect(dest.derivedStatsDisplay[DerivedStat.Sequence]).toBe('14');
    expect(dest.derivedStatsDisplay[DerivedStat.HealingRate]).toBe('1');
    expect(dest.derivedStatsDisplay[DerivedStat.CriticalChance]).toBe('8%');
    expect(dest.baseSkills[Skill.SmallGuns]).toBe(55);
    expect(dest.baseSkills[Skill.BigGuns]).toBe(30);
    expect(dest.baseSkills[Skill.EnergyWeapons]).toBe(10);
    expect(dest.baseSkills[Skill.Unarmed]).toBe(54);
    expect(dest.baseSkills[Skill.MeleeWeapons]).toBe(44);
    expect(dest.baseSkills[Skill.Throwing]).toBe(30);
    expect(dest.baseSkills[Skill.FirstAid]).toBe(22);
    expect(dest.baseSkills[Skill.Doctor]).toBe(11);
    expect(dest.baseSkills[Skill.Sneak]).toBe(25);
    expect(dest.baseSkills[Skill.LockPick]).toBe(17);
    expect(dest.baseSkills[Skill.Steal]).toBe(20);
    expect(dest.baseSkills[Skill.Traps]).toBe(17);
    expect(dest.baseSkills[Skill.Science]).toBe(26);
    expect(dest.baseSkills[Skill.Repair]).toBe(17);
    expect(dest.baseSkills[Skill.Speech]).toBe(20);
    expect(dest.baseSkills[Skill.Barter]).toBe(-2);
    expect(dest.baseSkills[Skill.Gambling]).toBe(30);
    expect(dest.baseSkills[Skill.Outdoorsman]).toBe(16);
  });
  it('unpacks vault-dweller link build correctly', () => {
    const hashPacked = 'CAFkVWWUkyGECAdMaWx1cmEx';
    const newChar = new UnfinishedVaultDweller();
    const dest = base64ToChar(hashPacked, newChar);
    const Skill = dest.skillInfo;
    const DerivedStat = dest.derivedStatInfo;
    expect(dest.hasTrait('Fast Shot')).toBe(true);
    expect(dest.hasTrait('Gifted')).toBe(true);
    expect(dest.hasTagged('Small Guns')).toBe(true);
    expect(dest.hasTagged('Energy Weapons')).toBe(true);
    expect(dest.hasTagged('Barter')).toBe(true);
    expect(dest.displayAttributes.Strength).toEqual(6);
    expect(dest.displayAttributes.Perception).toEqual(7);
    expect(dest.displayAttributes.Endurance).toEqual(6);
    expect(dest.displayAttributes.Charisma).toEqual(2);
    expect(dest.displayAttributes.Intelligence).toEqual(6);
    expect(dest.displayAttributes.Agility).toEqual(10);
    expect(dest.displayAttributes.Luck).toEqual(10);
    expect(dest.role).toEqual(Role.VaultDweller);
    expect(dest.age).toEqual(25);
    expect(dest.name).toEqual('Lilura1');
    expect(dest.sex).toEqual('Female');
    expect(dest.maxHitPoints).toEqual(33);
    expect(dest.derivedStatsDisplay[DerivedStat.ArmorClass]).toBe('10');
    expect(dest.derivedStatsDisplay[DerivedStat.ActionPoints]).toBe('10');
    expect(dest.derivedStatsDisplay[DerivedStat.CarryWeight]).toBe('175');
    expect(dest.derivedStatsDisplay[DerivedStat.MeleeDamage]).toBe('1');
    expect(dest.derivedStatsDisplay[DerivedStat.DamageRes]).toBe('0%');
    expect(dest.derivedStatsDisplay[DerivedStat.PoisonRes]).toBe('30%');
    expect(dest.derivedStatsDisplay[DerivedStat.RadiationRes]).toBe('12%');
    expect(dest.derivedStatsDisplay[DerivedStat.Sequence]).toBe('14');
    expect(dest.derivedStatsDisplay[DerivedStat.HealingRate]).toBe('2');
    expect(dest.derivedStatsDisplay[DerivedStat.CriticalChance]).toBe('10%');
    expect(dest.baseSkills[Skill.SmallGuns]).toBe(55);
    expect(dest.baseSkills[Skill.BigGuns]).toBe(10);
    expect(dest.baseSkills[Skill.EnergyWeapons]).toBe(30);
    expect(dest.baseSkills[Skill.Unarmed]).toBe(63);
    expect(dest.baseSkills[Skill.MeleeWeapons]).toBe(53);
    expect(dest.baseSkills[Skill.Throwing]).toBe(40);
    expect(dest.baseSkills[Skill.FirstAid]).toBe(26);
    expect(dest.baseSkills[Skill.Doctor]).toBe(11);
    expect(dest.baseSkills[Skill.Sneak]).toBe(25);
    expect(dest.baseSkills[Skill.LockPick]).toBe(18);
    expect(dest.baseSkills[Skill.Steal]).toBe(20);
    expect(dest.baseSkills[Skill.Traps]).toBe(18);
    expect(dest.baseSkills[Skill.Science]).toBe(27);
    expect(dest.baseSkills[Skill.Repair]).toBe(16);
    expect(dest.baseSkills[Skill.Speech]).toBe(19);
    expect(dest.baseSkills[Skill.Barter]).toBe(34);
    expect(dest.baseSkills[Skill.Gambling]).toBe(40);
    expect(dest.baseSkills[Skill.Outdoorsman]).toBe(1);
  });
  it('unpacks courier link build correctly', () => {
    const hashPacked = '+AGBWGZuJXEKsAtDb3VyaWVyVGVzdA==';
    const newChar = new UnfinishedCourier();
    const dest = base64ToChar(hashPacked, newChar);
    const Skill = dest.skillInfo;
    const DerivedStat = dest.derivedStatInfo;
    expect(dest.hasTrait('Four Eyes')).toBe(true);
    expect(dest.hasTrait('Small Frame')).toBe(true);
    expect(dest.hasTagged('Guns')).toBe(true);
    expect(dest.hasTagged('Lockpick')).toBe(true);
    expect(dest.hasTagged('Speech')).toBe(true);
    expect(dest.displayAttributes.Strength).toEqual(6);
    expect(dest.displayAttributes.Perception).toEqual(5);
    expect(dest.displayAttributes.Endurance).toEqual(5);
    expect(dest.displayAttributes.Charisma).toEqual(1);
    expect(dest.displayAttributes.Intelligence).toEqual(8);
    expect(dest.displayAttributes.Agility).toEqual(9);
    expect(dest.displayAttributes.Luck).toEqual(6);
    expect(dest.role).toEqual(Role.Courier);
    expect(dest.age).toEqual(65);
    expect(dest.name).toEqual('CourierTest');
    expect(dest.sex).toEqual('Male');
    expect(dest.maxHitPoints).toEqual(200);
    expect(dest.derivedStatsDisplay[DerivedStat.ActionPoints]).toBe('92');
    expect(dest.derivedStatsDisplay[DerivedStat.CarryWeight]).toBe('210');
    expect(dest.derivedStatsDisplay[DerivedStat.CompanionNerve]).toBe('5%'); //assumed from wiki
    expect(dest.derivedStatsDisplay[DerivedStat.CriticalChance]).toBe('6%'); //assumed from wiki
    expect(dest.derivedStatsDisplay[DerivedStat.MeleeDamage]).toBe('3'); //assumed from wiki
    expect(dest.derivedStatsDisplay[DerivedStat.PoisonRes]).toBe('20%'); //assumed from wiki
    expect(dest.derivedStatsDisplay[DerivedStat.RadiationRes]).toBe('8%'); //assumed from wiki
    expect(dest.derivedStatsDisplay[DerivedStat.SkillRate]).toBe('14'); //assumed from wiki
    expect(dest.derivedStatsDisplay[DerivedStat.UnarmedDamage]).toBe('2'); //assumed from wiki
    expect(dest.baseSkills[Skill.Barter]).toBe(7);
    expect(dest.baseSkills[Skill.EnergyWeapons]).toBe(15);
    expect(dest.baseSkills[Skill.Explosives]).toBe(15);
    expect(dest.baseSkills[Skill.Guns]).toBe(38);
    expect(dest.baseSkills[Skill.LockPick]).toBe(30);
    expect(dest.baseSkills[Skill.Medicine]).toBe(21);
    expect(dest.baseSkills[Skill.MeleeWeapons]).toBe(17);
    expect(dest.baseSkills[Skill.Repair]).toBe(21);
    expect(dest.baseSkills[Skill.Science]).toBe(21);
    expect(dest.baseSkills[Skill.Sneak]).toBe(23);
    expect(dest.baseSkills[Skill.Speech]).toBe(22);
    expect(dest.baseSkills[Skill.Survival]).toBe(15);
    expect(dest.baseSkills[Skill.Unarmed]).toBe(15);
  });
  it('unpacks warrior link build correctly', () => {
    const hashPacked = '8AFdESYS6dB2uANCcm8=';
    const newChar = new UnfinishedWarrior();
    const dest = base64ToChar(hashPacked, newChar);
    const Skill = dest.skillInfo;
    const DerivedStat = dest.derivedStatInfo;
    expect(dest.hasTrait('Finesse')).toBe(true);
    expect(dest.hasTrait('Gifted')).toBe(true);
    expect(dest.hasTagged('Small Guns')).toBe(true);
    expect(dest.hasTagged('Sneak')).toBe(true);
    expect(dest.hasTagged('Lockpick')).toBe(true);
    expect(dest.displayAttributes.Strength).toEqual(5);
    expect(dest.displayAttributes.Perception).toEqual(9);
    expect(dest.displayAttributes.Endurance).toEqual(5);
    expect(dest.displayAttributes.Charisma).toEqual(5);
    expect(dest.displayAttributes.Intelligence).toEqual(5);
    expect(dest.displayAttributes.Agility).toEqual(8);
    expect(dest.displayAttributes.Luck).toEqual(10);
    expect(dest.role).toEqual(Role.Warrior);
    expect(dest.age).toEqual(45);
    expect(dest.name).toEqual('Bro');
    expect(dest.sex).toEqual('Male');
    expect(dest.maxHitPoints).toEqual(30);
    expect(dest.derivedStatsDisplay[DerivedStat.ArmorClass]).toBe('8');
    expect(dest.derivedStatsDisplay[DerivedStat.MeleeDamage]).toBe('1');
    expect(dest.derivedStatsDisplay[DerivedStat.BonusDamage]).toBe('-25%');
    expect(dest.derivedStatsDisplay[DerivedStat.DamageRes]).toBe('0%');
    expect(dest.derivedStatsDisplay[DerivedStat.PoisonRes]).toBe('25%');
    expect(dest.derivedStatsDisplay[DerivedStat.RadiationRes]).toBe('10%');
    expect(dest.derivedStatsDisplay[DerivedStat.ActionPoints]).toBe('9');
    expect(dest.derivedStatsDisplay[DerivedStat.CarryWeight]).toBe('150');
    expect(dest.derivedStatsDisplay[DerivedStat.HealingRate]).toBe('1');
    expect(dest.derivedStatsDisplay[DerivedStat.CriticalChance]).toBe('20%');
    expect(dest.derivedStatsDisplay[DerivedStat.SkillRate]).toBe('10');
    expect(dest.derivedStatsDisplay[DerivedStat.PerkRate]).toBe('3');
    expect(dest.baseSkills[Skill.SmallGuns]).toBe(47);
    expect(dest.baseSkills[Skill.BigGuns]).toBe(6);
    expect(dest.baseSkills[Skill.EnergyWeapons]).toBe(6);
    expect(dest.baseSkills[Skill.Unarmed]).toBe(46);
    expect(dest.baseSkills[Skill.MeleeWeapons]).toBe(36);
    expect(dest.baseSkills[Skill.Throwing]).toBe(22);
    expect(dest.baseSkills[Skill.FirstAid]).toBe(48);
    expect(dest.baseSkills[Skill.Doctor]).toBe(4);
    expect(dest.baseSkills[Skill.Sneak]).toBe(34);
    expect(dest.baseSkills[Skill.LockPick]).toBe(37);
    expect(dest.baseSkills[Skill.Steal]).toBe(14);
    expect(dest.baseSkills[Skill.Traps]).toBe(17);
    expect(dest.baseSkills[Skill.Science]).toBe(10);
    expect(dest.baseSkills[Skill.Repair]).toBe(5);
    expect(dest.baseSkills[Skill.Pilot]).toBe(24);
    expect(dest.baseSkills[Skill.Barter]).toBe(10);
    expect(dest.baseSkills[Skill.Gambling]).toBe(30);
    expect(dest.baseSkills[Skill.Outdoorsman]).toBe(10);
  });
});
