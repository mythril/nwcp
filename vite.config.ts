import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
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
