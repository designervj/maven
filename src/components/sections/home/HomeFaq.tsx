"use client";

import { motion } from "framer-motion";
import { fadeInUp, stagger } from "@/components/sections/anim";

type FaqItem = {
  question: string;
  answer: string;
};

type HomeFaqProps = {
  items: FaqItem[];
};

export default function HomeFaq({ items }: HomeFaqProps) {
  return (
    <section className="bg-white py-16 md:py-20 border-t border-[#d7d7d7]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <motion.div variants={fadeInUp} className="mb-10 text-center md:text-left">
          <p className="font-editorial text-[10px] uppercase tracking-[0.26em] text-[#767676] md:text-xs">
            Frequently Asked Questions
          </p>
          <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.04em] text-[#141414]">
            Designing for Your Peace of Mind
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="border border-[#dfdfdf] bg-white p-8 md:p-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b0b0b0] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <h3 className="font-display mb-4 text-xl md:text-2xl font-medium leading-tight text-[#141414]">
                {item.question}
              </h3>
              <p className="font-editorial text-sm leading-7 text-[#555555]">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
