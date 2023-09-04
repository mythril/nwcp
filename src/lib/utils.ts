export const Raise = (message: string): never => {
  throw new Error(message);
};

export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.onabort = () => reject(new Error('Read aborted'));
    reader.readAsDataURL(blob);
  });
}

// This is a fast debouncer, in that it allows the event to fire before the
// grace period has elapsed, instead of after. Intended to be 1 instance per
// handler, though unless you have a crazy amount of handlers that fire over
// each other it probably wouldn't matter much
// returns true if the event should be handled, false if called before then
// debounce period has not elapsed since the last time the function returned
// true
export function createDebouncer(debouncePeriodMS = 100) {
  return (function () {
    let debounceExpiry = 0;
    return function () {
      if (+new Date() < debounceExpiry) {
        return false;
      }
      debounceExpiry = +new Date() + debouncePeriodMS;
      return true;
    };
  })();
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function includes<T extends U, U>(
  coll: ReadonlyArray<T>,
  el: U
): el is T {
  return coll.includes(el as T);
}

export function defaultValuesOf<T extends object>(
  obj: T,
  defaultValue: unknown
) {
  return Object.assign(
    {},
    ...Object.values(obj).map((a) => ({ [a]: defaultValue }))
  );
}
