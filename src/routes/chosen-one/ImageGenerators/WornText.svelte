<script lang="ts">
  import GeneratedImageCacher from '../Widgets/GeneratedImageCacher.svelte';
  import './WornText.postcss';
</script>

<GeneratedImageCacher
  name="worn-text"
  width={250}
  height={75}
  applyToProperties={['-webkit-mask-image', 'mask-image']}
>
  <svg>
    <defs>
      <filter id="worn-text">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.09"
          numOctaves="6"
          stitchTiles="stitch"
          seed="1"
          result="noise"
        />
        <feBlend
          in="SourceGraphic"
          in2="noise"
          mode="multiply"
        />
        <feMorphology
          operator="dilate"
          radius="1"
        />
        <feColorMatrix type="luminanceToAlpha" />
        <feComponentTransfer>
          <feFuncA
            type="discrete"
            tableValues="0 0 1 0.7 0 1 "
          />
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>
</GeneratedImageCacher>
