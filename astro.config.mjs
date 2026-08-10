// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// [TODO: replace with the production domain before launch — used for canonical URLs, Open Graph and sitemap.xml]
const SITE = 'https://argyle-collection.pages.dev';

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
});
