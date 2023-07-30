<div class="digit">
  <slot />
</div>

<style lang="postcss">
  .digit {
    position: relative;
    &::before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-top-left-radius: 6rem 22rem;
      border-bottom-left-radius: 6rem 22rem;
      background-color: hsl(0, 0%, 50%);
      /* prettier-ignore */
      box-shadow: 
      -1rem 0 0.6rem 0.1rem rgba(0, 0, 0, 0.9),
        inset 0 15rem 2rem 2rem rgba(0, 0, 0, 0.5),
        0 0 0 1rem rgba(0, 0, 0, 0.5),
        -1rem 0 0 1rem rgba(255, 255, 255, 0.15),
        -1rem 0 0.6rem 0.1rem rgba(0, 0, 0, 0.9),
        inset 0 -11rem 2rem 0 rgba(0, 0, 0, 0.8),
        inset 0 6rem 2rem 0 rgba(0, 0, 0, 0.8);
    }
    font-family: var(--label-font);
    font-weight: 700;
    left: -3rem;
    padding-left: 4rem;
    margin-left: -8rem;
    box-sizing: border-box;
    font-size: 28rem;
    line-height: 29rem;
    width: 27rem;
    text-align: center;
    height: 100%;
  }
</style>
