<script lang="ts">
  export let dir: 'tl' | 'tr' | 'bl' | 'br' | 'ml' | 'mr';
  export let size = 8;
</script>

<div
  style="--in-size: {size}"
  class:bolthead={true}
  class={dir}
/>

<style lang="scss">
  .bolthead {
    // @TODO use scale instead of this gibberish
    --size: #{px(8)};
    --offset: calc(var(--size) / 2);
    --halfSize: calc(var(--size) / 2);
    position: absolute;
    display: block;
    width: var(--size);
    height: var(--size);
    border-radius: 100%;
    background-color: #777;
    transform-origin: center;
    transform: scale(calc(var(--in-size) / 8));
    filter: brightness(0.8);
    /* prettier-ignore */
    box-shadow: 
      px(0) px(0) px(3) 0 rgba(0, 0, 0, 1),
      px(-1) px(1) px(1) 0 rgba(0, 0, 0, 1),
      px(3) px(-3) px(1) 0 rgba(0, 0, 0, 0.9) inset,
      px(-3) px(3) px(1) 0 rgba(255, 255, 255, 0.5) inset,
      px(1) px(-1) px(1) 0 rgba(255, 255, 255, 0.7) inset;
    --rotation-scrambling: 0deg;
    &::after {
      content: ' ';
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      opacity: 0.35;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(0, 0, 0, 0) 37.5%,
        rgba(0, 0, 0, 1) 37.5%,
        rgba(0, 0, 0, 1) 50%,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 1) 62.5%,
        rgba(0, 0, 0, 0) 62.5%,
        rgba(0, 0, 0, 0) 100%
      );
      transform-origin: center;
      transform: rotate(var(--rotation-scrambling));
    }
    &:nth-of-type(6n)::after {
      --rotation-scrambling: 25deg;
    }
    &:nth-of-type(6n + 1)::after {
      --rotation-scrambling: 50deg;
    }
    &:nth-of-type(6n + 2)::after {
      --rotation-scrambling: 75deg;
    }
    &:nth-of-type(6n + 3)::after {
      --rotation-scrambling: 100deg;
    }
    &:nth-of-type(6n + 4)::after {
      --rotation-scrambling: 125deg;
    }
    &:nth-of-type(6n + 5)::after {
      --rotation-scrambling: 150deg;
    }
  }
  .tl {
    transform-origin: top left;
    left: var(--offset);
    top: var(--offset);
  }
  .tr {
    transform-origin: top right;
    right: var(--offset);
    top: var(--offset);
  }
  .bl {
    transform-origin: bottom left;
    left: var(--offset);
    bottom: var(--offset);
  }
  .br {
    transform-origin: bottom right;
    right: var(--offset);
    bottom: var(--offset);
  }
  .ml {
    transform-origin: center left;
    left: var(--offset);
    top: 50%;
    margin-top: calc(-1 * var(--halfSize));
  }
  .mr {
    transform-origin: center right;
    right: var(--offset);
    top: 50%;
    margin-top: calc(-1 * var(--halfSize));
  }
</style>
