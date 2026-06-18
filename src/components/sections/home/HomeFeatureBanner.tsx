"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { fadeInUp } from "@/components/sections/anim";
import { useSection } from "@/lib/hooks/useSection";
import { t } from "@/lib/section-utils";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import EditableText from "@/components/shared/EditableText";
import { saveField } from "@/lib/editorUtils";

export default function HomeFeatureBanner() {
  const dispatch = useAppDispatch();
  const currentPages = useAppSelector((state: RootState) => state.pages.currentPages);
  const isEditable = useAppSelector((state: RootState) => state.pages.isEditablePage);
  const section = useSection("AI Workflow");
  if (!section) return null;

  const p = section.props;
  const handle = (fieldPath: string) => (value: string) => saveField(dispatch, currentPages, section.id, fieldPath, value);
  return (
    <section className="bg-white py-16 md:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <motion.div
          variants={fadeInUp}
          className="relative overflow-hidden border border-[#d7d7d7] bg-[#ece8e2]"
        >
          <div className="grid md:grid-cols-[minmax(0,1fr)_220px]">
            <div className="relative min-h-[320px] md:min-h-[420px]">
              <Image
                src={p.image || "/assets/Image/project-image1.png"}
                alt={t(p.heading)}
                fill
                sizes="(max-width: 768px) 100vw, 82vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,12,0.05)_0%,rgba(12,12,12,0.18)_100%)]" />
            </div>
            <div className="relative hidden border-l border-white/30 md:block">
              {p.secondaryImage ? (
                <Image
                  src={p.secondaryImage}
                  alt={`${t(p.heading)} detail`}
                  fill
                  sizes="220px"
                  className="object-cover object-center"
                />
              ) : null}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 border-t border-white/50 bg-black/10 px-5 py-5 backdrop-blur-[2px] md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-white/85 md:text-xs">
                  <EditableText value={p.label?.en || ''} isEditable={isEditable} onSave={handle('props.label.en')} tag="span" />
                </p>
                <h2 className="font-display mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.04] tracking-[-0.04em] text-white">
                  <EditableText value={p.heading?.en || ''} isEditable={isEditable} onSave={handle('props.heading.en')} tag="span" />
                </h2>
              </div>
              <Link
                href={p.ctaLink || "/about"}
                className="inline-flex w-full items-center justify-center border border-white/70 bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111111] transition duration-300 hover:bg-transparent hover:text-white sm:w-fit"
              >
                <EditableText value={p.cta?.en || ''} isEditable={isEditable} onSave={handle('props.cta.en')} tag="span" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
