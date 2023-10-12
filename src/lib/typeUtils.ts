import type { Equals } from 'tsafe';

export type ObjectValues<T> = T[keyof T];

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Constructable = { new (...args: any[]): object };
export type SetHas<Set, Element> = Equals<Extract<Set, Element>, Element>;
