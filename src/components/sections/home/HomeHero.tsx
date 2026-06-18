"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSection } from "@/lib/hooks/useSection";
import { t } from "@/lib/section-utils";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import EditableText from "@/components/shared/EditableText";
import { saveField } from "@/lib/editorUtils";

export default function HomeHero() {
  const dispatch = useAppDispatch();
  const currentPages = useAppSelector((state: RootState) => state.pages.currentPages);
  const isEditable = useAppSelector((state: RootState) => state.pages.isEditablePage);
  const section = useSection("Hero");
  if (!section) return null;

  const p = section.props;
  const handle = (fieldPath: string) => (value: string) => saveField(dispatch, currentPages, section.id, fieldPath, value);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[90svh] items-end overflow-hidden bg-[#d9d7d1] text-white"
    >
      <div className="absolute inset-0">
        <Image
          src={p.image || "/assets/Image/about-us-img.jpeg"}
          alt={t(p.heading)}
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
            <EditableText value={p.label?.en || ''} isEditable={isEditable} onSave={handle('props.label.en')} tag="span" />
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.75rem,7.5vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.045em] text-white">
            <EditableText value={p.heading?.en || ''} isEditable={isEditable} onSave={handle('props.heading.en')} tag="span" />
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
                <EditableText value={p.description?.en || ''} isEditable={isEditable} onSave={handle('props.description.en')} tag="span" />
              </p>
              <p className="font-editorial mt-8 text-[10px] uppercase tracking-[0.28em] text-white/75 md:text-xs">
                Maven Projects | Architecture and Interior Design in Jaipur
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={p.primaryButtonLink || "/portfolio"}
                className="inline-flex w-full items-center justify-center border border-white/70 bg-white/10 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-[#111111] sm:min-w-[160px] sm:w-auto"
              >
                <EditableText value={p.primaryButton?.en || ''} isEditable={isEditable} onSave={handle('props.primaryButton.en')} tag="span" />
              </Link>
              <Link
                href={p.secondaryButtonLink || "/contact"}
                className="inline-flex w-full items-center justify-center border border-white/30 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition duration-300 hover:border-white sm:min-w-[160px] sm:w-auto"
              >
                <EditableText value={p.secondaryButton?.en || ''} isEditable={isEditable} onSave={handle('props.secondaryButton.en')} tag="span" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
