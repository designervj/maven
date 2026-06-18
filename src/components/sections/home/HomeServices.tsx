"use client";

import { motion } from "framer-motion";

import { fadeInUp, stagger } from "@/components/sections/anim";
import { useSection } from "@/lib/hooks/useSection";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import EditableText from "@/components/shared/EditableText";
import { saveField } from "@/lib/editorUtils";

const CustomHouse = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 32" fill="currentColor" {...props}>
    <path d="m128 25h27v6h-27zm-7 6v-6h3v6zm-105-2h34v3h-34zm35-3.5h34v1h-34zm0-17.5h21v15h-21zm87 0h17v15h-17zm-35 15v-15h17v15zm-17-15h17v15h-17zm-1 0v15h-13v-15zm0 24h-34v-3h34zm1-3.71h8.79v-2.13h-8.79v-1.16h34v6h-34zm35-5.29v-15h17v15zm44 0h-9v-15h9zm-37.15 9h44.15v-.57h-15.86v-5.94h8.98v-20.12h-25.8v-1.54h-11.47v-3.83h-3.25v3.83h-11.46v1.54h-72.05v.57h.38v2.1h8.8v15.34h-8.8v2.1h8.8v.96h-43.97v2.11h8.79v2.68h-15.09v.58h124.41"></path>
  </svg>
);

const CustomRuler = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 33" fill="currentColor" {...props}>
    <path d="m28.96.24c.1.2 0 .6-.2.7l-8.76 5.05v26.5c0 .31-.2.52-.5.52s-.5-.2-.5-.51v-25.94l-5 2.87v23.07c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-22.5l-5 2.88v19.6c0 .31-.2.52-.5.52s-.5-.2-.5-.51v-19.04l-6.17 3.55h-.3c-.2 0-.4-.1-.5-.3-.09-.2 0-.6.2-.71l18.81-10.7c.08-.18.24-.29.46-.29h.05l8.72-4.96c.2-.1.6 0 .7.2zm31.04-.24v9.62l29.66 9.36c.3.1.4.4.3.61 0 .2-.2.41-.4.41h-.2l-60.02-19.05c-.3-.1-.4-.4-.3-.6.1-.31.4-.41.6-.31l27.36 8.63v-8.67z"></path>
  </svg>
);

const CustomSofa = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 32" fill="currentColor" {...props}>
    <path d="m79.82 17.54s.05 0 .08-.02l4.64-1.38s.07-.02.1-.05h.33v-1.97h-52.6v-9.86l-3.07-4.21v-.03h-.01l-.02-.02v.03l-28.17 10.92-.13.05v19.78h4.01v1.22h54.58v-1.72h25.4v-1.82h-18.5v-10.92zm4.15 12.41h-24.9v-.06l-7.4.06h-22.7v-.9h55zm-83-18.2 28-10.75v29.98l-2.34.02h-25.66v-19.25zm31 17.25v-11h5v11zm6 0v-11h7v11zm7 0v-11h7v11zm39-13.03v.03h-55v-1h55zm-32 13.03v-11h7v11zm14 0h-7v-11h7z"></path>
  </svg>
);

const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  house: CustomHouse,
  ruler: CustomRuler,
  sofa: CustomSofa,
};

export default function HomeServices() {
  const dispatch = useAppDispatch();
  const currentPages = useAppSelector((state: RootState) => state.pages.currentPages);
  const isEditable = useAppSelector((state: RootState) => state.pages.isEditablePage);
  const section = useSection("Services");
  if (!section) return null;

  const items = Array.isArray(section.content) ? section.content : [];
  const handle = (fieldPath: string) => (value: string) => saveField(dispatch, currentPages, section.id, fieldPath, value);

  return (
    <section
      id="services"
      className="home-section-line scroll-mt-24 bg-white py-16 md:py-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="font-editorial text-[10px] uppercase tracking-[0.26em] text-[#767676] md:text-xs">
            Our services
          </p>
        </motion.div>

        <div className="grid gap-8 border-t border-[#d7d7d7] pt-6 md:grid-cols-3 md:gap-6">
          {items.map((item: any, i: number) => {
            const iconKey = item.props?.icon || ["house", "sofa", "ruler"][i] || "house";
            const Icon = icons[iconKey] || icons.house;

            return (
              <motion.article
                key={item.id || i}
                variants={fadeInUp}
                className="flex flex-col min-h-[340px] border border-[#dfdfdf] p-8 md:p-10"
              >
                <div className="w-full flex justify-start items-center pb-6 border-b border-[#dfdfdf] mb-8">
                  <Icon className="h-8 w-auto max-w-full text-[#141414]" />
                </div>

                <h3 className="font-display mt-2 mb-4 text-2xl md:text-[1.75rem] font-medium leading-tight text-[#141414]">
                  <EditableText value={item.props?.name?.en || ''} isEditable={isEditable} onSave={handle(`content.${i}.props.name.en`)} tag="span" />
                </h3>
                <p className="font-editorial text-sm leading-7 text-[#555555]">
                  <EditableText value={item.props?.desc?.en || ''} isEditable={isEditable} onSave={handle(`content.${i}.props.desc.en`)} tag="span" />
                </p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
