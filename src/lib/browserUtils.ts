import clickFile from '$lib/sounds/click2.wav?inline';
import bonkFile from '$lib/sounds/bonk.wav?inline';

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