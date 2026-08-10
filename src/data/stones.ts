/**
 * Source of truth for the three stones.
 *
 * IMPORTANT: The independent valuation documents and photography referenced in
 * the project brief were not present in the repository, so every gemmological
 * detail below is a [TODO] placeholder. Nothing on this page is invented —
 * replace each [TODO] with the figure from the valuation / GIA report / Argyle
 * certificate before launch. See TODO.md for the full checklist.
 */

export interface StoneDocument {
  label: string;
  /** Path under /public — place the original PDF there. */
  href: string;
  todo?: string;
}

export interface Stone {
  id: string;
  /** Display name, e.g. "Stone I". */
  name: string;
  /** Short descriptor used in nav and cards. */
  shortTitle: string;
  carat: string;
  argyleColourGrade: string;
  giaColourGrade: string;
  clarity: string;
  cutShape: string;
  argyleCertificateNo: string;
  giaReportNo: string;
  argyleLotInscriptionNo: string;
  provenance: {
    origin: string;
    tenderHistory: string;
    chainOfCustody: string;
  };
  documents: StoneDocument[];
  image: string;
  imageAlt: string;
}

export const stones: Stone[] = [
  {
    id: 'stone-i',
    name: 'Stone I',
    shortTitle: 'Stone I',
    carat: '[TODO: carat weight — Stone I]',
    argyleColourGrade: '[TODO: Argyle colour grade — Stone I]',
    giaColourGrade: '[TODO: GIA colour grade — Stone I]',
    clarity: '[TODO: clarity grade — Stone I]',
    cutShape: '[TODO: cut / shape — Stone I]',
    argyleCertificateNo: '[TODO: Argyle certificate number — Stone I]',
    giaReportNo: '[TODO: GIA report number — Stone I]',
    argyleLotInscriptionNo: '[TODO: Argyle lot / girdle inscription number — Stone I]',
    provenance: {
      origin:
        'Mined at the Argyle Diamond Mine, East Kimberley, Western Australia, prior to the mine’s closure in November 2020.',
      tenderHistory: '[TODO: tender history — Stone I, if stated in the valuation documents]',
      chainOfCustody: '[TODO: chain of custody — Stone I, per the valuation documents]',
    },
    documents: [
      { label: 'Argyle Pink Diamonds Certificate', href: '/documents/stone-i-argyle-certificate.pdf', todo: '[TODO: attach original PDF]' },
      { label: 'GIA Coloured Diamond Report', href: '/documents/stone-i-gia-report.pdf', todo: '[TODO: attach original PDF]' },
      { label: 'Independent Valuation', href: '/documents/stone-i-valuation.pdf', todo: '[TODO: attach original PDF]' },
    ],
    image: 'stone-i',
    imageAlt:
      '[TODO: colour grade] [TODO: carat] carat [TODO: shape] Argyle pink diamond, photographed against a dark background',
  },
  {
    id: 'stone-ii',
    name: 'Stone II',
    shortTitle: 'Stone II',
    carat: '[TODO: carat weight — Stone II]',
    argyleColourGrade: '[TODO: Argyle colour grade — Stone II]',
    giaColourGrade: '[TODO: GIA colour grade — Stone II]',
    clarity: '[TODO: clarity grade — Stone II]',
    cutShape: '[TODO: cut / shape — Stone II]',
    argyleCertificateNo: '[TODO: Argyle certificate number — Stone II]',
    giaReportNo: '[TODO: GIA report number — Stone II]',
    argyleLotInscriptionNo: '[TODO: Argyle lot / girdle inscription number — Stone II]',
    provenance: {
      origin:
        'Mined at the Argyle Diamond Mine, East Kimberley, Western Australia, prior to the mine’s closure in November 2020.',
      tenderHistory: '[TODO: tender history — Stone II, if stated in the valuation documents]',
      chainOfCustody: '[TODO: chain of custody — Stone II, per the valuation documents]',
    },
    documents: [
      { label: 'Argyle Pink Diamonds Certificate', href: '/documents/stone-ii-argyle-certificate.pdf', todo: '[TODO: attach original PDF]' },
      { label: 'GIA Coloured Diamond Report', href: '/documents/stone-ii-gia-report.pdf', todo: '[TODO: attach original PDF]' },
      { label: 'Independent Valuation', href: '/documents/stone-ii-valuation.pdf', todo: '[TODO: attach original PDF]' },
    ],
    image: 'stone-ii',
    imageAlt:
      '[TODO: colour grade] [TODO: carat] carat [TODO: shape] Argyle pink diamond, photographed against a dark background',
  },
  {
    id: 'stone-iii',
    name: 'Stone III',
    shortTitle: 'Stone III',
    carat: '[TODO: carat weight — Stone III]',
    argyleColourGrade: '[TODO: Argyle colour grade — Stone III]',
    giaColourGrade: '[TODO: GIA colour grade — Stone III]',
    clarity: '[TODO: clarity grade — Stone III]',
    cutShape: '[TODO: cut / shape — Stone III]',
    argyleCertificateNo: '[TODO: Argyle certificate number — Stone III]',
    giaReportNo: '[TODO: GIA report number — Stone III]',
    argyleLotInscriptionNo: '[TODO: Argyle lot / girdle inscription number — Stone III]',
    provenance: {
      origin:
        'Mined at the Argyle Diamond Mine, East Kimberley, Western Australia, prior to the mine’s closure in November 2020.',
      tenderHistory: '[TODO: tender history — Stone III, if stated in the valuation documents]',
      chainOfCustody: '[TODO: chain of custody — Stone III, per the valuation documents]',
    },
    documents: [
      { label: 'Argyle Pink Diamonds Certificate', href: '/documents/stone-iii-argyle-certificate.pdf', todo: '[TODO: attach original PDF]' },
      { label: 'GIA Coloured Diamond Report', href: '/documents/stone-iii-gia-report.pdf', todo: '[TODO: attach original PDF]' },
      { label: 'Independent Valuation', href: '/documents/stone-iii-valuation.pdf', todo: '[TODO: attach original PDF]' },
    ],
    image: 'stone-iii',
    imageAlt:
      '[TODO: colour grade] [TODO: carat] carat [TODO: shape] Argyle pink diamond, photographed against a dark background',
  },
];
