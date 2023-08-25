<script lang="ts">
  import GeneratedImageCacher from '../Widgets/GeneratedImageCacher.svelte';
  import './Pitted.postcss';
</script>

<GeneratedImageCacher
  name="pitted"
  width={640 * 3}
  height={480 * 3}
  applyToProperties={['background-image']}
>
  <svg>
    <defs>
      <filter
        style="color-interpolation-filters:sRGB"
        id="pitted"
        x="0"
        y="0"
        width="100%"
        height="100%"
      >
        <feTurbulence
          baseFrequency="0.01 0.015"
          numOctaves="5"
          type="fractalNoise"
          stitchTiles="stitch"
          seed="112"
        />
        <feColorMatrix type="luminanceToAlpha" />
        <feColorMatrix
          values="
         1.0 0.0 0.0 0.0 0.0
         0.0 1.0 0.0 0.0 0.0
         0.0 0.0 1.0 0.0 0.0
         0.0 0.0 0.0 0.5 0.0
         "
        />
        <feComponentTransfer baseFrequency="0.050999999999999997">
          <feFuncR type="identity" />
          <feFuncG type="identity" />
          <feFuncB type="identity" />
          <feFuncA
            type="linear"
            amplitude="3.2268710399237204"
            exponent="1.0740385280819389"
            offset="0.26736789279513928"
            slope="10"
            intercept="-3.0063447498139881"
          />
        </feComponentTransfer>
        <feComponentTransfer result="compressedToBlack">
          <feFuncR type="identity" />
          <feFuncG type="identity" />
          <feFuncB type="identity" />
          <feFuncA
            type="linear"
            tableValues="0.1"
            slope="10"
            intercept="-1.310284326946924"
          />
        </feComponentTransfer>
        <feOffset
          dx="1"
          dy="-1"
          preserveAlpha="false"
        />
        <feGaussianBlur
          stdDeviation="0.25"
          result="neWhite"
        />
        <feOffset
          dx="-1"
          dy="1"
          in="compressedToBlack"
          preserveAlpha="false"
        />
        <feGaussianBlur stdDeviation="0.25" />
        <feComponentTransfer result="swBlack">
          <feFuncR
            type="table"
            tableValues="1 0"
          />
          <feFuncG
            type="table"
            tableValues="1 0"
          />
          <feFuncB
            type="table"
            tableValues="1 0"
          />
        </feComponentTransfer>
        <feComposite
          in="swBlack"
          in2="neWhite"
          operator="xor"
        />
        <feMorphology
          operator="erode"
          radius="1"
        />
        <feComponentTransfer result="pitting">
          <feFuncA
            type="table"
            tableValues="0 0.6"
          />
        </feComponentTransfer>
        <feTurbulence
          baseFrequency="0.00125 0.0025"
          numOctaves="5"
          type="fractalNoise"
          stitchTiles="stitch"
        />
        <feComponentTransfer>
          <feFuncR
            type="table"
            tableValues="0 0.05"
          />
          <feFuncG
            type="table"
            tableValues="0 0.12"
          />
          <feFuncB
            type="table"
            tableValues="0 0"
          />
          <feFuncA
            type="table"
            tableValues="0 0.4"
          />
        </feComponentTransfer>
        <feComponentTransfer result="colors">
          <feFuncA
            type="table"
            tableValues="0 0.7 1 0.2 "
          />
        </feComponentTransfer>
        <feBlend
          in="pitting"
          in2="colors"
          mode="normal"
        />
      </filter>
    </defs>
  </svg>
</GeneratedImageCacher>
