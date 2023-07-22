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

export function clickSound() {
  clickAudio.play();
}

export function bonkSound() {
  clickAudio.play();
}
