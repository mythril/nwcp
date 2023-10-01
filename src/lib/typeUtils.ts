export type ObjectValues<T> = T[keyof T];

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Constructable = { new (...args: any[]): object };
