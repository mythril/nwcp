<script lang="ts">
  import GeneratedImageCacher from '$lib/components/GeneratedImageCacher.svelte';
  import './Pitted.postcss';
</script>

<GeneratedImageCacher
  name="pitted"
  width={640 * 4}
  height={480 * 4}
  applyToProperties={['background-image']}
>
  <svg>
    <defs>
      <filter
        style="color-interpolation-filters:sRGB"
        id="pitted"
      >
        <feTurbulence
          baseFrequency="0.01 0.015"
          numOctaves="5"
          type="fractalNoise"
          seed="126"
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
          dx="0.5"
          dy="-0.5"
          preserveAlpha="false"
        />
        <feGaussianBlur
          stdDeviation="0.5"
          result="neWhite"
        />
        <feOffset
          dx="-0.5"
          dy="0.5"
          in="compressedToBlack"
          preserveAlpha="false"
        />
        <feGaussianBlur stdDeviation="0.5" />
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
        <feComponentTransfer>
          <feFuncA
            type="table"
            tableValues="0 0.6"
          />
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>
</GeneratedImageCacher>
