"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import TeamCard from "./TeamCard";
import TeamModal from "./TeamModal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import team data
import teamMembers from "@/lib/data/teamData.json";
import Link from "next/link";

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<
    (typeof teamMembers)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (member: (typeof teamMembers)[0]) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay to allow exit animation before clearing selected member
    setTimeout(() => setSelectedMember(null), 300);
  };

  return (
    <section className="pt-10 pb-0 md:py-20 bg-[#3a225c]">
      <div className=" mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="px-10 md:px-5 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              The People Behind{" "}
              <span className="text-[#f9f871]">the Vision</span>
            </h2>
            <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
          </div>
        </motion.div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={12}
            slidesPerView={2}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            navigation={{
              nextEl: ".team-swiper-button-next",
              prevEl: ".team-swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            // autoplay={{
            //   delay: 4000,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
            loop={false}
            className="team-swiper"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <TeamCard
                  member={member}
                  index={index}
                  onClick={() => handleCardClick(member)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            type="button"
            aria-label="Previous team member"
            className="team-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#fc98ac] hover:border-[#fc98ac] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next team member"
            className="team-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#fc98ac] hover:border-[#fc98ac] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 text-center flex justify-center items-center">
          <Link
            href="/about/team"
            className="block px-6 py-2.5 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg text-center"
            onClick={() => {}}
          >
            Learn More About Our Team
          </Link>
        </div>
      </div>

      {/* Team Modal */}
      <TeamModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <style jsx global>{`
        .team-swiper {
          padding: 20px 60px !important;
        }

        .team-swiper .swiper-slide {
          height: auto;
        }

        .team-swiper .swiper-pagination {
          bottom: -40px !important;
        }

        .team-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }

        .team-swiper .swiper-pagination-bullet-active {
          background: #f9f871;
          width: 24px;
          border-radius: 5px;
        }

        @media (max-width: 640px) {
          .team-swiper {
            padding: 20px 16px !important;
          }

          .team-swiper .swiper-slide {
            width: calc(50% - 6px) !important;
          }
        }
      `}</style>
    </section>
  );
}
