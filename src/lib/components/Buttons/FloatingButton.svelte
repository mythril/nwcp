<script lang="ts">
  export let message = '';
  export let color: string | undefined = undefined;
</script>

{#if message != ''}
  <div
    role="button"
    style={color ? `--banding: ${color}` : ''}
    tabindex="0"
    class="floating-button-wrap"
  >
    <div class="floating-button terminal-font-defaults">
      {message}
    </div>
  </div>
{/if}

<style lang="postcss">
  .floating-button-wrap {
    position: absolute;
    z-index: 3;
    bottom: 50rem;
    right: 50rem;
    /* prettier-ignore */
    background-image:
      linear-gradient(
        0.25turn,
        #3c3c3c 0,
        #3c3c3c 9rem,
        black 9rem,
        black 10rem,
        transparent 11rem
      ),
      linear-gradient(
        0.75turn,
        #3c3c3c 0,
        #3c3c3c 9rem,
        black 9rem,
        black 10rem,
        transparent 10rem
      ),
      repeating-linear-gradient(
        -45deg,
        var(--banding, hsl(60, 95.5%, 73.7%)) 0,
        var(--banding, hsl(60, 95.5%, 73.7%)) 9rem,
        #1c1c1c 10rem,
        #1c1c1c 19rem,
        var(--banding, hsl(60, 95.5%, 73.7%)) 20rem
      )
;
    padding: 3rem 5rem;
    /* prettier-ignore */
    box-shadow:
      -5rem 5rem 5rem black,
      var(--light-source),
      var(--underbelly-shadow);
  }
  .floating-button {
    color: var(--banding, hsla(var(--terminal-color)));
    min-width: 100rem;
    padding: 0 10rem;
    background-color: hsl(var(--terminal-bg));
    text-align: center;
    line-height: 2;
    border-radius: 3rem;
    box-shadow: 2rem -2rem 2rem rgba(0, 0, 0, 0.7);
  }
</style>
