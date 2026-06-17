"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
};

// ─── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  primaryCta,
}: PageHeroProps) {
  // Use a fallback image if none is provided
  const bgImage = image || "/assets/Image/project-image1.png";

  return (
    <section className="relative isolate flex min-h-[60svh] items-end overflow-hidden bg-[#1a1a1a]">
      {/* Background image with cinematic zoom out */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay with gradient for text readability */}
        <div className="absolute inset-0 bg-black/40 bg-[linear-gradient(180deg,rgba(10,10,10,0.1)_0%,rgba(10,10,10,0.5)_100%)]" />
      </motion.div>

      {/* Hero text */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-14 pt-36 md:px-8 lg:px-10 lg:pt-40"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-editorial text-[10px] uppercase tracking-[0.28em] text-white/75 md:text-xs"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display mt-4 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.96] tracking-[-0.045em] text-white"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="font-editorial mt-6 max-w-2xl text-sm leading-7 text-white/80 md:text-[0.95rem]"
        >
          {description}
        </motion.p>

        {primaryCta ? (
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mt-10 border-t border-white/30 pt-8"
          >
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#111111] transition-colors duration-300 hover:bg-[#1a1a1a] hover:text-white sm:w-fit"
            >
              {primaryCta.label}
            </Link>
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
