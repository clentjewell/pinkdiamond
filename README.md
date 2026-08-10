# The Argyle Collection — Private Sale Site

Single-page static site presenting three Argyle pink diamonds for private
treaty sale. Built with Astro (static output), designed for Cloudflare Pages.

> **Before launch:** work through `TODO.md`. The valuation documents and
> photography referenced in the project brief were not present in this
> repository, so all gemmological specifications are `[TODO]` placeholders and
> the current images are AI-generated placeholders that must be replaced with
> the real photography.

## Stack

- [Astro 5](https://astro.build) — static output, no client framework
- Minimal JS: mobile nav toggle and the enquiry form submission only
- Cloudflare Pages Function (`functions/api/enquiry.ts`) emails enquiries via
  MailChannels
- `@astrojs/sitemap` for `sitemap-index.xml`; `robots.txt` and `llms.txt` in
  `/public`

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview
```

## Deploying to Cloudflare Pages

1. Push this repository to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages →
   Connect to Git**, and select this repository.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. The `functions/` directory is picked up automatically, so the
   enquiry form endpoint is served at `/api/enquiry`.
5. Set the production domain, then update:
   - `SITE` in `astro.config.mjs`
   - the `Sitemap:` line in `public/robots.txt`
6. Configure the enquiry email in `functions/api/enquiry.ts`
   (`DESTINATION_EMAIL`, `FROM_EMAIL`) and add the MailChannels Domain
   Lockdown TXT record for the sending domain.

## Project structure

```
src/
  data/stones.ts        # single source of truth for all stone details
  layouts/BaseLayout.astro  # head, SEO, Open Graph, JSON-LD
  components/           # SiteNav, Hero, Collection, StoneSection, AboutSale, Enquiry
  pages/index.astro     # the single page
  assets/               # processed responsive images
public/
  documents/            # place certificate / valuation PDFs here (see README.txt)
  robots.txt, llms.txt, og-image.jpg, favicon.svg
functions/
  api/enquiry.ts        # Cloudflare Pages Function — emails enquiries
```

## Updating stone details

Every specification, certificate number and provenance note lives in
`src/data/stones.ts`. Replace each `[TODO: …]` string with the value from the
Argyle certificate, GIA report or independent valuation — nothing else in the
codebase needs to change. Image alt text is also defined there and should be
updated to `<colour grade> <carat> carat <shape>` once the specifications are
known.
