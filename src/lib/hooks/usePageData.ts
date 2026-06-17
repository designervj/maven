"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCurrentPages } from "@/redux/slices/pages/pagesSlice";
import type { PageBlock } from "@/redux/slices/pages/pageType";

/**
 * usePageData — resolves a page by slug from Redux allPages,
 * sets currentPages, and returns helpers for reading sections.
 *
 * @param slug  e.g. "home" | "about" | "services" | "portfolio" | ...
 */
export function usePageData(slug: string) {
  const dispatch = useAppDispatch();
  const { allPages, currentPages, isLoading, isError } = useAppSelector(
    (state) => state.pages
  );

  // Find matching page from allPages (instant from local JSON fallback)
  const page = allPages.find((p) => p.slug === slug) ?? currentPages;

  useEffect(() => {
    const found = allPages.find((p) => p.slug === slug);
    if (found) dispatch(setCurrentPages(found));
  }, [slug, allPages, dispatch]);

  const content: PageBlock[] = Array.isArray(page?.content)
    ? (page!.content as PageBlock[])
    : [];

  /** Find a section by its adminTitle string */
  function getSection(adminTitle: string): PageBlock | undefined {
    return content.find((s) => s?.adminTitle === adminTitle);
  }

  /** Get a prop value from a section by adminTitle, with en locale */
  function getSectionProp(adminTitle: string, propKey: string, lang = "en"): string {
    const section = getSection(adminTitle);
    const val = section?.props?.[propKey];
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[lang] ?? val["en"] ?? "";
  }

  /** Get content items from a section by adminTitle */
  function getSectionItems(adminTitle: string): any[] {
    const section = getSection(adminTitle);
    return Array.isArray(section?.content) ? section!.content! : [];
  }

  /** Resolve a localized string value (en/hi object or plain string) */
  function t(val: any, lang = "en"): string {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[lang] ?? val["en"] ?? "";
  }

  return {
    page,
    content,
    isLoading,
    isError,
    getSection,
    getSectionProp,
    getSectionItems,
    t,
  };
}
