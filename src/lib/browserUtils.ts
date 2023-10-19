import clickFile from '$lib/sounds/click2.wav?inline';
import bonkFile from '$lib/sounds/bonk.wav?inline';
import { isEmbedded } from './utils';

const whenSoundShouldBePlayed = +new Date() + 1000;
const now = () => {
  return +new Date();
};

export async function clickSound() {
  if (isEmbedded()) {
    return;
  }
  if (now() < whenSoundShouldBePlayed) {
    return;
  }
  const clickAudio = new Audio(clickFile);
  clickAudio.currentTime = 0;
  try {
    await clickAudio.play();
  } catch (e) {
    // silence the useless error
  }
}

export async function bonkSound() {
  if (isEmbedded()) {
    return;
  }
  if (now() < whenSoundShouldBePlayed) {
    return;
  }
  const bonkAudio = new Audio(bonkFile);
  bonkAudio.currentTime = 0;
  try {
    await bonkAudio.play();
  } catch (e) {
    // silence the useless error
  }
}
