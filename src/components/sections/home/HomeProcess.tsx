"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { fadeInUp, stagger } from "@/components/sections/anim";
import { useSection } from "@/lib/hooks/useSection";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import EditableText from "@/components/shared/EditableText";
import { saveField } from "@/lib/editorUtils";

function ProcessWireframe() {
  return (
    <img
      src="/assets/Image/architect.svg"
      alt="Architectural Wireframe"
      className="h-full w-full object-contain"
    />
  );
}

export default function HomeProcess() {
  const dispatch = useAppDispatch();
  const currentPages = useAppSelector((state: RootState) => state.pages.currentPages);
  const isEditable = useAppSelector((state: RootState) => state.pages.isEditablePage);
  const section = useSection("Results");
  const [openIndex, setOpenIndex] = useState(0);

  if (!section) return null;

  const p = section.props;
  const steps = Array.isArray(section.content) ? section.content : [];
  const handle = (fieldPath: string) => (value: string) => saveField(dispatch, currentPages, section.id, fieldPath, value);

  return (
    <section
      id="process"
      className="home-section-line scroll-mt-24 bg-[#f4f4f2] py-16 md:py-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <div className="mb-10 border-t border-[#d7d7d7] pt-6">
          <motion.p
            variants={fadeInUp}
            className="font-editorial text-[10px] uppercase tracking-[0.26em] text-[#767676] md:text-xs"
          >
            <EditableText value={p.label?.en || ''} isEditable={isEditable} onSave={handle('props.label.en')} tag="span" />
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display mt-4 max-w-5xl text-[clamp(2rem,4.7vw,3.45rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#141414]"
          >
            <EditableText value={p.heading?.en || ''} isEditable={isEditable} onSave={handle('props.heading.en')} tag="span" />
          </motion.h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.85fr)] lg:items-center">
          <div>
              <motion.p
                variants={fadeInUp}
                className="font-editorial mb-8 max-w-2xl text-sm leading-7 text-[#555555] md:text-base"
              >
                <EditableText value={p.description?.en || ''} isEditable={isEditable} onSave={handle('props.description.en')} tag="span" />
              </motion.p>

            <div className="space-y-0 border-y border-[#d7d7d7]">
              {steps.map((step: any, index: number) => {
                const isOpen = openIndex === index;

                return (
                  <motion.div key={step.id || index} variants={fadeInUp} className="border-b border-[#d7d7d7] last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(index)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <div>
                        <p className="font-editorial text-[10px] uppercase tracking-[0.24em] text-[#7d7d7d] md:text-xs">
                          {step.props?.target || step.id || `0${index + 1}`}
                        </p>
                        <h3 className="font-display mt-2 text-[1.3rem] font-medium text-[#141414] md:text-[1.5rem]">
                          <EditableText value={step.props?.title?.en || ''} isEditable={isEditable} onSave={handle(`content.${index}.props.title.en`)} tag="span" />
                        </h3>
                      </div>
                      <Plus
                        className={`h-4 w-4 text-[#141414] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        strokeWidth={1.5}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-editorial max-w-xl text-sm leading-7 text-[#555555] md:text-base">
                          <EditableText value={step.props?.sub?.en || ''} isEditable={isEditable} onSave={handle(`content.${index}.props.sub.en`)} tag="span" />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div variants={fadeInUp} className="mx-auto w-full max-w-[520px]">
            <ProcessWireframe />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
