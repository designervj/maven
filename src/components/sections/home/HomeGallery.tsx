"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, stagger } from "@/components/sections/anim";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, FreeMode } from "swiper/modules";
import { X } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

export default function HomeGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "/assets/Image/portfolio/IMG_5634.PNG",
    "/assets/Image/portfolio/IMG_5635.PNG",
    "/assets/Image/portfolio/IMG_5636.PNG",
    "/assets/Image/portfolio/IMG_5637.PNG",
    "/assets/Image/portfolio/IMG_5638.PNG",
    "/assets/Image/portfolio/IMG_5639.PNG",
    "/assets/Image/portfolio/IMG_5640.PNG",
    "/assets/Image/portfolio/IMG_5641.PNG",
    "/assets/Image/portfolio/IMG_5642.PNG",
    "/assets/Image/portfolio/IMG_5643.PNG",
  ];

  return (
    <>
      <section className="bg-white py-16 md:py-20 border-t border-[#d7d7d7]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-10"
        >
          <div className="mb-10 text-center">
            <motion.div variants={fadeInUp}>
              <p className="font-editorial text-[10px] uppercase tracking-[0.26em] text-[#767676] md:text-xs">
                Moments
              </p>
              <h2 className="font-display mt-3 text-[2rem] font-medium tracking-[-0.04em] text-[#141414] md:text-[2.4rem]">
                Photo Gallery
              </h2>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="w-full">
            <Swiper
              modules={[Autoplay, Mousewheel, FreeMode]}
              spaceBetween={24}
              slidesPerView={1.5}
              breakpoints={{
                640: { slidesPerView: 2.5 },
                768: { slidesPerView: 3.5 },
                1024: { slidesPerView: 5 },
              }}
              loop={true}
              freeMode={true}
              grabCursor={true}
              mousewheel={{
                forceToAxis: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={800}
              className="w-full !pb-8"
            >
              {images.map((src, i) => (
                <SwiperSlide key={i}>
                  <div 
                    className="relative aspect-square overflow-hidden bg-[#ece8e2] rounded-lg cursor-pointer group"
                    onClick={() => setSelectedImage(src)}
                  >
                    <Image
                      src={src}
                      alt={`Gallery image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md cursor-zoom-out"
          >
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh] cursor-default flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt="Gallery full preview"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
