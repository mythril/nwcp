import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import fs from 'fs';

export default ({ mode }: { mode: string }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  return defineConfig({
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
    },
    server: {
      host: 'nwcp.local',
      port: 8080,
      https: {
        cert: process.env.VITE_CERT_FILE
          ? fs.readFileSync(process.env.VITE_CERT_FILE)
          : undefined,
        key: process.env.VITE_KEY_FILE
          ? fs.readFileSync(process.env.VITE_KEY_FILE)
          : undefined
      }
    },
    build: {
      rollupOptions: {
        external: [/^\/generated\//]
      }
    }
  });
};
