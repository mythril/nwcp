<script lang="ts">
  import Bolthead from './Widgets/Bolthead.svelte';
  import HelpSource from './HelpSource.svelte';
  import TwoDigitDisplay from './Widgets/TwoDigitDisplay.svelte';
  import { toast } from './Toast.svelte';
  import { charPointsRemaining } from './CharacterStore';

  let tdd: TwoDigitDisplay;

  export const bonkDown = () => {
    if (tdd) {
      tdd.set(-1);
    }
    toast.error({ message: 'YOU NEED MORE CHARACTER POINTS.' });
  };

  charPointsRemaining.subscribe((val) => {
    if (tdd) {
      tdd.set(val);
    }
  });
</script>

<div class="char-points">
  <HelpSource subject="Character Points">
    <div
      role="link"
      tabindex="0"
      class="label worn-text"
    >
      CHAR POINTS
    </div>
    <div class="inset-border">
      <TwoDigitDisplay
        value={5}
        bind:this={tdd}
        min={0}
        max={70}
      />
    </div>
    <Bolthead dir="tl" />
    <Bolthead dir="tr" />
    <Bolthead dir="bl" />
    <Bolthead dir="br" />
  </HelpSource>
</div>

<style lang="postcss">
  .char-points {
    width: 100%;
    height: 50rem;
    position: relative;
    border-radius: 2rem;
    border-bottom-left-radius: 5rem 3rem;
    display: flex;
    justify-content: space-between;
    padding-left: 4rem;
    padding-right: 16rem;
    align-items: center;
    .inset-border {
      border-radius: 2rem;
      box-shadow: var(--inset);
    }
    .label {
      font-size: 16rem;
    }
  }
</style>
