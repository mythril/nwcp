<div class="digit">
  <slot />
</div>

<style lang="scss">
  .digit {
    box-sizing:border-box;
    position: relative;
    font-size: px(22);
    font-weight: 400;
    line-height: px(28);
    width: px(27);
    text-align:right;
    height:100%;
    border-top-left-radius: px(6) px(22);
    border-bottom-left-radius: px(6) px(22);
    background-color: hsl(0, 0%, 50%);
    color: hsl(0, 0%, 93%);
    padding-left: px(3);
    margin-left: px(-8);
    left:px(-3);
    font-family: label-font();
    text-shadow: text-outline(rgba(0, 0, 0, 0.8), true);
    box-shadow: inset 0 px(15) px(2) px(2) rgba(0, 0, 0, 0.5),
      px(-0.5) 0 px(0.6) px(0.1) rgba(255, 255, 255, 0.35),
      px(-1) 0 px(0.5) 0 rgba(0, 0, 0, 0.25),
      inset 0 px(-11) px(2) 0 rgba(0, 0, 0, 0.8),
      inset 0 px(6) px(2) 0 rgba(0, 0, 0, 0.8);
  }
</style>
