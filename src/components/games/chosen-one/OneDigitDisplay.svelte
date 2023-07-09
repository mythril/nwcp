<script lang="ts">
  export let value: number | undefined = undefined;
  let prev: string;
  let current: string;
  let next: string;
  $: {
    if (value === undefined) {
      prev = ';';
      current = '';
      next = '';
    } else {
      prev = ((value - 1) % 10).toFixed(0);
      current = (value % 10).toFixed(0);
      next = ((value + 1) % 10).toFixed(0);
    }
  }
</script>

<div class="digit">
  <div class="prev">
    {prev}
  </div>
  <div class="current">
    {current}
  </div>
  <div class="next">
    {next}
  </div>
</div>

<style lang="scss">
  .digit {
    position: relative;
    font-size: px(23);
    font-weight: 400;
    line-height: px(30);
    width: px(22);
    border-top-left-radius: px(6) px(22);
    border-bottom-left-radius: px(6) px(22);
    padding: px(2) px(7) px(5) px(6);
    background-color: hsl(0, 0%, 50%);
    color: hsl(0, 0%, 93%);
    margin-left: px(-12);
    font-family: label-font();
    text-shadow: text-outline(rgba(0, 0, 0, 0.8), true);
    box-shadow: inset 0 px(15) px(2) px(2) rgba(0, 0, 0, 0.5),
      px(-0.5) 0 px(0.6) px(0.1) rgba(255, 255, 255, 0.35),
      px(-1) 0 px(0.5) 0 rgba(0, 0, 0, 0.25),
      inset 0 px(-11) px(2) 0 rgba(0, 0, 0, 0.8),
      inset 0 px(6) px(2) 0 rgba(0, 0, 0, 0.8);
  }
  .prev,
  .current,
  .next {
    position: absolute;
  }
  .current {
    top: 0%;
  }
  .prev {
    top: -100%;
  }
  .next {
    top: 100%;
  }
</style>
