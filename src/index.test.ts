import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { Sex, Special } from '$lib/engines/all';
import {
  base64ToChar,
  charToBase64,
  packer,
  unpacker
} from '$lib/engines/BitPacking';
import { UnfinishedChosenOne } from '$lib/engines/ChosenOne/Unfinished';
import type { UnfinishedCharacter } from '$lib/engines/UnfinishedCharacter';

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
  char.age = faker.number.int({ min: 16, max: 35 });
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
  it('packs and unpacks even with randomized descriptor order, 5,000 times', () => {
    faker.seed(45);

    let count = 0;
    for (let i = 0; i < 5000; i += 1) {
      const char = new UnfinishedChosenOne();
      fake(char);
      const packed = packer(char.getPackingDescriptors(), char.toJSON());
      const unpacked = unpacker(
        packed,
        char.getPackingDescriptors(),
        new UnfinishedChosenOne()
      );
      char._shufflePackingDescriptors((pd) => faker.helpers.shuffle(pd));
      if (serialize(char) !== serialize(unpacked)) {
        throw 'Pack/unpack issue detected.';
      }
      count += 1;
    }
    expect(count).toEqual(5000);
  });
  it('packs and unpacks cleanly through base64 encoding', () => {
    const source = new UnfinishedChosenOne();
    fake(source);
    const b64 = charToBase64(source);
    const newChar = new UnfinishedChosenOne();
    const dest = base64ToChar(b64, newChar);
    expect(serialize(source)).toEqual(serialize(dest));
  });
  it('survives serialization and un-serialization with all data intact', () => {
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
  it('unpacks link build correctly', () => {
    const hashPacked = 'EAFkTh2akyBMcApXaXRjaHVudGVy';
    const newChar = new UnfinishedChosenOne();
    const dest = base64ToChar(hashPacked, newChar);
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
    expect(dest.name).toEqual('Witchunter');
    expect(dest.sex).toEqual('Male');
  });
});
