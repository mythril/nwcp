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
    --size: calc(var(--in-size) * #{px(1)});
    --offset: calc(var(--size) / 2);
    --thirdSize: calc(var(--size) / 3);
    --halfSize: calc(var(--size) / 2);
    position: absolute;
    display: block;
    width: var(--size);
    height: var(--size);
    border-radius: 100%;
    background-color: #777;
    /* prettier-ignore */
    box-shadow: 
      px(0) px(0) px(3) 0 rgba(0, 0, 0, 1),
      px(-1) px(1) px(1) 0 rgba(0, 0, 0, 1),
      var(--thirdSize) calc(-1 * var(--thirdSize)) px(1) 0 rgba(0, 0, 0, 0.9) inset,
      calc(-1 * var(--thirdSize)) var(--thirdSize) px(1) 0 rgba(255, 255, 255, 0.5) inset,
      px(1) px(-1) px(1) 0 rgba(255, 255, 255, 0.7) inset;
    &::after {
      content: ' ';
      top: 50%;
      position: absolute;
      width: 100%;
      height: px(0);
      border-top: px(2) solid rgba(#000, 0.5);
      border-bottom: px(2) solid rgba(#fff, 0.25);
      transform-origin: center;
    }
    &:nth-of-type(6n)::after {
      transform: rotate(25deg);
    }
    &:nth-of-type(6n + 1)::after {
      transform: rotate(50deg);
    }
    &:nth-of-type(6n + 2)::after {
      transform: rotate(75deg);
    }
    &:nth-of-type(6n + 3)::after {
      transform: rotate(100deg);
    }
    &:nth-of-type(6n + 4)::after {
      transform: rotate(125deg);
    }
    &:nth-of-type(6n + 5)::after {
      transform: rotate(150deg);
    }
  }
  .tl {
    left: var(--offset);
    top: var(--offset);
  }
  .tr {
    right: var(--offset);
    top: var(--offset);
  }
  .bl {
    left: var(--offset);
    bottom: var(--offset);
  }
  .br {
    right: var(--offset);
    bottom: var(--offset);
  }
  .ml {
    left: var(--offset);
    top: 50%;
    margin-top: calc(-1 * var(--halfSize));
  }
  .mr {
    right: var(--offset);
    top: 50%;
    margin-top: calc(-1 * var(--halfSize));
  }
</style>
