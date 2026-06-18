"use client";

import { type ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { fetchFastApiPagesThunk } from "@/redux/slices/pages/pageThunk";

/**
 * ReduxProvider
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps the app in the Redux store Provider.
 *
 * On mount it fires fetchFastApiPagesThunk to pull live CMS pages from the API.
 * If the API fails or is unreachable, the store retains the local JSON fallback
 * data seeded in the initial state — the site continues to work offline.
 *
 * The pagesSlice merges API results rather than replacing, so local JSON pages
 * always exist as a safety net.
 */
function StoreInitializer() {
  useEffect(() => {
    // Try to sync live pages from API (silently fails if API is down)
    store.dispatch(fetchFastApiPagesThunk() as any).catch(() => {
      // API unreachable — local JSON fallback remains active
    });
  }, []);

  return null;
}

export default function ReduxProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <StoreInitializer />
      {children}
    </Provider>
  );
}
