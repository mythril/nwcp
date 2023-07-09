<script lang="ts">
  export let value: number | undefined = undefined;
  let next: string;
  let current: string;
  let prev: string;
  $: {
    if (value === undefined) {
      next = '';
      current = '';
      prev = '';
    } else {
      next = ((value + 1) % 10).toFixed(0);
      current = (value % 10).toFixed(0);
      prev = ((value - 1) % 10).toFixed(0);
    }
  }
</script>

<div class="digit">
  <div class="animwrap">
    <div class="next">
      {next}
    </div>
    <div class="current">
      {current}
    </div>
    <div class="prev">
      {prev}
    </div>
  </div>
</div>

<style lang="scss">
  .digit {
    box-sizing:border-box;
    position: relative;
    font-size: px(23);
    font-weight: 400;
    line-height: px(30);
    width: px(30);
    height:100%;
    border-top-left-radius: px(6) px(22);
    border-bottom-left-radius: px(6) px(22);
    background-color: hsl(0, 0%, 50%);
    color: hsl(0, 0%, 93%);
    padding-left: px(5);
    margin-left: px(-8);
    left:px(-3);
    font-family: label-font();
    text-shadow: text-outline(rgba(0, 0, 0, 0.8), true);
    box-shadow: inset 0 px(15) px(2) px(2) rgba(0, 0, 0, 0.5),
      px(-0.5) 0 px(0.6) px(0.1) rgba(255, 255, 255, 0.35),
      px(-1) 0 px(0.5) 0 rgba(0, 0, 0, 0.25),
      inset 0 px(-11) px(2) 0 rgba(0, 0, 0, 0.8),
      inset 0 px(6) px(2) 0 rgba(0, 0, 0, 0.8);
    .next,.prev,.current{
      height:px(35);
    }
  }
  .animwrap {
    position: absolute;
    top: -100%;
    display:flex;
    flex-flow:column;
    transition:top 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
</style>
