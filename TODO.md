# Pre-launch TODO list

The independent valuation documents and photography referenced in the project
brief were **not present in this repository**, so nothing gemmological could be
extracted. Every item below needs your input before the site can launch.

## 1. Photography (critical)

- [ ] Replace `src/assets/hero.jpg` with the real hero photograph.
- [ ] Replace `src/assets/stone-i.jpg`, `stone-ii.jpg`, `stone-iii.jpg` with
      the attached photography for each stone.
- **The current images are AI-generated placeholders (Higgsfield), used only
  so the layout could be built. They do not depict the actual stones and must
  not be shown to buyers — presenting them as the stones on a credibility
  asset would be materially misleading.**
- [ ] Add any additional gallery angles per stone (the gallery currently shows
      one image per stone; extra images can be added in `StoneSection.astro`).
- [ ] Update `public/og-image.jpg` (currently derived from the placeholder hero).

## 2. Specifications — `src/data/stones.ts` (per stone × 3)

- [ ] Carat weight
- [ ] Argyle colour grade
- [ ] GIA colour grade
- [ ] Clarity grade
- [ ] Cut / shape
- [ ] Argyle certificate number
- [ ] GIA report number
- [ ] Argyle lot / girdle inscription number
- [ ] Tender history (if stated in the valuation documents)
- [ ] Chain of custody (per the valuation documents)
- [ ] Image alt text (`imageAlt`) — set to "<colour grade> <carat> carat <shape>…"
- [ ] Stone display names — currently "Stone I / II / III"; rename if the
      valuations use names or lot numbers

## 3. Documents — `public/documents/`

- [ ] Place the nine original PDFs using the filenames listed in
      `public/documents/README.txt` (Argyle certificate, GIA report and
      valuation for each stone).
- [ ] **Check each PDF for the owner's personal details (name, address,
      storage location) before publishing — redact or withhold any document
      that exposes them.**

## 4. Contact and enquiry routing

- [ ] `src/pages/api/enquiry.ts` — set `DESTINATION_EMAIL` (currently
      `[TODO: enquiry email]`) and `FROM_EMAIL` (the sending domain must be
      verified in Resend).
- [ ] Create a [Resend](https://resend.com) API key and add it to the
      `pinkdiamond` Worker: `npx wrangler secret put RESEND_API_KEY`
      (until it is set, the form returns "Email delivery is not configured").
- [ ] `src/components/Enquiry.astro` — direct contact telephone and email for
      the vendor's representative.

## 5. Domain and SEO

- [ ] `astro.config.mjs` — set `SITE` to the production domain (currently a
      placeholder `pages.dev` URL; used for canonical URL, Open Graph and the
      sitemap).
- [ ] `public/robots.txt` — update the `Sitemap:` URL to the production domain.
- [ ] `src/layouts/BaseLayout.astro` — confirm the selling entity name used in
      the `Organization` JSON-LD block (currently "The Argyle Collection").
- [ ] Confirm the JSON-LD `priceCurrency` assumption (AUD, price omitted).

## 6. Copy review

- [ ] The hero, collection intro, provenance origin line and about-the-sale
      copy reference the Argyle mine closure (November 2020) and Argyle's
      share of world pink diamond supply — confirm you are happy with these
      factual statements, as they are the only copy not drawn from documents.
- [ ] Site wordmark — currently "The Argyle Collection"; replace with your
      preferred name if different. Note that "Argyle Pink Diamonds" is a
      Rio Tinto brand — have your representative confirm the wordmark and any
      brand references are acceptable for a private-sale context.
