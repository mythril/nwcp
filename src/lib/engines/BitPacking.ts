import debug from '../debug';
import { Role, Sex } from './all';
import type { ObjectValues } from '../typeUtils';
import type {
  SerializedUnfinishedCharacter,
  UnfinishedCharacter
} from './UnfinishedCharacter';

export class CodecError extends Error {}

export const CURRENT_VERSION = 1; // increment on incompatible updates

export const constructFromRole = async (
  role: ObjectValues<typeof Role> & {}
): Promise<UnfinishedCharacter> => {
  switch (role) {
    case Role.VaultDweller: {
      const { UnfinishedVaultDweller } = await import(
        '$lib/engines/VaultDweller/Unfinished'
      );
      return new UnfinishedVaultDweller();
    }
    case Role.ChosenOne: {
      const { UnfinishedChosenOne } = await import(
        '$lib/engines/ChosenOne/Unfinished'
      );
      return new UnfinishedChosenOne();
    }
    case Role.Warrior: {
      const { UnfinishedWarrior } = await import(
        '$lib/engines/Warrior/Unfinished'
      );
      return new UnfinishedWarrior();
    }
    case Role.LoneWanderer: {
      const { UnfinishedLoneWanderer } = await import(
        '$lib/engines/LoneWanderer/Unfinished'
      );
      return new UnfinishedLoneWanderer();
    }
    case Role.Courier: {
      const { UnfinishedCourier } = await import(
        '$lib/engines/Courier/Unfinished'
      );
      return new UnfinishedCourier();
    }
    default:
      throw new CodecError('Unrecognized game.');
  }
};

export const roleToInt = (role: ObjectValues<typeof Role> & {}) => {
  switch (role) {
    // zero is an error on purpose
    case Role.VaultDweller:
      return 1;
    case Role.ChosenOne:
      return 2;
    case Role.LoneWanderer:
      return 3;
    case Role.Warrior:
      return 30;
    case Role.Courier:
      return 31;
    default:
      throw new CodecError('Unrecognized game.');
  }
};
export const intToRole = (packed: number) => {
  switch (packed) {
    // zero is an error on purpose
    case 1:
      return Role.VaultDweller;
    case 2:
      return Role.ChosenOne;
    case 3:
      return Role.LoneWanderer;
    case 30:
      return Role.Warrior;
    case 31:
      return Role.Courier;
    default:
      throw new CodecError('Unrecognized game.');
  }
};

export const sexToInt = (sex: ObjectValues<typeof Sex> & {}) => {
  switch (sex) {
    case Sex.Female:
      return 0;
    case Sex.Male:
      return 1;
    default:
      throw new CodecError('Unrecognized sex.');
  }
};

export const intToSex = (s: number) => {
  switch (s) {
    case 0:
      return Sex.Female;
    case 1:
      return Sex.Male;
    default:
      throw new CodecError('Unrecognized sex.');
  }
};

export function base64ToBytes(base64: string) {
  const binString = atob(base64);
  const converted = binString.split('').map((m) => m.codePointAt(0) || 0);
  return Uint8Array.from(converted);
}

export function bytesToBase64(bytes: Uint8Array) {
  const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join('');
  return btoa(binString);
}

export function genMask(width: number) {
  return 0b1111_1111_1111_1111_1111_1111_1111_1111 >>> (32 - width);
}

export function b2s(b: number, l = 8) {
  return '0b' + b.toString(2).padStart(l, '0');
}

export interface IFixedDescriptor {
  name: string;
  bits: number;
  encoder: (char: SerializedUnfinishedCharacter) => number;
  decoder: (alreadyAligned: number, mut: UnfinishedCharacter) => void;
}

export interface IVariableDescriptor {
  name: string;
  encoder: (char: SerializedUnfinishedCharacter) => Uint8Array;
  decoder: (data: Uint8Array, mut: UnfinishedCharacter) => void;
}

export type IPackingDescriptor = IFixedDescriptor | IVariableDescriptor;

export function packer<T extends UnfinishedCharacter>(
  orderedDescriptors: IPackingDescriptor[],
  char: ReturnType<T['toJSON']>
) {
  debug.disable();
  const buffer: number[] = [];
  let desc: IPackingDescriptor;
  let bigWorkpiece: Uint8Array;
  let workpiece = 0;
  let bitsUsed = 0;
  let pos = 0;
  let width = 0;
  let data: number | Uint8Array;
  let pinchItOff = false;
  for (let i = 0; i < orderedDescriptors.length; i += 1) {
    desc = orderedDescriptors[i];
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

export function unpacker<T extends UnfinishedCharacter>(
  packed: Uint8Array,
  orderedDescriptors: IPackingDescriptor[],
  mut: T
) {
  debug.disable();

  let desc: IPackingDescriptor;
  let pos = 0;
  let start = 0;
  let workpiece = 0;
  for (let i = 0; i < orderedDescriptors.length; i += 1) {
    desc = orderedDescriptors[i];
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

export function detectRoleBase64(base64: string) {
  const bytes = base64ToBytes(base64);
  return intToRole(bytes[0] >> 3);
}

export function charToBase64(char: UnfinishedCharacter) {
  return bytesToBase64(packer(char.getPackingDescriptors(), char.toJSON()));
}

export function base64ToChar(base64: string, newChar: UnfinishedCharacter) {
  return unpacker(
    base64ToBytes(base64),
    newChar.getPackingDescriptors(),
    newChar
  );
}
