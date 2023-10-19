import { vitePreprocess } from '@sveltejs/kit/vite';
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
    serviceWorker: { register: false },
    paths: {
      relative: false,
      base: process.env.VITE_BASE_PATH
    }
  },
  preprocess: [vitePreprocess({})]
};
