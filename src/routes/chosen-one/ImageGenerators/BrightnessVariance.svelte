<script lang="ts">
  import GeneratedImageCacher from '../Widgets/GeneratedImageCacher.svelte';
  import './BrightnessVariance.postcss';
</script>

<GeneratedImageCacher
  name="brightness-variance"
  width={640 * 2}
  height={480 * 2}
  applyToProperties={['background-image']}
>
  <svg>
    <defs>
      <filter
        style="color-interpolation-filters:sRGB"
        id="brightness-variance"
      >
        <feTurbulence
          baseFrequency="0.05 0.025"
          numOctaves="5"
          type="fractalNoise"
        />
        <feComponentTransfer>
          <feFuncR
            type="table"
            tableValues="0 0.25"
          />
          <feFuncG
            type="table"
            tableValues="0 0.25"
          />
          <feFuncB
            type="table"
            tableValues="0 0.25"
          />
          <feFuncA
            type="table"
            tableValues="0 0.35"
          />
        </feComponentTransfer>
        <feColorMatrix
          type="saturate"
          values="0"
        />
        <feComponentTransfer>
          <feFuncA
            type="table"
            tableValues="0 0.7 1 0.2 "
          />
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>
</GeneratedImageCacher>
