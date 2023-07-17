import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

/** @type {import('vite').UserConfig} */

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      strategies: 'injectManifest',
      srcDir: 'src/service-worker/',
      filename: 'index.js',
    })
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
			  @use 'sass:math';
			  @import '$lib/scss/variables';
			  @import '$lib/scss/mixins';
			  @import '$lib/scss/functions';
			  @import '$lib/scss/colors';
			`
      }
    }
  }
});
