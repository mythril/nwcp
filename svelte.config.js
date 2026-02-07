import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'nwcp',
      assets: 'nwcp',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    serviceWorker: { register: false }
  },
  preprocess: [vitePreprocess({})]
};
