"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const currentPath = typeof window !== "undefined" ? window.location.pathname : (pathname || "");
  const normalizedPath = currentPath.toLowerCase();

  const isAdmin = normalizedPath.startsWith("/admin");
  const isAuthPage = normalizedPath.includes("login") || normalizedPath.includes("kalpauth");

  if (isAdmin || isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
