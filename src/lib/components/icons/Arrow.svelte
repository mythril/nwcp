<script lang="ts">
  import type { ObjectValues } from '$lib/utils';

  export let stout = false;
  export let wornText = false;
  const Direction = {
    Left: 'Left',
    Right: 'Right',
    Up: 'Up',
    Down: 'Down'
  } as const;
  type DIRECTION = ObjectValues<typeof Direction>;

  export let dir: DIRECTION = 'Right';

  let dirDegrees = 0;
  switch (dir) {
    case Direction.Left:
      dirDegrees = 180;
      break;
    case Direction.Right:
      dirDegrees = 0;
      break;
    case Direction.Up:
      dirDegrees = 270;
      break;
    case Direction.Down:
      dirDegrees = 90;
      break;
  }
</script>

<div
  style="
  --stout:{stout ? 0.6 : 1};
  --direction:{dirDegrees};
  "
  class="arrow {wornText ? 'worn-text' : ''}"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 7.4 4.8"><path d="M3.4 0v1.3H0v2.1h3.4v1.4l4-2.4Z" /></svg
  >
</div>

<style lang="scss">
  .arrow {
    width: 100%;
    height: 100%;
  }
  .arrow svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0;
    padding: 0;
    transform: rotate(calc(var(--direction) * 1deg)) scaleX(var(--stout));
  }
</style>
