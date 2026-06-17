/**
 * localPages.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all bundled local page JSON data.
 * Imported by pagesSlice.ts as the Redux initial state fallback.
 * Uses @/ alias to avoid relative-path depth issues.
 */

import type { Page } from '@/redux/slices/pages/pageType';

import homePageJson      from '@/lib/pages/homePage.json';
import aboutPageJson     from '@/lib/pages/aboutPage.json';
import servicesPageJson  from '@/lib/pages/servicesPage.json';
import portfolioPageJson from '@/lib/pages/portfolioPage.json';
import blogPageJson      from '@/lib/pages/blogPage.json';
import processPageJson   from '@/lib/pages/processPage.json';
import testimonialsJson  from '@/lib/pages/testimonialsPage.json';
import contactPageJson   from '@/lib/pages/contactPage.json';

export const localPages: Page[] = [
  homePageJson      as unknown as Page,
  aboutPageJson     as unknown as Page,
  servicesPageJson  as unknown as Page,
  portfolioPageJson as unknown as Page,
  blogPageJson      as unknown as Page,
  processPageJson   as unknown as Page,
  testimonialsJson  as unknown as Page,
  contactPageJson   as unknown as Page,
];

export const homePageFallback: Page = homePageJson as unknown as Page;
