<script lang="ts">
  import GeneratedImageCacher from '$lib/components/GeneratedImageCacher.svelte';
  import './WornText.postcss';

  const desc = {
    name: 'worn-text',
    width: 250,
    height: 75,
    applyToProperties: ['-webkit-mask-image', 'mask-image']
  };
</script>

<GeneratedImageCacher {desc}>
  <svg>
    <defs>
      <filter id="worn-text">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.09"
          numOctaves="6"
          stitchTiles="stitch"
          seed="1"
        />
        <feBlend
          in="SourceGraphic"
          in2="worn-text"
          mode="multiply"
        />
        <feMorphology
          operator="dilate"
          radius="1"
        />
        <feColorMatrix type="luminanceToAlpha" />
        <feComponentTransfer>
          <feFuncA
            type="table"
            tableValues="-50 0.5 1 -1"
          />
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>
</GeneratedImageCacher>
