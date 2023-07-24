<script lang="ts">
  import { helpSubject, helpText } from './stores';

  let text = '';
  let extra = '';
  $: {
    if (typeof $helpText === 'string') {
      text = $helpText;
      extra = '';
    } else {
      text = $helpText[0];
      extra = $helpText[1];
    }
  }
</script>

<div class="paper-bg" />
<div class="content">
  <h3 class="subject">
    {$helpSubject}
    <span class="extra">{extra}</span>
  </h3>
  <div class="help">
    {text}
  </div>
</div>

<style lang="scss">
  .content {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    padding: px(17) px(20);
    .subject {
      font-family: var(--label-font);
      padding: 0;
      width: 100%;
      border-bottom: px(2) solid #000;
      margin: 0;
      margin-bottom: px(10);
      font-size: px(30);
      line-height: 1.5;
      .extra {
        &:not(:empty)::before {
          content: 'Base: ';
        }
        font-family: var(--terminal-font);
        font-weight: 700;
        font-size: px(10);
      }
    }
    .help {
      font-weight: 700;
      width: px(200);
      height: px(160);
    }
  }
  .paper-bg {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    box-shadow: px(0) px(0) px(1) px(1) rgba(#000, 1) inset;
    background: linear-gradient(
        0.3turn,
        rgba(#947c60, 0),
        rgba(#997530, 0) px(300),
        rgba(#ac8044, 0.35) px(310),
        rgba(#7c6818, 0.35) px(312),
        rgba(#947c60, 0.35) px(322)
      ),
      linear-gradient(
        0.32turn,
        rgba(#947c60, 0),
        rgba(#997530, 0) px(400),
        rgba(#ac8044, 0.75) px(410),
        rgba(#7c6818, 0.75) px(412),
        rgba(#947c60, 0.75) px(422),
        rgba(#ac8044, 0.75) px(425),
        rgba(#7c6818, 0.75) px(432),
        rgba(#947c60, 0.75) px(440)
      ),
      linear-gradient(
        0.25turn,
        #947c60,
        #997530 px(212),
        #ac8044 px(223),
        #7c6818 px(225),
        #947c60 px(240)
      );
    filter: url(#paper);
  }
</style>
