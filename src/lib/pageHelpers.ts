/**
 * pageHelpers.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure utility — resolves page content by slug from Redux live data.
 */

import type { PageBlock } from '@/redux/slices/pages/pageType';
import type { Page } from '@/redux/slices/pages/pageType';

export function getPageData(slug: string, livePage?: Page) {
  const page: Page | null = livePage ?? null;

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
