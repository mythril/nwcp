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
    server: {
      host: process.env.VITE_DEV_HOST || 'localhost',
      port: parseInt(process.env.VITE_DEV_PORT || '8080', 10),
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
