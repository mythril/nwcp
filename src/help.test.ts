import { describe, it, expect } from 'vitest';
import { UnfinishedChosenOne } from '$lib/engines/ChosenOne/Unfinished';
import { UnfinishedVaultDweller } from '$lib/engines/VaultDweller/Unfinished';
import { UnfinishedWarrior } from '$lib/engines/Warrior/Unfinished';
import { UnfinishedCourier } from '$lib/engines/Courier/Unfinished';
import { UnfinishedLoneWanderer } from '$lib/engines/LoneWanderer/Unfinished';
import type { UnfinishedCharacter } from '$lib/engines/UnfinishedCharacter';
import { Special } from '$lib/engines/all';
import { CharacterHelpLookup } from '$lib/engines/help';

const getInfos = (a: UnfinishedCharacter) => {
  return {
    ...a.skillInfo,
    ...a.traitInfo,
    ...a.derivedStatInfo
  };
};

describe('Verifies help entries for every help source', () => {
  for (const unfinished of [
    UnfinishedVaultDweller,
    UnfinishedChosenOne,
    UnfinishedWarrior,
    UnfinishedLoneWanderer,
    UnfinishedCourier
  ]) {
    describe(`${unfinished.name} has all help entries`, () => {
      const char = new unfinished();
      const infos = getInfos(char);

      for (const value of Object.values(infos)) {
        it(`${value} has a help entry for ${unfinished.name}`, () => {
          expect(char.getHelp(value)).toBeTypeOf('string');
          expect(char.getHelp(value)).toBeTruthy();
        });
      }
    });
  }
  describe(`SPECIAL has all help entries`, () => {
    for (const value of Object.values(Special)) {
      it(`${value} has a help entry for SPECIAL`, () => {
        expect(CharacterHelpLookup[value]).toBeTypeOf('string');
        expect(CharacterHelpLookup[value]).toBeTruthy();
      });
    }
  });
  describe(`UI has all help entries`, () => {
    const UIElements = [
      'Optional Traits',
      'Character Points',
      'Hit Points',
      'Skills',
      'Tag Skills'
    ];
    for (const value of UIElements) {
      it(`${value} has a help entry for UI`, () => {
        expect(CharacterHelpLookup[value]).toBeTypeOf('string');
        expect(CharacterHelpLookup[value]).toBeTruthy();
      });
    }
  });
});
