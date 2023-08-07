import clickFile from '$lib/sounds/click2.wav';
import bonkFile from '$lib/sounds/bonk.wav';

export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.onabort = () => reject(new Error('Read aborted'));
    reader.readAsDataURL(blob);
  });
}

// preload, only one instance (module singleton)
const preloads: HTMLAudioElement[] = [];
const clickAudio = new Audio(clickFile);
preloads.push(clickAudio);
const bonkAudio = new Audio(bonkFile);
preloads.push(bonkAudio);

async function preloader() {
  for (const preload of preloads) {
    try {
      // keeps the audio from being truncated
      preload.preload = 'auto';
      preload.volume = 0;
      await preload.play();
    } catch {
      // this is an expected error when we don't care if sound is played or not
    } finally {
      preload.volume = 1;
    }
  }
}
preloader();

export async function clickSound() {
  clickAudio.currentTime = 0;
  try {
    await clickAudio.play();
  } catch (e) {
    // silence the useless error
  }
}

export async function bonkSound() {
  bonkAudio.currentTime = 0;
  try {
    await bonkAudio.play();
  } catch (e) {
    // silence the useless error
  }
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

export type ObjectValues<T> = T[keyof T];
