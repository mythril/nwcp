<script lang="ts">
  import { OrderedDescriptors, packer, unpacker } from '$lib/codec';
  import debug from '$lib/debug';
  import { Game } from '$lib/engines/all';
  import {
    Special,
    type LVL1Character,
    Trait,
    Skill,
    Sex
  } from '$lib/engines/ChosenOne/main';
  import { faker } from '@faker-js/faker/locale/af_ZA';

  export const charGen = (): LVL1Character => {
    const traits = faker.helpers.arrayElements(Object.values(Trait), {
      min: 0,
      max: 2
    });

    traits[0] = traits[0] || undefined;
    traits[1] = traits[1] || undefined;

    const tagged = faker.helpers.arrayElements(Object.values(Skill), {
      min: 0,
      max: 3
    });

    tagged[0] = tagged[0] || undefined;
    tagged[1] = tagged[1] || undefined;
    tagged[2] = tagged[2] || undefined;

    const sex = faker.person.sex();

    return {
      game: Game.ChosenOne,
      name: faker.person.firstName(sex === 'female' ? 'female' : 'male'),
      age: faker.number.int({ min: 16, max: 35 }),
      sex: sex === 'female' ? Sex.Female : Sex.Male,
      attributes: {
        [Special.Strength]: faker.number.int({ min: 1, max: 10 }),
        [Special.Perception]: faker.number.int({ min: 1, max: 10 }),
        [Special.Endurance]: faker.number.int({ min: 1, max: 10 }),
        [Special.Charisma]: faker.number.int({ min: 1, max: 10 }),
        [Special.Intelligence]: faker.number.int({ min: 1, max: 10 }),
        [Special.Agility]: faker.number.int({ min: 1, max: 10 }),
        [Special.Luck]: faker.number.int({ min: 1, max: 10 })
      },
      traits,
      tagged
    };
  };

  faker.seed(45);

  for (let i = 0; i < 10000; i += 1) {
    let char = charGen();
    let packed = packer(char);
    let unpacked = unpacker(packed);
    faker.helpers.shuffle(OrderedDescriptors, { inplace: true });
    if (
      JSON.stringify(char, Object.keys(char).sort()) !==
      JSON.stringify(unpacked, Object.keys(unpacked).sort())
    ) {
      throw 'Pack/unpack issue detected.';
    }
  }
  debug.enable();
  debug.info('Clean.');
</script>
