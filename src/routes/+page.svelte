<script lang="ts">
  import { charGen, packer } from '$lib/codec';
  import { Game } from '$lib/engines/all';
  import { Special, type LVL1Character, Trait, Skill } from '$lib/engines/ChosenOne/main';

  // this is probably temporary, the plan is to flesh out other character
  // creators and/or move this project into isolation
  // window.location.assign('/chosen-one');

  function base64ToBytes(base64: string) {
    const binString = atob(base64);
    const converted = binString.split('').map((m) => m.codePointAt(0) || 0);
    return Uint8Array.from(converted);
  }

  function bytesToBase64(bytes: Uint8Array) {
    const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join(
      ''
    );
    return btoa(binString);
  }

  let c : LVL1Character = {
    game: Game.ChosenOne,
    name: 'test',
    age: 35,
    sex: 'Male',
    attributes: {
      [Special.Strength]: 1,
      [Special.Perception]: 2,
      [Special.Endurance]: 3,
      [Special.Charisma]: 4,
      [Special.Intelligence]: 5,
      [Special.Agility]: 6,
      [Special.Luck]: 7,
    },
    traits: [Trait.BloodyMess],
    tagged: [Skill.SmallGuns, Skill.LockPick, Skill.Speech],
  };

  let p = packer(c);

  console.log(c, p);

</script>
