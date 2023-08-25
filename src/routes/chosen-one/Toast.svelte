<script
  lang="ts"
  context="module"
>
  import { writable } from 'svelte/store';

  type Toast = {
    message: string;
    duration: number;
    color: string | undefined;
  };

  const EmptyToast: Toast = {
    message: '',
    duration: 5000,
    color: undefined
  } as const;

  function createToaster() {
    const { subscribe, set } = writable<Toast>({
      message: '',
      duration: 5000,
      color: undefined
    });

    // eslint-disable-next-line no-undef
    let timer: string | number | NodeJS.Timeout | undefined;

    const w = {
      subscribe,
      show: ({
        message = EmptyToast.message,
        duration = EmptyToast.duration,
        color = EmptyToast.color
      }: Partial<Toast>) => {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
        set({ message, duration, color });
        timer = setTimeout(w.reset, duration);
      },
      error: (tst: Error | Partial<Toast>) => {
        if (tst instanceof Error) {
          w.show({
            message: tst.message,
            color: 'red'
          });
          return;
        }
        w.show({
          ...tst,
          color: 'red'
        });
      },
      info: (tst: Partial<Toast>) => {
        w.show({
          ...tst,
          color: 'blue'
        });
      },
      success: (tst: Partial<Toast>) => {
        w.show({
          ...tst,
          color: 'green'
        });
      },
      neutral: (tst: Partial<Toast>) => {
        w.show({
          ...tst,
          color: 'gray'
        });
      },
      reset: () => {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
        set({ ...EmptyToast });
      }
    };
    return w;
  }

  export const toast = createToaster();
</script>

<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  const keyHandler = (ev: KeyboardEvent) => {
    if (ev.code === 'Enter') {
      toast.reset();
    }
  };
</script>

{#if $toast.message != ''}
  <div
    role="button"
    style={$toast.color ? `--banding: ${$toast.color}` : ''}
    tabindex="0"
    on:keydown={keyHandler}
    class="toast-wrap"
    on:click={toast.reset}
    transition:fly={{ delay: 250, duration: 300, easing: quintOut, x: 1000 }}
  >
    <div class="toast terminal-font-defaults">
      {$toast.message}
    </div>
  </div>
{/if}

<style lang="postcss">
  .toast-wrap {
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
  .toast {
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
