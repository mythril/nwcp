import {
  Trait,
  UnfinishedChosenOne,
  Skill,
  Difficulty
} from '$lib/engines/ChosenOne/main';
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { Role, Sex, Special } from '$lib/engines/all';
import { packer, unpacker } from '$lib/BitPacking';
import {
  OrderedDescriptors,
  base64ToChar,
  charToBase64
} from '$lib/engines/ChosenOne/codec';

const charGen = (): UnfinishedChosenOne => {
  const traits = faker.helpers.arrayElements(Object.values(Trait), {
    min: 0,
    max: 2
  });

  traits[0] = traits[0] || undefined;
  traits[1] = traits[1] || undefined;

  const tagged = faker.helpers.arrayElements(Object.values(Skill), {
    min: 0,
    max: 3
  });

  tagged[0] = tagged[0] || undefined;
  tagged[1] = tagged[1] || undefined;
  tagged[2] = tagged[2] || undefined;

  const sex = faker.person.sex();

  const ret = new UnfinishedChosenOne();
  const data = {
    role: Role.ChosenOne,
    difficulty: faker.helpers.arrayElement(Object.values(Difficulty)),
    name: faker.person.firstName(sex === 'female' ? 'female' : 'male'),
    age: faker.number.int({ min: 16, max: 35 }),
    sex: sex === 'female' ? Sex.Female : Sex.Male,
    attributes: {
      [Special.Strength]: faker.number.int({ min: 1, max: 10 }),
      [Special.Perception]: faker.number.int({ min: 1, max: 10 }),
      [Special.Endurance]: faker.number.int({ min: 1, max: 10 }),
      [Special.Charisma]: faker.number.int({ min: 1, max: 10 }),
      [Special.Intelligence]: faker.number.int({ min: 1, max: 10 }),
      [Special.Agility]: faker.number.int({ min: 1, max: 10 }),
      [Special.Luck]: faker.number.int({ min: 1, max: 10 })
    },
    traits,
    tagged
  };
  return Object.assign(ret, data);
};

function serialize(obj: {}) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}

describe('Bit packing/unpacking a character', () => {
  it('packs and unpacks even with randomized descriptor order, 5,000 times', () => {
    faker.seed(45);

    let count = 0;
    for (let i = 0; i < 5000; i += 1) {
      const char = charGen();
      const packed = packer<UnfinishedChosenOne>(OrderedDescriptors, char);
      const unpacked = unpacker<UnfinishedChosenOne>(
        packed,
        OrderedDescriptors,
        new UnfinishedChosenOne()
      );
      faker.helpers.shuffle(OrderedDescriptors, { inplace: true });
      if (serialize(char) !== serialize(unpacked)) {
        throw 'Pack/unpack issue detected.';
      }
      count += 1;
    }
    expect(count).toEqual(5000);
  });
  it('packs and unpacks cleanly through base64 encoding', () => {
    const source = charGen();
    const b64 = charToBase64(source);
    const dest = base64ToChar(b64);
    expect(serialize(source)).toEqual(serialize(dest));
  });
});
