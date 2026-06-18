"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { fadeInUp, stagger } from "@/components/sections/anim";

export default function HomeFounderFeature() {
  const content = {
    eyebrow: "Our Philosophy",
    title: "Designing with discipline, warmth, and long-term clarity.",
    quote: "Every successful project balances concept and control. We believe a home should be as functional as it is beautiful.",
    description: "Our studio pairs strong architectural thinking with calm execution support.",
    image: "/assets/Image/team-img.jpg",
    secondaryImage: "/assets/Image/project-image2.png",
    role: "Architecture / Interiors / Execution",
    name: "Maven Projects",
    cta: { label: "Meet the studio", href: "/about" },
  };
  return (
    <section className="bg-[#0f0f10] py-16 text-white md:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <div className="mb-8 border-t border-white/25 pt-5">
          <motion.p
            variants={fadeInUp}
            className="font-editorial text-[10px] uppercase tracking-[0.26em] text-white/65 md:text-xs"
          >
            {content.eyebrow}
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)_420px] lg:items-start">
          <motion.div variants={fadeInUp} className="overflow-hidden bg-white/5">
            <div className="relative aspect-[0.78]">
              <Image
                src={content.image}
                alt={content.name}
                fill
                sizes="(max-width: 1024px) 100vw, 24vw"
                className="object-cover object-center grayscale"
              />
            </div>
          </motion.div>

          <div className="space-y-6 border-t border-white/15 pt-5 lg:border-t-0 lg:px-4 lg:pt-0">
            <motion.p
              variants={fadeInUp}
              className="font-editorial text-[10px] uppercase tracking-[0.24em] text-white/55 md:text-xs"
            >
              {content.role}
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white"
            >
              {content.title}
            </motion.h2>
            <motion.blockquote
              variants={fadeInUp}
              className="font-display max-w-3xl text-[1.6rem] font-medium leading-[1.18] tracking-[-0.03em] text-white/96 md:text-[2.1rem]"
            >
              "{content.quote}"
            </motion.blockquote>
            <motion.p
              variants={fadeInUp}
              className="font-editorial max-w-2xl text-sm leading-7 text-white/70 md:text-base"
            >
              {content.description}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xl text-white">{content.name}</p>
                <p className="font-editorial mt-2 text-[10px] uppercase tracking-[0.24em] text-white/50 md:text-xs">
                  {content.role}
                </p>
              </div>
              <Link
                href={content.cta.href}
                className="inline-flex items-center gap-3 border-b border-white pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white"
              >
                {content.cta.label}
                <span aria-hidden="true">/</span>
              </Link>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="overflow-hidden bg-white/5">
            <div className="relative aspect-[0.94]">
              <Image
                src={content.secondaryImage}
                alt={`${content.name} project detail`}
                fill
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
