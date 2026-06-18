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

export default function HomeClosingCta() {
  const dispatch = useAppDispatch();
  const currentPages = useAppSelector((state: RootState) => state.pages.currentPages);
  const isEditable = useAppSelector((state: RootState) => state.pages.isEditablePage);
  const section = useSection("Client Logos");
  if (!section) return null;

  const p = section.props;
  const handle = (fieldPath: string) => (value: string) => saveField(dispatch, currentPages, section.id, fieldPath, value);
  return (
    <section className="bg-white pt-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-[1500px]"
      >
        <motion.div variants={fadeInUp} className="relative min-h-[300px] overflow-hidden md:min-h-[420px]">
          <Image
            src={p.image || "/assets/Image/about-image.jpg"}
            alt={t(p.heading)}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.05)_0%,rgba(11,11,11,0.28)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 border-t border-white/60 bg-black/10 px-5 py-6 backdrop-blur-[2px] md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-white/88 md:text-xs">
                  <EditableText value={p.label?.en || ''} isEditable={isEditable} onSave={handle('props.label.en')} tag="span" />
                </p>
                <h2 className="font-display mt-3 max-w-3xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.04] tracking-[-0.04em] text-white">
                  <EditableText value={p.heading?.en || ''} isEditable={isEditable} onSave={handle('props.heading.en')} tag="span" />
                </h2>
              </div>
              <Link
                href={p.primaryButtonLink || "/contact"}
                className="inline-flex w-full items-center justify-center border border-white/75 bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111111] transition duration-300 hover:bg-transparent hover:text-white sm:w-fit"
              >
                <EditableText value={p.primaryButton?.en || ''} isEditable={isEditable} onSave={handle('props.primaryButton.en')} tag="span" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
