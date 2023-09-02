import { Role, Special } from '$lib/engines/all';

import {
  Trait,
  Skill,
  type UnfinishedChosenOne,
  EmptyCharacter
} from '$lib/engines/ChosenOne/main';

import {
  CodecError,
  base64ToBytes,
  bytesToBase64,
  difficultyToInt,
  intToDifficulty,
  intToRole,
  intToSex,
  roleToInt,
  sexToInt,
  type PackingDescriptor,
  type FixedDescriptor,
  type VariableDescriptor,
  CURRENT_VERSION,
  packer,
  unpacker
} from '$lib/BitPacking';

const sortedSpecial = Object.freeze(Object.values(Special).sort());
const sortedTraits = Object.freeze(Object.values(Trait).sort());
const sortedSkills = Object.freeze(Object.values(Skill).sort());

/* eslint-disable prefer-const */
export let OrderedDescriptors: PackingDescriptor<UnfinishedChosenOne>[] = [];
/* eslint-enable prefer-const */

const roleDescriptor: FixedDescriptor<UnfinishedChosenOne> = {
  name: 'role',
  // in case they decide to make 31 games
  bits: 5,
  encoder: () => roleToInt(Role.ChosenOne),
  decoder: (data: number, char: UnfinishedChosenOne) => {
    char.role = intToRole(data);
    if (char.role !== Role.ChosenOne) {
      throw new CodecError('This game is not yet supported.');
    }
  }
};

OrderedDescriptors.push(roleDescriptor);

const versionDescriptor: FixedDescriptor<UnfinishedChosenOne> = {
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

const nameDescriptor: VariableDescriptor<UnfinishedChosenOne> = {
  name: 'name',
  encoder: (char: UnfinishedChosenOne) => {
    const encoder = new TextEncoder();
    return encoder.encode(char.name.trim().slice(0, 11));
  },
  decoder: (data: Uint8Array, mut: UnfinishedChosenOne) => {
    const decoder = new TextDecoder();
    mut.name = decoder.decode(data);
  }
};

const difficultyDescriptor: FixedDescriptor<UnfinishedChosenOne> = {
  name: 'difficulty',
  bits: 2,
  encoder: (char: UnfinishedChosenOne) => difficultyToInt(char.difficulty),
  decoder: (data: number, mut: UnfinishedChosenOne) => {
    mut.difficulty = intToDifficulty(data);
  }
};

OrderedDescriptors.push(difficultyDescriptor);

const specialsDescriptor: FixedDescriptor<UnfinishedChosenOne>[] =
  sortedSpecial.map((key) => {
    return {
      name: key,
      // maximum is 10, so 2^4 = 16 > 10
      bits: 4,
      encoder: (char: UnfinishedChosenOne) => char.attributes[key],
      decoder: (a: number, mut: UnfinishedChosenOne) => {
        mut.attributes[key] = a;
      }
    };
  });

OrderedDescriptors.push(...specialsDescriptor);

const sexDescriptor: FixedDescriptor<UnfinishedChosenOne> = {
  name: 'sex',
  // it's a literal binary
  bits: 1,
  encoder: (char: UnfinishedChosenOne) => sexToInt(char.sex),
  decoder: (data: number, mut: UnfinishedChosenOne) => {
    mut.sex = intToSex(data);
  }
};

OrderedDescriptors.push(sexDescriptor);

const ageDescriptor: FixedDescriptor<UnfinishedChosenOne> = {
  name: 'age',
  // valid age range is 16-35 so we can subtract 16 from age, giving us a
  // range of 19, 5 bits can fit up to 32.
  bits: 5,
  encoder: (char: UnfinishedChosenOne) => char.age - 16,
  decoder: (data: number, mut: UnfinishedChosenOne) => {
    mut.age = data + 16;
  }
};

OrderedDescriptors.push(ageDescriptor);

const traitsDescriptor: FixedDescriptor<UnfinishedChosenOne>[] = [0, 1].map(
  (idx) => {
    return {
      name: `trait[${idx}]`,
      // there are 16 possible traits, which are optional
      // forcing us to use an extra bit
      bits: 5,
      encoder: (char: UnfinishedChosenOne) => {
        const trait = char.traits[idx];
        if (!trait) {
          return 0;
        }
        return sortedTraits.indexOf(trait) + 1;
      },
      decoder: (t: number, mut: UnfinishedChosenOne) => {
        if (t > 0) {
          mut.traits[idx] = sortedTraits[t - 1];
        } else {
          mut.traits[idx] = undefined;
        }
      }
    };
  }
);

OrderedDescriptors.push(...traitsDescriptor);

const taggedDescriptor: FixedDescriptor<UnfinishedChosenOne>[] = [0, 1, 2].map(
  (idx) => {
    return {
      name: `tagged[${idx}]`,
      // there are 18 possible skills to choose from
      // 2^5 = 32
      bits: 5,
      encoder: (char: UnfinishedChosenOne) => {
        const skill = char.tagged[idx];
        if (!skill) {
          return 0;
        }
        return sortedSkills.indexOf(skill) + 1;
      },
      decoder: (s: number, mut: UnfinishedChosenOne) => {
        if (s > 0) {
          mut.tagged[idx] = sortedSkills[s - 1];
        } else {
          mut.tagged[idx] = undefined;
        }
      }
    };
  }
);

OrderedDescriptors.push(...taggedDescriptor);

OrderedDescriptors.push(nameDescriptor);

// TODO: these should be converted to generic functions, I think
export function charToBase64(char: UnfinishedChosenOne) {
  return bytesToBase64(packer<UnfinishedChosenOne>(OrderedDescriptors, char));
}

export function base64ToChar(base64: string) {
  return unpacker<UnfinishedChosenOne>(
    base64ToBytes(base64),
    OrderedDescriptors,
    EmptyCharacter()
  );
}
