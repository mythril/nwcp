<script lang="ts">
  import Bolthead from './Bolthead.svelte';
  import HelpSource from './HelpSource.svelte';
  import TwoDigitDisplay from './TwoDigitDisplay.svelte';
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
        initial={Math.round(Math.random() * 9 + 1)}
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
    height: 100%;
    .inset-border {
      border-radius: 2rem;
      box-shadow: var(--inset);
    }
    position: relative;
    border-radius: 2rem;
    border-bottom-left-radius: 5rem 3rem;
    display: flex;
    justify-content: space-between;
    padding-left: 4rem;
    padding-right: 16rem;
    align-items: center;
    .label {
      font-size: 23rem;
    }
  }
</style>
