# The Argyle Collection — Private Sale Site

Single-page static site presenting three Argyle pink diamonds for private
treaty sale. Built with Astro (static output), deployed as a Cloudflare
Worker with static assets.

> **Before launch:** work through `TODO.md`. The valuation documents and
> photography referenced in the project brief were not present in this
> repository, so all gemmological specifications are `[TODO]` placeholders and
> the current images are AI-generated placeholders that must be replaced with
> the real photography.

## Stack

- [Astro 5](https://astro.build) — static output, no client framework
- Minimal JS: mobile nav toggle and the enquiry form submission only
- Cloudflare Worker (`worker/index.ts`) serves the static build via the
  assets binding and handles `POST /api/enquiry`, emailing enquiries via
  Resend
- `@astrojs/sitemap` for `sitemap-index.xml`; `robots.txt` and `llms.txt` in
  `/public`

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview
```

## Deploying to Cloudflare Workers

The repository is designed for the Workers Git integration (Workers Builds),
deploying to a Worker named `pinkdiamond` (see `wrangler.jsonc`).

1. In the Cloudflare dashboard: **Workers & Pages → Create → Workers →
   Import a repository**, and select this repository (already done if the
   `pinkdiamond` Worker exists).
2. Build settings:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
3. Every push to the connected branch builds `dist/` and deploys the Worker.
   The Worker serves the static site and handles `POST /api/enquiry`.
4. Configure enquiry email delivery:
   - Set `DESTINATION_EMAIL` and `FROM_EMAIL` in `worker/index.ts`
     (the sending domain must be verified in [Resend](https://resend.com)).
   - Add the API key as a secret: `npx wrangler secret put RESEND_API_KEY`
     (or Worker → Settings → Variables and Secrets in the dashboard).
5. Set the production domain (Worker → Settings → Domains & Routes), then
   update:
   - `SITE` in `astro.config.mjs`
   - the `Sitemap:` line in `public/robots.txt`

Manual deploy from a machine with Cloudflare credentials: `npm run deploy`.

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
worker/
  index.ts              # Cloudflare Worker — serves assets, emails enquiries
wrangler.jsonc          # Worker config (name, assets binding)
```

## Updating stone details

Every specification, certificate number and provenance note lives in
`src/data/stones.ts`. Replace each `[TODO: …]` string with the value from the
Argyle certificate, GIA report or independent valuation — nothing else in the
codebase needs to change. Image alt text is also defined there and should be
updated to `<colour grade> <carat> carat <shape>` once the specifications are
known.
