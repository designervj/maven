/**
 * pageHelpers.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure utility — resolves page content by slug.
 *
 * Priority order:
 *   1. Live page from Redux store (when API has loaded it)
 *   2. Bundled local JSON fallback (always available, zero latency)
 *
 * NO useSelector here — works in Server Components, Client Components, and
 * any plain TypeScript module. SSR-safe.
 *
 * Usage in a component:
 *   const { getSection, getSectionItems, t } = getPageData('home');
 *
 * Usage with Redux live data (in a 'use client' component):
 *   const livePage = useAppSelector(selectPageBySlug('home'));
 *   const { getSection, getSectionItems, t } = getPageData('home', livePage ?? undefined);
 */

import { localPages } from '@/lib/localPages';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import type { Page } from '@/redux/slices/pages/pageType';

export function getPageData(slug: string, livePage?: Page) {
  // Prefer live Redux page (from API), fall back to local JSON bundle
  const page: Page | null =
    livePage ?? localPages.find((p) => p.slug === slug) ?? null;

  const content: PageBlock[] = Array.isArray(page?.content)
    ? (page!.content as PageBlock[])
    : [];

  /** Find a section by adminTitle */
  function getSection(adminTitle: string): PageBlock | undefined {
    return content.find((s) => s?.adminTitle === adminTitle);
  }

  /** Get all items from a section's content[] array */
  function getSectionItems(adminTitle: string): any[] {
    const section = getSection(adminTitle);
    return Array.isArray(section?.content) ? section!.content! : [];
  }

  /** Resolve a localized {en, hi} value or plain string */
  function t(val: any, lang = 'en'): string {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[lang] ?? val['en'] ?? '';
  }

  /** Get a specific prop value from a section */
  function getSectionProp(adminTitle: string, propKey: string, lang = 'en'): string {
    const section = getSection(adminTitle);
    return t(section?.props?.[propKey], lang);
  }

  return { page, content, getSection, getSectionItems, getSectionProp, t };
}
