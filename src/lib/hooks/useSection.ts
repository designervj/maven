import { useMemo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentPage } from "@/redux/slices/pages/pagesSlice";
import type { PageBlock } from "@/redux/slices/pages/pageType";

export function useSection(adminTitle: string): PageBlock | undefined {
  const currentPages = useAppSelector(selectCurrentPage);

  return useMemo(() => {
    if (!currentPages?.content) return undefined;
    const content = Array.isArray(currentPages.content)
      ? currentPages.content
      : [];
    return content.find((s: any) => s?.adminTitle === adminTitle);
  }, [currentPages, adminTitle]);
}
