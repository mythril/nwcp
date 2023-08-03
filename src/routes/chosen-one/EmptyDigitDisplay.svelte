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
      background-color: hsl(0, 0%, 35%);
      /* subtle, but fun */
      transform: translateY(calc(var(--offset) * 5rem));
      /* prettier-ignore */
      box-shadow: 
      -0.5rem 0 0.3rem 0.05rem rgba(0, 0, 0, 0.7),
        inset 0 7rem 1rem 1rem rgba(0, 0, 0, 0.5),
        0 0 0 0.5rem rgba(0, 0, 0, 0.5),
        -0.5rem 0 0 0.5rem rgba(255, 255, 255, 0.15),
        -0.5rem 0 0.3rem 0.1rem rgba(0, 0, 0, 0.9),
        inset 0 -9rem 2rem 0 rgba(0, 0, 0, 0.5),
        inset 0 6rem 2rem 0 rgba(0, 0, 0, 0.5);
    }
    font-family: var(--label-font);
    font-weight: 700;
    left: -3rem;
    padding-left: 3.5rem;
    margin-left: -2rem;
    box-sizing: border-box;
    font-size: 18rem;
    line-height: 22rem;
    width: 16rem;
    text-align: center;
    height: 22rem;
  }
</style>
