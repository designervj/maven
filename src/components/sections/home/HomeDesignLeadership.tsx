"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "@/components/sections/anim";

type Point = {
  text: string;
};

type HomeDesignLeadershipProps = {
  title: string;
  points: Point[];
  image: string;
};

export default function HomeDesignLeadership({ title, points, image }: HomeDesignLeadershipProps) {
  return (
    <section className="bg-[#f4f4f2] py-20 md:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={stagger}
        className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
      >
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.85fr)] lg:items-center">
          
          <div className="flex flex-col justify-center">
            <motion.h2 
              variants={fadeInUp}
              className="font-display max-w-4xl text-[clamp(2.5rem,5.5vw,5.5rem)] font-normal leading-[1.05] tracking-[-0.04em] text-[#141414] mb-20 lg:mb-28"
            >
              {title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {points.map((point, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex items-start gap-4">
                  <span className="font-mono text-xs mt-1 text-[#888888] tracking-widest">//</span>
                  <p className="font-editorial text-[14px] leading-[1.7] text-[#555555]">
                    {point.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={fadeInUp} className="relative aspect-[0.85] w-full overflow-hidden rounded-[20px] shadow-sm">
            <Image
              src={image}
              alt="Design Leadership"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}
