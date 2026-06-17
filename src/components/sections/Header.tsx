"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteNavigation, socialLinks } from "@/lib/homepage-data";

// ─── Sub-links per nav item ────────────────────────────────────────────────────
const subLinks: Record<string, { label: string; href: string }[]> = {
  "HOME": [],
  "ABOUT US": [
    { label: "Our Story", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Philosophy", href: "/about" },
  ],
  "SERVICES": [
    { label: "Architecture", href: "/services" },
    { label: "Interior Design", href: "/services" },
    { label: "Renovation", href: "/services" },
  ],
  "PORTFOLIO": [
    { label: "Residential", href: "/portfolio" },
    { label: "Commercial", href: "/portfolio" },
    { label: "Interiors", href: "/portfolio" },
  ],
  "BLOG": [
    { label: "Blog Grid", href: "/blog" },
    { label: "Press Releases", href: "/blog" },
    { label: "Studio News", href: "/blog" },
  ],
  "CONTACT US": [],
};

// ─── Animation variants ────────────────────────────────────────────────────────
const backdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } },
};

const navItemVariants = {
  hidden: { x: -18, opacity: 0 },
  show: (i: number) => ({
    x: 0, opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.055 },
  }),
};

const subVariants = {
  hidden: { x: -10, opacity: 0 },
  show: (i: number) => ({
    x: 0, opacity: 1,
    transition: { duration: 0.32, ease: "easeOut", delay: 0.18 + i * 0.06 },
  }),
};

const imageVariants = {
  hidden: { x: 30, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 } },
  exit: { x: 20, opacity: 0, transition: { duration: 0.28 } },
};

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const activeSubLinks = hovered ? (subLinks[hovered] ?? []) : [];

  return (
    <>
      {/* ─── Header bar ─────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d9d9d9] bg-white transition-colors duration-300">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 px-4 py-3 md:px-8 lg:px-10">
          <Link href="/" className="shrink-0">
            <img src="/assets/Image/New-Logo.png" alt="Maven Projects" className="h-12 w-auto md:h-16" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 xl:flex">
            {siteNavigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "group relative font-editorial text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 md:text-[13px] py-1",
                  pathname === item.href ? "text-[#111111] font-bold" : "text-[#333333] hover:text-[#111111]"
                )}
              >
                {item.label}
                {/* Animated underline sweep */}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#111111] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Menu trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="group inline-flex items-center gap-2 border border-[#d8d8d8] px-3 py-2 text-[#111111] transition-colors duration-200 hover:border-[#111111]"
          >
            <span className="font-editorial text-[10px] uppercase tracking-[0.22em] md:text-xs">Menu</span>
            <span className="flex flex-col gap-[4px]">
              <span className="block h-[1px] w-4 bg-[#111111] transition-all duration-200 group-hover:w-3" />
              <span className="block h-[1px] w-3 bg-[#111111] transition-all duration-200 group-hover:w-4" />
            </span>
          </button>
        </div>
      </header>

      {/* ─── Archinic-style floating card drawer ────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
              variants={backdropVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={() => setOpen(false)}
            />

            {/* Floating card — matches Archinic rounded rectangle */}
            <motion.div
              key="card"
              className="fixed inset-x-4 inset-y-4 z-[70] flex overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.28)] md:inset-x-6 md:inset-y-5 lg:inset-x-8 lg:inset-y-6"
              variants={cardVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* ── LEFT: white nav panel ─────────────────────────────── */}
              <div className="relative flex w-full flex-col justify-between bg-white px-8 py-6 md:w-[58%] lg:w-[50%]">
                {/* Logo and Mobile Close */}
                <div className="flex items-start justify-between">
                  <Link href="/" onClick={() => setOpen(false)}>
                    <img src="/assets/Image/New-Logo.png" alt="Maven Projects" className="h-12 w-auto md:h-16" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="md:hidden inline-flex items-center gap-2 bg-[#111111] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-black"
                  >
                    
                    <X size={13} strokeWidth={2} />
                  </button>
                </div>

                {/* Nav + sub-links side by side */}
                <div className="mt-8 flex flex-1 items-start gap-14">
                  {/* Primary nav */}
                  <nav className="flex flex-col gap-1">
                    {siteNavigation.map((item, i) => (
                      <motion.div
                        key={item.label}
                        custom={i}
                        variants={navItemVariants}
                        initial="hidden"
                        animate="show"
                        onMouseEnter={() => setHovered(item.label)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "font-display block text-[clamp(1.9rem,4vw,3rem)] font-medium md:leading-[1.18] leading-[1.50] tracking-[-0.03em] transition-colors duration-200",
                            pathname === item.href
                              ? "text-[#111111]"
                              : "text-[#666666] hover:text-[#111111]"
                          )}
                        >
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1).toLowerCase()}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Sub-links — appear to the right of nav (like Archinic) */}
                  <div className="hidden md:flex flex-col gap-2 pt-3 min-w-[140px]">
                    <AnimatePresence mode="wait">
                      {activeSubLinks.length > 0 && (
                        <motion.div
                          key={hovered}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-2"
                        >
                          {activeSubLinks.map((sub, i) => (
                            <motion.div key={sub.label} custom={i} variants={subVariants} initial="hidden" animate="show">
                              <Link
                                href={sub.href}
                                onClick={() => setOpen(false)}
                                className="font-editorial block text-xs uppercase tracking-[0.2em] text-[#b07d3a] transition-colors duration-200 hover:text-[#111111]"
                              >
                                {sub.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom: social + terms */}
                <div className="mt-auto border-t border-[#ebebeb] pt-5">
                  <div className="flex items-center gap-6">
                    {socialLinks.slice(0, 4).map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#555555] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#111111]"
                        aria-label={s.label}
                      >
                        {s.label === "Instagram" ? <Instagram size={18} strokeWidth={1.5} />
                          : s.label === "Facebook" ? <Facebook size={18} strokeWidth={1.5} />
                          : s.label === "LinkedIn" ? <Linkedin size={18} strokeWidth={1.5} />
                          : s.label === "YouTube" ? <Youtube size={20} strokeWidth={1.5} />
                          : s.label}
                      </a>
                    ))}
                  </div>
                  <p className="font-editorial mt-3 text-[11px] text-[#aaaaaa]">
                    Terms &amp; conditions
                  </p>
                </div>
              </div>

              {/* ── RIGHT: architectural image panel ─────────────────── */}
              <motion.div
                className="relative hidden flex-1 md:block"
                variants={imageVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <Image
                  src="/assets/Image/contact-banner1.jpg" 
                  alt="Maven Projects"
                  fill
                  sizes="50vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.28)_100%)]" />

                {/* CLOSE button — top-right of image (exactly like Archinic) */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="absolute right-4 top-4 inline-flex items-center gap-2 bg-[#111111] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-black"
                >
                  Close
                  <X size={13} strokeWidth={2} />
                </button>

                {/* Contact CTA — bottom-left of image */}
                <div className="absolute bottom-6 left-6">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="group relative inline-flex h-[52px] items-center overflow-hidden rounded-xl bg-white p-1.5 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                  >
                    {/* Left Icon (slides in) */}
                    <div className="absolute left-1.5 top-1.5 flex h-10 w-10 -translate-x-[250%] items-center justify-center rounded-lg bg-[#1a1a1a] text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>

                    {/* Text */}
                    <span className="relative flex h-full items-center pl-5 pr-16 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#111111] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[44px]">
                      Contact Us
                    </span>

                    {/* Right Icon (slides out) */}
                    <div className="absolute right-1.5 top-1.5 flex h-10 w-10 translate-x-0 items-center justify-center rounded-lg bg-[#1a1a1a] text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[250%]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
