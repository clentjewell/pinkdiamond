// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// [TODO: replace with the production domain before launch — used for canonical URLs, Open Graph and sitemap.xml]
const SITE = 'https://argyle-collection.pages.dev';

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
