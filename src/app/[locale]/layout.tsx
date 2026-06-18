"use client";

import GetAllPage from "@/components/getallData/pageData/GetAllPage";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import ReduxProvider from "@/components/layout/ReduxProvider";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <NavigationWrapper>
        <GetAllPage />
        {children}
      </NavigationWrapper>
    </ReduxProvider>
  );
}
