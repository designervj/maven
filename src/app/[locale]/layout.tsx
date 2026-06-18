"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import GetAllPage from "@/components/getallData/pageData/GetAllPage";
import EditModeToggle from "@/components/layout/EditModeToggle/EditModeToggle";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import ReduxProvider from "@/components/layout/ReduxProvider";
import { BlueprintProvider } from "@/components/providers/BlueprintProvider";

function PageLoader() {
  const isAllPageFetched = useSelector((state: RootState) => state.pages.isAllPageFetched);

  if (isAllPageFetched) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#b07d3a] border-t-transparent" />
        <p className="font-editorial text-xs tracking-[0.2em] uppercase text-[#777777]">
          Loading
        </p>
      </div>
    </div>
  );
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <BlueprintProvider context="public">
        <NavigationWrapper>
          <GetAllPage />
          <EditModeToggle/>
          {children}
        </NavigationWrapper>
        <PageLoader />
      </BlueprintProvider>
    </ReduxProvider>
  );
}
