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
        inset 0 15rem 2rem 2rem rgba(0, 0, 0, 0.5),
        -0.5rem 0 0.6rem 0.1rem rgba(255, 255, 255, 0.35),
        -1rem 0 0.5rem 0 rgba(0, 0, 0, 0.25),
        inset 0 -11rem 2rem 0 rgba(0, 0, 0, 0.8),
        inset 0 6rem 2rem 0 rgba(0, 0, 0, 0.8);
      filter: blur(0.5rem);
    }
    color: hsl(0, 0%, 93%);
    font-family: var(--label-font);
    font-weight: 700;
    /* prettier-ignore */
    text-shadow: 
      1rem 1rem 0 rgba(0, 0, 0, 0.8),
      -1rem 1rem 0 rgba(0, 0, 0, 0.8),
      1rem -1rem 0 rgba(0, 0, 0, 0.8),
      -1rem -1rem 0 rgba(0, 0, 0, 0.8);
    left: -3rem;
    padding-left: 5rem;
    margin-left: -8rem;
    box-sizing: border-box;
    font-size: 28rem;
    line-height: 28rem;
    width: 27rem;
    text-align: center;
    height: 100%;
  }
</style>
