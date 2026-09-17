"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Layers,
  CheckCircle2,
  MapPin,
  Ruler,
} from "lucide-react";

import { fadeInUp, stagger } from "@/components/sections/anim";
import { useSection } from "@/lib/hooks/useSection";
import { t } from "@/lib/section-utils";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import EditableText from "@/components/shared/EditableText";
import { saveField } from "@/lib/editorUtils";

type HomeProjectsProps = {
  showAll?: boolean;
  itemsOverride?: any[];
  eyebrow?: string;
  title?: string;
  showViewAll?: boolean;
  detailMode?: boolean;
};

const detailFields = [
  {
    key: "projectType",
    label: "Type",
    icon: <Home size={14} className="shrink-0 text-[#b8955a]" />,
  },
  {
    key: "area",
    label: "Area",
    icon: <Ruler size={14} className="shrink-0 text-[#b8955a]" />,
  },
  {
    key: "phases",
    label: "Phases",
    icon: <Layers size={14} className="shrink-0 text-[#b8955a]" />,
  },
  {
    key: "completion",
    label: "Completion",
    icon: <CheckCircle2 size={14} className="shrink-0 text-[#b8955a]" />,
  },
  {
    key: "landmark",
    label: "Landmark",
    icon: <MapPin size={14} className="shrink-0 text-[#b8955a]" />,
  },
];

export default function HomeProjects({
  showAll = false,
  itemsOverride,
  eyebrow = "Portfolio",
  title = "Portfolio Projects",
  showViewAll = true,
  detailMode = false,
}: HomeProjectsProps) {
  const dispatch = useAppDispatch();
  const currentPages = useAppSelector((state: RootState) => state.pages.currentPages);
  const isEditable = useAppSelector((state: RootState) => state.pages.isEditablePage);
  const section = useSection("Industries");
  if (!section && !itemsOverride) return null;

  const sourceItems = itemsOverride ?? (Array.isArray(section?.content) ? section.content : []);
  const items = showAll ? sourceItems : sourceItems.slice(0, 3);
  const canEdit = Boolean(section && !itemsOverride);
  const handle = (fieldPath: string) => (value: string) => {
    if (!section) return;
    saveField(dispatch, currentPages, section.id, fieldPath, value);
  };

  return (
    <section
      id="projects"
      className="home-section-line scroll-mt-24 bg-white py-16 md:py-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <div className="mb-10 flex flex-col gap-5 border-t border-[#d7d7d7] pt-6 md:flex-row md:items-end md:justify-between">
          <motion.div variants={fadeInUp}>
            <p className="font-editorial text-[10px] uppercase tracking-[0.26em] text-[#767676] md:text-xs">
              {eyebrow}
            </p>
            <h2 className="font-display mt-3 text-[2rem] font-medium tracking-[-0.04em] text-[#141414] md:text-[2.4rem]">
              {title}
            </h2>
          </motion.div>

          {showViewAll && (
            <motion.div variants={fadeInUp}>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 border-b border-[#111111] pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111111]"
              >
                View all
                <span aria-hidden="true">/</span>
              </Link>
            </motion.div>
          )}
        </div>

        <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${detailMode ? "gap-8" : ""}`}>
          {items.map((item: any, i: number) => (
            <motion.article
              key={item.id || i}
              variants={fadeInUp}
              className={detailMode ? "group flex flex-col" : "group"}
            >
              {detailMode ? (
                /* ── Detailed Card Design for /portfolio ── */
                <Link
                  href={item.props?.href || "/portfolio"}
                  className="flex flex-col h-full overflow-hidden border border-[#e0dbd3] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.07)] transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ece8e2]">
                    <Image
                      src={item.props?.image || `/assets/Image/project-image${(i % 2) + 1}.png`}
                      alt={t(item.props?.title)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                    />
                    {item.props?.status && (
                      <span className="absolute left-3 top-3 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#141414] backdrop-blur-sm">
                        {item.props.status}
                      </span>
                    )}
                  </div>

                  <div className="px-5 pt-4 pb-3 border-b border-[#efefef] bg-[#faf8f5]">
                    <h3 className="font-display text-[1.15rem] font-semibold leading-snug text-[#141414] group-hover:text-[#b8955a] transition-colors duration-200">
                      {canEdit ? (
                        <EditableText
                          value={item.props?.title?.en || ""}
                          isEditable={isEditable}
                          onSave={handle(`content.${i}.props.title.en`)}
                          tag="span"
                        />
                      ) : (
                        t(item.props?.title)
                      )}
                    </h3>
                    <p className="font-editorial mt-1.5 text-[10px] uppercase tracking-[0.22em] text-[#9a9a9a]">
                      {item.props?.tag || item.props?.category || `Project ${i + 1}`} &middot;{" "}
                      {item.props?.location || "Jaipur, India"} &middot;{" "}
                      {item.props?.year || "2024"}
                    </p>
                  </div>

                  <div className="px-5 py-4 bg-[#faf8f5] flex-1">
                    <ul className="grid gap-2">
                      {detailFields.map(({ key, label, icon }) => {
                        const value = item.props?.[key];
                        if (!value) return null;
                        return (
                          <li key={key} className="flex items-center gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#f0e8db] border border-[#e8d8c4]">
                              {icon}
                            </span>
                            <span className="text-[12.5px] leading-5 text-[#555]">
                              <span className="font-semibold text-[#222]">{label}:</span>{" "}
                              {value}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Link>
              ) : (
                /* ── Original Design for Homepage ── */
                <Link href={item.props?.href || "/portfolio"} className="block">
                  <div className="relative aspect-[0.84] overflow-hidden bg-[#ece8e2]">
                    <Image
                      src={item.props?.image || `/assets/Image/project-image${(i % 2) + 1}.png`}
                      alt={t(item.props?.title)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                    />
                    {item.props?.status && (
                      <span className="absolute left-4 top-4 bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#141414] backdrop-blur">
                        {item.props.status}
                      </span>
                    )}
                  </div>
                  <div className="border-b border-[#d7d7d7] py-4">
                    <h3 className="font-display text-[1.35rem] font-medium leading-tight text-[#141414]">
                      {canEdit ? (
                        <EditableText
                          value={item.props?.title?.en || ""}
                          isEditable={isEditable}
                          onSave={handle(`content.${i}.props.title.en`)}
                          tag="span"
                        />
                      ) : (
                        t(item.props?.title)
                      )}
                    </h3>
                    <p className="font-editorial mt-3 text-[10px] uppercase tracking-[0.24em] text-[#7a7a7a]">
                      {item.props?.tag || item.props?.category || `Project ${i + 1}`} / {item.props?.location || "Jaipur, India"} / {item.props?.year || "2024"}
                    </p>
                  </div>
                </Link>
              )}
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
