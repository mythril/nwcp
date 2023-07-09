<script lang="ts">
  export let dir: string;
</script>

<div
  class:bolthead={true}
  class:tl={dir == 'tl'}
  class:tr={dir == 'tr'}
  class:bl={dir == 'bl'}
  class:br={dir == 'br'}
  class:ml={dir == 'ml'}
  class:mr={dir == 'mr'}
/>

<style lang="scss">
  $size: 10;
  $offset: $size - 5;
  $thirdSize: math.div($size, 3);
  $halfSize: math.div($size, 2);
  .bolthead {
    position: absolute;
    display: block;
    width: px($size);
    height: px($size);
    border-radius: 100%;
    background-color: #777;
    box-shadow: px(-1) px(1) px(1) 0 rgba(0, 0, 0, 1),
      inset px($thirdSize) px(-$thirdSize) px(1) 0 rgba(0, 0, 0, 0.7),
      inset px(-$thirdSize) px($thirdSize) px(1) 0 rgba(255, 255, 255, 0.25);
    &::after {
      content: ' ';
      top: 50%;
      position: absolute;
      width: 100%;
      height: px(0);
      margin-top: px(-1);
      border-top: px(1) solid rgba(#000, 0.5);
      border-bottom: px(1) solid rgba(#fff, 0.25);
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
    left: px($offset);
    top: px($offset);
  }
  .tr {
    right: px($offset);
    top: px($offset);
  }
  .bl {
    left: px($offset);
    bottom: px($offset);
  }
  .br {
    right: px($offset);
    bottom: px($offset);
  }
  .ml {
    left: px($offset);
    top: 50%;
    margin-top: -$halfSize;
  }
  .mr {
    right: px($offset);
    top: 50%;
    margin-top: -$halfSize;
  }
</style>
