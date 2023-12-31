import { Role, Special } from '$lib/engines/all';

import { Trait, Skill, Difficulty } from './data';

import {
  CodecError,
  intToRole,
  intToSex,
  roleToInt,
  sexToInt,
  CURRENT_VERSION,
  type IPackingDescriptor,
  type IFixedDescriptor,
  type IVariableDescriptor
} from '$lib/engines/BitPacking';
import type { ObjectValues } from '$lib/typeUtils';
import type {
  SerializedUnfinishedCharacter,
  UnfinishedCharacter
} from '../UnfinishedCharacter';

export const difficultyToInt = (diff: ObjectValues<typeof Difficulty> & {}) => {
  switch (diff) {
    case Difficulty.Easy:
      return 0;
    case Difficulty.Normal:
      return 1;
    case Difficulty.Hard:
      return 2;
    default:
      throw new CodecError('Unrecognized difficulty.');
  }
};

export const intToDifficulty = (d: number) => {
  switch (d) {
    case 0:
      return Difficulty.Easy;
    case 1:
      return Difficulty.Normal;
    case 2:
      return Difficulty.Hard;
    default:
      throw new CodecError('Unrecognized difficulty.');
  }
};

const sortedSpecial = Object.freeze(Object.values(Special).sort());
const sortedTraits = Object.freeze(Object.values(Trait).sort());
const sortedSkills = Object.freeze(Object.values(Skill).sort());

/* eslint-disable prefer-const -- this needs to be malleable for testing purposes */
export let OrderedDescriptors: IPackingDescriptor[] = [];
/* eslint-enable prefer-const */

const roleDescriptor: IFixedDescriptor = {
  name: 'role',
  // in case they decide to make 31 games
  bits: 5,
  encoder: () => roleToInt(Role.VaultDweller),
  decoder: (data: number, _char: UnfinishedCharacter) => {
    if (intToRole(data) !== Role.VaultDweller) {
      throw new CodecError('This game is not yet supported.');
    }
  }
};

OrderedDescriptors.push(roleDescriptor);

const versionDescriptor: IFixedDescriptor = {
  name: 'version',
  // because we might screw up a lot 2^11 -1
  bits: 11,
  encoder: () => CURRENT_VERSION,
  decoder: (a: number) => {
    if (a === 0) {
      throw new CodecError('Invalid NWCP file version.');
    }
    if (a > CURRENT_VERSION)
      throw new CodecError(
        'This character plan requires a more up to date NWCP release.'
      );
  }
};

OrderedDescriptors.push(versionDescriptor);

const nameDescriptor: IVariableDescriptor = {
  name: 'name',
  encoder: (char: SerializedUnfinishedCharacter) => {
    const encoder = new TextEncoder();
    return encoder.encode(char.name.trim().slice(0, 11));
  },
  decoder: (data: Uint8Array, mut: UnfinishedCharacter) => {
    const decoder = new TextDecoder();
    mut.name = decoder.decode(data);
  }
};

const difficultyDescriptor: IFixedDescriptor = {
  name: 'difficulty',
  bits: 2,
  encoder: (char: SerializedUnfinishedCharacter) => {
    switch (char.difficulty) {
      case Difficulty.Easy:
        return difficultyToInt(Difficulty.Easy);
      case Difficulty.Normal:
        return difficultyToInt(Difficulty.Normal);
      case Difficulty.Hard:
        return difficultyToInt(Difficulty.Hard);
    }
    throw new CodecError('Unexpected difficulty value.');
  },
  decoder: (data: number, mut: UnfinishedCharacter) => {
    mut.difficulty = intToDifficulty(data);
  }
};

OrderedDescriptors.push(difficultyDescriptor);

const specialsDescriptor: IFixedDescriptor[] = sortedSpecial.map((key) => {
  return {
    name: key,
    // maximum is 10, so 2^4 = 16 > 10
    bits: 4,
    encoder: (char: SerializedUnfinishedCharacter) => char[key],
    decoder: (a: number, mut: UnfinishedCharacter) => {
      mut[key] = a;
    }
  };
});

OrderedDescriptors.push(...specialsDescriptor);

const sexDescriptor: IFixedDescriptor = {
  name: 'sex',
  // it's a literal binary
  bits: 1,
  encoder: (char: SerializedUnfinishedCharacter) => sexToInt(char.sex),
  decoder: (data: number, mut: UnfinishedCharacter) => {
    mut.sex = intToSex(data);
  }
};

OrderedDescriptors.push(sexDescriptor);

const ageDescriptor: IFixedDescriptor = {
  name: 'age',
  // valid age range is 16-35 so we can subtract 16 from age, giving us a
  // range of 19, 5 bits can fit up to 32.
  bits: 5,
  encoder: (char: SerializedUnfinishedCharacter) => (char.age || 32) - 16,
  decoder: (data: number, mut: UnfinishedCharacter) => {
    mut.age = data + 16;
  }
};

OrderedDescriptors.push(ageDescriptor);

const traitsDescriptor: IFixedDescriptor[] = [0, 1].map((idx) => {
  return {
    name: `trait[${idx}]`,
    // there are 16 possible traits, which are optional
    // forcing us to use an extra bit
    bits: 5,
    encoder: (char: SerializedUnfinishedCharacter) => {
      if (char.traits === undefined) {
        return 0;
      }
      const traitArr = char.traits;
      const trait = traitArr[idx];
      if (!trait) {
        return 0;
      }
      return (sortedTraits as string[]).indexOf(trait) + 1;
    },
    decoder: (t: number, mut: UnfinishedCharacter) => {
      if (t > 0) {
        mut.addTrait(sortedTraits[t - 1]);
      }
    }
  };
});

OrderedDescriptors.push(...traitsDescriptor);

const taggedDescriptor: IFixedDescriptor[] = [0, 1, 2].map((idx) => {
  return {
    name: `tagged[${idx}]`,
    // there are 18 possible skills to choose from
    // 2^5 = 32
    bits: 5,
    encoder: (char: SerializedUnfinishedCharacter) => {
      const skillArr = char.tagged;
      const skill = skillArr[idx];
      if (!skill) {
        return 0;
      }
      return (sortedSkills as string[]).indexOf(skill) + 1;
    },
    decoder: (s: number, mut: UnfinishedCharacter) => {
      if (s > 0) {
        mut.addTagged(sortedSkills[s - 1]);
      }
    }
  };
});

OrderedDescriptors.push(...taggedDescriptor);

OrderedDescriptors.push(nameDescriptor);
