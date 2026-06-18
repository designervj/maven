import { setCurrentPages } from '@/redux/slices/pages/pagesSlice';
import { updatePageThunk } from '@/redux/slices/pages/pageThunk';
import type { Page } from '@/redux/slices/pages/pageType';

export async function saveField(dispatch: any, currentPages: Page | null, sectionId: string, fieldPath: string, value: string) {
  if (!currentPages) return;
  const updated: Page = JSON.parse(JSON.stringify(currentPages));
  const secIdx = (updated.content as any[])?.findIndex((s: any) => s.id === sectionId);
  if (secIdx === -1 || secIdx === undefined) return;
  const parts = fieldPath.split('.');
  let obj = (updated.content as any[])[secIdx];
  for (let i = 0; i < parts.length - 1; i++) {
    if (!obj[parts[i]]) obj[parts[i]] = {};
    obj = obj[parts[i]];
  }
  obj[parts[parts.length - 1]] = value;

  dispatch(setCurrentPages(updated));

  const pageId = (currentPages as any).id || (currentPages as any)._id;
  if (pageId) {
    dispatch(updatePageThunk({ id: pageId, pageData: updated }));
  }
}
