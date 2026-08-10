// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// Live Worker URL. [TODO: update if a custom domain is attached — used for canonical URLs, Open Graph and sitemap.xml]
const SITE = 'https://pinkdiamond.clent.workers.dev';

export default defineConfig({
  site: SITE,
  // Static by default; only src/pages/api/* opts into the server runtime.
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
});
