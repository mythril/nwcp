<div class="digit">
  <slot />
</div>

<style lang="scss">
  .digit {
    position: relative;
    &::before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-top-left-radius: px(6) px(22);
      border-bottom-left-radius: px(6) px(22);
      background-color: hsl(0, 0%, 50%);
      box-shadow: inset 0 px(15) px(2) px(2) rgba(0, 0, 0, 0.5),
        px(-0.5) 0 px(0.6) px(0.1) rgba(255, 255, 255, 0.35),
        px(-1) 0 px(0.5) 0 rgba(0, 0, 0, 0.25),
        inset 0 px(-11) px(2) 0 rgba(0, 0, 0, 0.8),
        inset 0 px(6) px(2) 0 rgba(0, 0, 0, 0.8);
      filter: blur(px(0.5));
    }
    color: hsl(0, 0%, 93%);
    font-family: label-font();
    font-weight: 700;
    text-shadow: text-outline(rgba(0, 0, 0, 0.8), true);
    left: px(-3);
    padding-left: px(5);
    margin-left: px(-8);
    box-sizing: border-box;
    font-size: px(28);
    line-height: px(28);
    width: px(27);
    text-align: center;
    height: 100%;
  }
</style>
