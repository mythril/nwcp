import {
  Trait,
  type UnfinishedChar,
  Skill,
  Sex,
  Special
} from '$lib/engines/ChosenOne/main';
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { Game } from '$lib/engines/all';
import {
  OrderedDescriptors,
  base64ToChar,
  charToBase64,
  packer,
  unpacker
} from '$lib/codec';

const charGen = (): UnfinishedChar => {
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

  return {
    game: Game.ChosenOne,
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
      const packed = packer(char);
      const unpacked = unpacker(packed);
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
