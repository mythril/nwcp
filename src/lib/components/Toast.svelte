<script
  lang="ts"
  context="module"
>
  import { writable } from 'svelte/store';

  const ToastColors = {
    yellow: [60, 100, 50],
    red: [0, 100, 50],
    cyan: [180, 100, 50],
    green: [120, 100, 25.1],
    gray: [0, 0, 50.2]
  } as const;

  type Toast = {
    message: string;
    duration: number;
    color: keyof typeof ToastColors;
  };

  const EmptyToast: Toast = {
    message: '',
    duration: 5000,
    color: 'yellow'
  } as const;

  function createToaster() {
    const { subscribe, set } = writable<Toast>({
      message: '',
      duration: 5000,
      color: 'yellow'
    });

    // eslint-disable-next-line no-undef -- ?? some quirk with the language server
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
          color: 'cyan'
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
  import { clickSound, sleep } from '$lib/utils';
  import type { ObjectValues } from '$lib/typeUtils';

  let offset = Math.random() * 5;

  let message = '';
  let color: ObjectValues<typeof ToastColors> = ToastColors.yellow;

  const changeToast = async () => {
    if (offset !== 100) {
      offset = 100;
      await sleep(200);
    }
    message = $toast.message;
    color = ToastColors[$toast.color];
    offset = Math.random() * 5;
    clickSound();
  };

  $: if ($toast.message) {
    changeToast();
  } else {
    offset = 100;
    clickSound();
  }
</script>

<div class="toast-frame pitted">
  <div class="panel">
    <div class="viewport">
      <div
        style={`
      --toast-offset: ${offset};
      --toast-color-h: ${color[0]}deg;
      --toast-color-s: ${color[1]}%;
      --toast-color-l: ${color[2]}%;
      `}
        class="tile"
      >
        {message}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  @property --toast-offset {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
  }
  .toast-frame {
    padding-top: 4rem;
    padding-left: 10rem;
    display: flex;
    flex-flow: column;
    align-content: flex-start;
    position: absolute;
    right: 0;
    bottom: -9rem;
    /* bottom: 20rem; */
    width: 308rem;
    height: 46rem;
    background-color: hsl(var(--bg));
    box-shadow: var(--light-source);
    border-top-right-radius: 16rem;
    background-position-x: 329rem;
  }
  .panel {
    margin: 3rem;
    line-height: 22rem;
    font-size: 18rem;
    width: 275rem;
    height: 26rem;
    text-transform: uppercase;
    font-family: var(--label-font);
    color: #ddd;
    display: flex;
    flex-flow: row;
    background-color: hsl(var(--bakelite));
    /* prettier-ignore */
    box-shadow:
      1rem -1rem 1rem 0 rgba(0, 0, 0, 0.1)
      ,
      -1rem 1rem 1rem 0 rgba(255, 255, 255, 0.1)
      ;
    position: relative;
    &:after {
      --aged-glass-hs: 48, 50%;
      --hsl: 48, 70%, 50%;
      position: absolute;
      content: ' ';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      /* prettier-ignore */
      background-image: 
        linear-gradient(
          0.21turn,
          transparent 149rem,
          rgba(0,0,0,0.2) 150rem,
          hsla(var(--hsl), 0.2) 151rem,
          transparent 151rem
        ),
        linear-gradient(
          0.23turn,
          transparent 75rem,
          rgba(0,0,0,0.2) 76rem,
          hsla(var(--hsl), 0.2) 77rem,
          transparent 77rem
        ),
        linear-gradient(
          0.28turn,
          transparent 50rem,
          hsla(var(--hsl), 0.2) 51rem,
          rgba(0,0,0,0.2) 51rem,
          rgba(0,0,0,0.2) 52rem,
          transparent 52rem
        )
      ;
      /* prettier-ignore */
      box-shadow:
        inset 0 0 0 1rem hsla(0, 0%, 0%, 0.3),
        inset 0 0 3rem hsla(0, 0%, 100%, 0.2),
        inset 0 0 25rem hsla(var(--hsl), 0.1);
      backdrop-filter: blur(0.3rem);
    }
  }
  .viewport {
    width: 280rem;
    height: 26rem;
    text-align: center;
    margin: 1rem;
    background-color: rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    border-top: 2rem solid hsl(0deg, 0%, 5%);
    border-right: 2rem solid hsl(0deg, 0%, 7%);
    border-bottom: 2rem solid hsl(0deg, 0%, 10%);
    border-left: 2rem solid hsl(0deg, 0%, 15%);
    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      box-shadow: inset -2rem 2rem 5rem 0 hsl(0deg, 0%, 0%);
    }
  }
  .tile {
    --toast-color: var(--toast-color-h), var(--toast-color-s),
      var(--toast-color-l);
    --toast-offset: 100;
    will-change: --toast-offset, top;
    transition-property: --toast-offset, top;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transform: translateY(calc(var(--toast-offset) * 0.23rem));
    height: 25rem;
    overflow: hidden;
    position: relative;
    /* prettier-ignore */
    color: transparent;
    --hs: var(--toast-color-h), var(--toast-color-s);
    background-color: hsl(var(--hs), calc(var(--toast-color-l) / 8));
    /* prettier-ignore */
    text-shadow: 0 0 0 hsla(0, 0%, 70%, 1);
  }
</style>
