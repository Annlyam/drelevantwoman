"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProgramCard, { Program } from "@/components/academy/ProgramCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation as SwiperNavigation } from "swiper/modules";
import "swiper/css/navigation";

type StoreCollectionSectionProps = {
  title: string;
  programs: Program[];
  navigationClassName: string;
};

export default function StoreCollectionSection({
  title,
  programs,
  navigationClassName,
}: StoreCollectionSectionProps) {
  const previousButtonClassName = `swiper-button-prev-${navigationClassName}`;
  const nextButtonClassName = `swiper-button-next-${navigationClassName}`;

  return (
    <section className="py-12 bg-[#3a225c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        <Swiper
          modules={[SwiperNavigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation={{
            prevEl: `.${previousButtonClassName}`,
            nextEl: `.${nextButtonClassName}`,
          }}
          className="relative"
        >
          {programs.map((program, index) => (
            <SwiperSlide key={program.id}>
              <ProgramCard program={program} index={index} />
            </SwiperSlide>
          ))}
          <button
            className={`${previousButtonClassName} absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors`}
            type="button"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className={`${nextButtonClassName} absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors`}
            type="button"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </Swiper>
      </div>
    </section>
  );
}