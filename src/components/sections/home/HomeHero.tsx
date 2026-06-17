"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { HeroContent } from "@/lib/homepage-data";

type HomeHeroProps = {
  content: HeroContent;
};

export default function HomeHero({ content }: HomeHeroProps) {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[90svh] items-end overflow-hidden bg-[#d9d7d1] text-white"
    >
      <div className="absolute inset-0">
        <Image
          src={content.image}
          alt={content.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 bg-[linear-gradient(180deg,rgba(10,10,10,0.1)_0%,rgba(10,10,10,0.5)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-8 pt-28 md:px-8 md:pb-10 lg:px-10 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <p className="font-editorial text-[10px] uppercase tracking-[0.28em] text-white/88 md:text-xs">
            {content.eyebrow}
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.75rem,7.5vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.045em] text-white">
            {content.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.14, ease: "easeOut" }}
          className="mt-12 border-t border-white/45 pt-5"
        >
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <p className="font-editorial text-sm leading-6 tracking-[0.04em] text-white/88 md:max-w-xl">
                {content.supportingCaption}
              </p>
              <p className="font-editorial mt-8 text-[10px] uppercase tracking-[0.28em] text-white/75 md:text-xs">
                {content.metaLabel}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={content.primaryCta.href}
                className="inline-flex w-full items-center justify-center border border-white/70 bg-white/10 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-[#111111] sm:min-w-[160px] sm:w-auto"
              >
                {content.primaryCta.label}
              </Link>
              <Link
                href={content.secondaryCta.href}
                className="inline-flex w-full items-center justify-center border border-white/30 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition duration-300 hover:border-white sm:min-w-[160px] sm:w-auto"
              >
                {content.secondaryCta.label}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
