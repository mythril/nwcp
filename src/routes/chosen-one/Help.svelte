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
    padding: 17rem 20rem;
    .subject {
      font-family: var(--label-font);
      padding: 0;
      width: 100%;
      border-bottom: 2rem solid #000;
      margin: 0;
      margin-bottom: 10rem;
      font-size: 30rem;
      line-height: 1.5;
      .extra {
        &:not(:empty)::before {
          content: 'Base: ';
        }
        font-family: var(--terminal-font);
        font-weight: 700;
        font-size: 10rem;
      }
    }
    .help {
      font-weight: 700;
      width: 200rem;
      height: 160rem;
    }
  }
  .paper-bg {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1rem 1rem rgba(#000, 1) inset;
    background: linear-gradient(
        0.3turn,
        rgba(#947c60, 0),
        rgba(#997530, 0) 300rem,
        rgba(#ac8044, 0.35) 310rem,
        rgba(#7c6818, 0.35) 312rem,
        rgba(#947c60, 0.35) 322rem
      ),
      linear-gradient(
        0.32turn,
        rgba(#947c60, 0),
        rgba(#997530, 0) 400rem,
        rgba(#ac8044, 0.75) 410rem,
        rgba(#7c6818, 0.75) 412rem,
        rgba(#947c60, 0.75) 422rem,
        rgba(#ac8044, 0.75) 425rem,
        rgba(#7c6818, 0.75) 432rem,
        rgba(#947c60, 0.75) 440rem
      ),
      linear-gradient(
        0.25turn,
        #947c60,
        #997530 212rem,
        #ac8044 223rem,
        #7c6818 225rem,
        #947c60 240rem
      );
    filter: url(#paper);
  }
</style>
