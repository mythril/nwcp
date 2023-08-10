import { Game } from '$lib/engines/all';
import {
  Sex,
  Trait,
  Skill,
  type LVL1Character,
  Special
} from '$lib/engines/ChosenOne/main';
import type { ObjectValues } from './utils';
import debug from './debug';

const currentVersion = 1; // increment on incompatible updates

const gameToInt = (game: ObjectValues<typeof Game> & {}) => {
  switch (game) {
    // zero is an error on purpose
    case Game.VaultDweller:
      return 1;
    case Game.ChosenOne:
      return 2;
    case Game.LoneWanderer:
      return 3;
    case Game.Warrior:
      return 30;
    case Game.Courier:
      return 31;
    default:
      throw 'Unrecognized game.';
  }
};
const intToGame = (packed: number) => {
  switch (packed) {
    // zero is an error on purpose
    case 1:
      return Game.VaultDweller;
    case 2:
      return Game.ChosenOne;
    case 3:
      return Game.LoneWanderer;
    case 30:
      return Game.Warrior;
    case 31:
      return Game.Courier;
    default:
      throw 'Unrecognized game.';
  }
};

const sexToInt = (sex: ObjectValues<typeof Sex> & {}) => {
  switch (sex) {
    case Sex.Female:
      return 0;
    case Sex.Male:
      return 1;
    default:
      throw 'Unrecognized sex.';
  }
};

const intToSex = (s: number) => {
  switch (s) {
    case 0:
      return Sex.Female;
    case 1:
      return Sex.Male;
    default:
      throw 'Unrecognized sex.';
  }
};

const sortedSpecial = Object.freeze(Object.values(Special).sort());
const sortedTraits = Object.freeze(Object.values(Trait).sort());
const sortedSkills = Object.freeze(Object.values(Skill).sort());

type FixedDescriptor = {
  name: string;
  bits: number;
  encoder: (char: LVL1Character) => number;
  decoder: (alreadyAligned: number, mut: LVL1Character) => void;
};

type VariableDescriptor = {
  name: string;
  encoder: (char: LVL1Character) => Uint8Array;
  decoder: (data: Uint8Array, mut: LVL1Character) => void;
};

type PackingDescriptor = FixedDescriptor | VariableDescriptor;

/* eslint-disable prefer-const */
export let OrderedDescriptors: PackingDescriptor[] = [];
/* eslint-enable prefer-const */

const gameDescriptor: FixedDescriptor = {
  name: 'game',
  // in case they decide to make 31 games
  bits: 5,
  encoder: () => gameToInt('Chosen One'),
  decoder: (data: number, char: LVL1Character) => {
    char.game = intToGame(data);
    if (char.game !== Game.ChosenOne) {
      throw 'This game is not yet supported.';
    }
  }
};

OrderedDescriptors.push(gameDescriptor);

const versionDescriptor: FixedDescriptor = {
  name: 'version',
  // because we might screw up a lot 2^11 -1
  bits: 11,
  encoder: () => currentVersion,
  decoder: (a: number) => {
    if (a === 0) {
      throw 'Invalid NWCP file version.';
    }
    if (a > currentVersion)
      throw 'This character plan requires a more up to date NWCP release.';
  }
};

OrderedDescriptors.push(versionDescriptor);

const nameDescriptor: VariableDescriptor = {
  name: 'name',
  encoder: (char: LVL1Character) => {
    const encoder = new TextEncoder();
    return encoder.encode(char.name.trim().slice(0, 11));
  },
  decoder: (data: Uint8Array, mut: LVL1Character) => {
    const decoder = new TextDecoder();
    mut.name = decoder.decode(data);
  }
};

const specialsDescriptor: FixedDescriptor[] = sortedSpecial.map((key) => {
  return {
    name: key,
    // maximum is 10, so 2^4 = 16 > 10
    bits: 4,
    encoder: (char: LVL1Character) => char.attributes[key],
    decoder: (a: number, mut: LVL1Character) => {
      mut.attributes[key] = a;
    }
  };
});

OrderedDescriptors.push(...specialsDescriptor);

const sexDescriptor: FixedDescriptor = {
  name: 'sex',
  // it's a literal binary
  bits: 1,
  encoder: (char: LVL1Character) => sexToInt(char.sex),
  decoder: (data: number, mut: LVL1Character) => {
    mut.sex = intToSex(data);
  }
};

OrderedDescriptors.push(sexDescriptor);

const ageDescriptor: FixedDescriptor = {
  name: 'age',
  // valid age range is 16-35 so we can subtract 16 from age, giving us a
  // range of 19, 5 bits can fit up to 32.
  bits: 5,
  encoder: (char: LVL1Character) => char.age - 16,
  decoder: (data: number, mut: LVL1Character) => {
    mut.age = data + 16;
  }
};

OrderedDescriptors.push(ageDescriptor);

const traitsDescriptor: FixedDescriptor[] = [0, 1].map((idx) => {
  return {
    name: `trait[${idx}]`,
    // there are 16 possible traits, which are optional
    // forcing us to use an extra bit
    bits: 5,
    encoder: (char: LVL1Character) => {
      const trait = char.traits[idx];
      if (!trait) {
        return 0;
      }
      return sortedTraits.indexOf(trait) + 1;
    },
    decoder: (t: number, mut: LVL1Character) => {
      if (t > 0) {
        mut.traits[idx] = sortedTraits[t - 1];
      } else {
        mut.traits[idx] = undefined;
      }
    }
  };
});

OrderedDescriptors.push(...traitsDescriptor);

const taggedDescriptor: FixedDescriptor[] = [0, 1, 2].map((idx) => {
  return {
    name: `tagged[${idx}]`,
    // there are 18 possible skills to choose from
    // 2^5 = 32
    bits: 5,
    encoder: (char: LVL1Character) => {
      const skill = char.tagged[idx];
      if (!skill) {
        return 0;
      }
      return sortedSkills.indexOf(skill) + 1;
    },
    decoder: (s: number, mut: LVL1Character) => {
      if (s > 0) {
        mut.tagged[idx] = sortedSkills[s - 1];
      } else {
        mut.tagged[idx] = undefined;
      }
    }
  };
});

OrderedDescriptors.push(...taggedDescriptor);

OrderedDescriptors.push(nameDescriptor);

function genMask(width: number) {
  return 0b1111_1111_1111_1111_1111_1111_1111_1111 >>> (32 - width);
}

function b2s(b: number, l = 8) {
  return '0b' + b.toString(2).padStart(l, '0');
}

export function packer(char: LVL1Character) {
  debug.disable();
  const buffer: number[] = [];
  let desc: PackingDescriptor;
  let bigWorkpiece: Uint8Array;
  let workpiece = 0;
  let bitsUsed = 0;
  let pos = 0;
  let width = 0;
  let data: number | Uint8Array;
  let pinchItOff = false;
  for (let i = 0; i < OrderedDescriptors.length; i += 1) {
    desc = OrderedDescriptors[i];
    if ('bits' in desc) {
      pinchItOff = true;
      width = desc.bits;
      pos = 8 - bitsUsed - width;
      data = genMask(desc.bits) & desc.encoder(char);
      debug.groupEnd();
      debug.group(desc.name);
      debug.log('encoded:', data, b2s(data));
      while (pos < 0) {
        debug.log('pos:', pos);
        //set width to width of the data that will be in the next byte
        width = Math.abs(pos);
        debug.log('extra bits:', width);
        //split data at byte boundary
        data &= genMask(8);
        workpiece |= data >> width;
        debug.log('data(a):', b2s(data >> width));
        //send first byte to buffer
        buffer.push(workpiece);
        debug.log('stored workpiece(a):', b2s(workpiece));
        workpiece = 0;
        //mask off used data
        data = genMask(width) & data;
        //reset pos
        bitsUsed = 0;
        pos = 8 - width;
      }
      data <<= pos;
      data = data & genMask(8);

      debug.log('genMask', b2s(genMask(8)));
      debug.log('data(b):', b2s(data));
      debug.log('pos(b):', pos);
      workpiece |= data;
      bitsUsed += width;
      if (bitsUsed === 8) {
        buffer.push(workpiece);
        debug.log('stored workpiece(b):', b2s(workpiece));
        workpiece = 0;
        bitsUsed = 0;
        pinchItOff = false;
      }
    } else {
      if (pinchItOff) {
        buffer.push(workpiece);
        workpiece = 0;
        bitsUsed = 0;
        pinchItOff = false;
      }
      bigWorkpiece = desc.encoder(char);
      debug.groupEnd();
      debug.group(desc.name);
      buffer.push(bigWorkpiece.byteLength & 0b1111_1111);
      for (const e of bigWorkpiece) {
        buffer.push(Number(e));
      }
    }
  }
  if (pinchItOff) {
    buffer.push(workpiece);
  }
  debug.log('buffer', buffer);
  debug.enable();
  return Uint8Array.from(buffer, (v) => v + 0);
}

export function unpacker(packed: Uint8Array) {
  debug.disable();
  const mut: LVL1Character = {
    name: '',
    game: Game.VaultDweller,
    tagged: [undefined, undefined, undefined],
    traits: [undefined, undefined],
    age: 0,
    attributes: {
      Strength: 0,
      Perception: 0,
      Endurance: 0,
      Charisma: 0,
      Intelligence: 0,
      Agility: 0,
      Luck: 0
    },
    sex: Sex.Female
  };

  let desc: PackingDescriptor;
  let pos = 0;
  let start = 0;
  let workpiece = 0;
  for (let i = 0; i < OrderedDescriptors.length; i += 1) {
    desc = OrderedDescriptors[i];
    if ('bits' in desc) {
      //copy 3 bytes into 'buffer' number, starting at the byte pos falls within (location in bit-length)
      //this works because we know our largest chunk of fixed-length data is 11 bits, and worst case scenario
      //11 bits can be spread over 3 bytes
      start = Math.floor(pos / 8);
      debug.log('start:', start);
      workpiece =
        (packed[start] << 16) | (packed[start + 1] << 8) | packed[start + 2];
      debug.log('workpiece', b2s(workpiece, 24));
      //zero-fill-shift-right 24 - poss offset - bit-width of workpiece
      workpiece = workpiece >>> (24 - (pos % 8) - desc.bits);
      debug.log('workpiece', b2s(workpiece, 24));
      debug.log('workpiece', workpiece);
      //mask off relevant bits
      workpiece &= genMask(desc.bits);
      //send it to the decoder
      desc.decoder(workpiece, mut);
      pos += desc.bits;
    } else {
      //move to next byte boundary
      if (pos % 8 !== 0) {
        pos = Math.ceil(pos / 8) * 8;
      }
      start = Math.round(pos / 8);
      //read length byte
      workpiece = packed[start];
      //advance one byte
      start += 1;
      //pass slice(pos, pos+length) of packed into decoder
      desc.decoder(packed.slice(start, start + workpiece), mut);
      //move pos to next byte after slice
      pos = (start + workpiece) * 8;
    }
  }
  return mut;
}

export function base64ToBytes(base64: string) {
  const binString = atob(base64);
  const converted = binString.split('').map((m) => m.codePointAt(0) || 0);
  return Uint8Array.from(converted);
}

export function bytesToBase64(bytes: Uint8Array) {
  const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join('');
  return btoa(binString);
}
