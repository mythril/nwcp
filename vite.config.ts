import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import fs from 'fs';

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [sveltekit()],
    test: {
      include: ['src/**/*.{test,spec}.{js,ts}']
    },
    server: {
      host: env.VITE_DEV_HOST || 'localhost',
      // host: true,
      port: parseInt(env.VITE_DEV_PORT || '8080', 10),
      https: {
        cert: env.VITE_CERT_FILE
          ? fs.readFileSync(env.VITE_CERT_FILE)
          : undefined,
        key: env.VITE_KEY_FILE ? fs.readFileSync(env.VITE_KEY_FILE) : undefined
      },
      proxy: {}
    },
    build: {
      rollupOptions: {
        external: [/^\/generated\//]
      }
    }
  });
};
