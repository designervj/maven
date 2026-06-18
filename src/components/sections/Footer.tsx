"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectPageBySlug } from "@/redux/slices/pages/pagesSlice";
import { t } from "@/lib/section-utils";
import footerPageFallback from "@/lib/pages/footerPage.json";

const socialIcons: Record<string, typeof Instagram> = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

function getSection(page: any, adminTitle: string) {
  if (!page?.content) return undefined;
  const content = Array.isArray(page.content) ? page.content : [];
  return content.find((s: any) => s?.adminTitle === adminTitle);
}

export default function Footer() {
  const footerPage = useAppSelector(selectPageBySlug("footer")) || footerPageFallback;

  const brand = getSection(footerPage, "Footer Brand");
  const quickLinks = getSection(footerPage, "Footer Quick Links");
  const location = getSection(footerPage, "Footer Location");
  const contact = getSection(footerPage, "Footer Contact");
  const bottom = getSection(footerPage, "Footer Bottom");

  const bp = brand?.props;
  const lp = location?.props;
  const btp = bottom?.props;

  return (
    <footer id="contact" className="border-t border-[#d7d7d7] bg-white text-[#111111]">
      <div className="mx-auto grid max-w-[1500px] gap-0 md:grid-cols-4">
        <div className="border-b border-[#d7d7d7] px-5 py-8 md:flex md:min-h-[220px] md:border-r md:flex-col md:items-start md:px-8">
          <img
            src={bp?.logo || "/assets/Image/New-Logo.png"}
            alt={bp?.logoAlt || "Maven Projects"}
            className="h-12 w-auto md:h-16"
          />
          <div className="mt-8 flex items-center gap-5">
            {(bp?.socialLinks as any[] || []).map((link: any) => {
              const Icon = socialIcons[link.label as keyof typeof socialIcons];

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="text-[#111111] transition duration-300 hover:opacity-70"
                >
                  {Icon && <Icon size={18} />}
                </a>
              );
            })}
          </div>
        </div>

        <div className="border-b border-[#d7d7d7] px-5 py-8 md:min-h-[220px] md:border-r md:px-8">
          <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
            {t(quickLinks?.props?.heading || "Quick Links")}
          </p>
          <div className="mt-6 space-y-3">
            {(quickLinks?.content as any[] || []).map((item: any) => (
              <Link key={item.label} href={item.href} className="font-editorial block text-sm text-[#111111] hover:font-bold transition-all duration-200">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-b border-[#d7d7d7] px-5 py-8 md:min-h-[220px] md:border-r md:px-8">
          <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
            {t(lp?.heading || "Location")}
          </p>
          <div className="mt-6 space-y-4">
            <p className="font-editorial text-sm leading-7 text-[#111111]">
              {t(lp?.address || "Jaipur, Rajasthan")}
            </p>
            <div className="space-y-2">
              <a href={`mailto:${lp?.email || ""}`} className="font-editorial block text-xs text-[#555555] hover:text-[#111111]">
                {lp?.email || ""}
              </a>
              <a href={`tel:${lp?.phone || ""}`} className="font-editorial block text-xs text-[#555555] hover:text-[#111111]">
                {lp?.phone || ""}
              </a>
            </div>
          </div>
        </div>

        <div className="px-5 py-8 md:min-h-[220px] md:px-8">
          <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#777777] md:text-xs">
            {t(contact?.props?.heading || "Contact")}
          </p>
          <div className="mt-6 space-y-3">
            {(contact?.content as any[] || []).map((item: any) =>
              item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? (
                <a key={item.label} href={item.href} className="font-editorial block text-sm text-[#111111] hover:font-bold transition-all duration-200">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className="font-editorial block text-sm text-[#111111] hover:font-bold transition-all duration-200">
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-5 py-5 text-[10px] uppercase tracking-[0.22em] text-[#777777] md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-editorial">{t(btp?.copyright || "Copyright 2026 Maven Projects")}</p>
        <Link href={btp?.backToTopHref || "#hero"} className="font-editorial text-[#111111]">
          {t(btp?.backToTopLabel || "Back to top")}
        </Link>
      </div>
    </footer>
  );
}
