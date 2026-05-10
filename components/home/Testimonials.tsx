"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TestimonialModal from "./TestimonialModal";

const QUOTE_MAX_LENGTH = 200;

const testimonials = [
  {
    quote:
      "The trainings were truly transformative for me, touching not just my mind but my heart. The \"Her Money Her Power\" program, in particular, was a revelation. \nIt opened my eyes to a world of financial opportunities I had never even considered before. For so long, I felt held back by my limited understanding of money and finances, especially as a woman navigating a complex world. \nThis program didn't just teach me facts; it gave me confidence, hope, and a sense of empowerment I had been missing. It made me realize that financial knowledge is not just about numbers—it's about reclaiming control over my life and future. \nI now see possibilities where I once saw barriers, and that has changed everything for me on a deeply personal level.",
    name: "Sienna Ebioke",
    role: "Mentee",
    image: "/assets/images/testimonials/sienna-ebioke.jpeg",
  },
  {
    quote:
      "Being a part of The Relevant Woman has placed me on platform where I can grow and thrive. The lessons learned from the sessions have helped position my mind in a positive way. Also, being in the midst of such intentional people serves as a drive to keep going even in days where I feel demotivated. I am glad to be a part of The Relevant Woman Community.",
    name: "Favour Ogbonna",
    role: "Mentee",
    image: "/assets/images/testimonials/favour-ogbonna.jpeg",
  },
  {
    quote:
      "Ann has been instrumental in my growth. Her guidance, counsel, and unwavering belief in me have shaped not just my skills, but my mindset. \nThrough her support, I've learned to see challenges as opportunities and growth as a continuous journey. \nI am deeply grateful for her impact on my life.",
    name: "Chidalu",
    role: "Mentee",
    image: "/assets/images/testimonials/chidalu.jpeg",
  },
  {
    quote:
      "I have a testimony. \n2 weeks ago I was able to speak confidently in a program facing the crowd😅. That was during my Auntie's thanksgiving at her church. When she told me I was going to speak, I was literally shaking and trying to cram things in my head😅,when the time came I spoke so well by God's grace. I could feel that I was speaking well, all thanks to all that I've been learning during our mindset shift sessions and team meetings🥹. I'm practicing oo. \nBefore I wouldn't have even been able to open my mouth or I would have left the church premises before the time for me to speak. Thank you so much🫂. God bless you ❤️.",
    name: "Esther Jia",
    role: "Mentee",
    image: "/assets/images/testimonials/esther-jia.jpeg",
  },
];

function truncateQuote(quote: string, maxLength: number) {
  const plain = quote.replace(/\n/g, " ").trim();
  if (plain.length <= maxLength) return { text: plain, truncated: false };
  return {
    text: plain.substring(0, maxLength).trim() + "...",
    truncated: true,
  };
}

export default function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<
    (typeof testimonials)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (testimonial: (typeof testimonials)[0]) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTestimonial(null), 300);
  };

  return (
    <section className="py-8 sm:py-12 md:py-20 bg-section-gradient-reverse">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: "#fff" }}
            >
              Why Our Members Love{" "}
              <span className="text-[#f9f871]">Working With Us</span>
            </h2>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#f9f871] rotate-45 shrink-0" />
          </div>
        </motion.div>

        <div className="relative testimonials-swiper-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            navigation={{
              nextEl: ".testimonials-swiper-button-next",
              prevEl: ".testimonials-swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: ".testimonials-swiper-pagination",
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => {
              const { text, truncated } = truncateQuote(
                testimonial.quote,
                QUOTE_MAX_LENGTH
              );
              return (
                <SwiperSlide key={index}>
                  <motion.div
                    className="h-full rounded-xl cursor-pointer p-4 sm:p-5 md:p-6 border border-[#f9f871]/20 transition-all duration-300 shadow-lg hover:shadow-xl bg-white/5 flex flex-col min-h-0"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    whileHover={{
                      y: -6,
                      borderColor: "#f9f871",
                      boxShadow: "0 20px 40px rgba(249, 248, 113, 0.15)",
                    }}
                    onClick={() => handleReadMore(testimonial)}
                  >
                    <div className="flex gap-1 mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-[#ffbc5c] text-[#ffbc5c] shrink-0 sm:w-5 sm:h-5"
                        />
                      ))}
                    </div>

                    <p className="text-white mb-4 leading-loose sm:leading-relaxed text-[15px] sm:text-base max-w-prose tracking-normal flex-1">
                      &quot;{text}&quot;
                      {truncated && (
                        <>
                          {" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReadMore(testimonial);
                            }}
                            className="text-[#f9f871] font-semibold hover:underline focus:outline-none focus:underline inline-block py-2 -my-1 touch-manipulation"
                          >
                            Read More
                          </button>
                        </>
                      )}
                    </p>

                    <div className="flex items-center gap-3 sm:gap-4 mt-auto pt-2 border-t border-white/10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-semibold text-sm sm:text-base truncate">
                          {testimonial.name}
                        </div>
                        <div className="text-white/70 text-xs sm:text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button
            type="button"
            aria-label="Previous testimonial"
            className="testimonials-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hidden sm:flex items-center justify-center text-white hover:bg-[#fc98ac] hover:border-[#fc98ac] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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
            aria-label="Next testimonial"
            className="testimonials-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hidden sm:flex items-center justify-center text-white hover:bg-[#fc98ac] hover:border-[#fc98ac] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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
          <div className="testimonials-swiper-pagination flex justify-center gap-2 mt-4 sm:mt-6" />
        </div>

        <motion.div
          className="mt-8 sm:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/80 mb-6 text-base sm:text-lg px-1 max-w-2xl mx-auto leading-relaxed">
            Ready to join our community? Explore our{" "}
            <Link
              href="/academy"
              className="text-[#f9f871] hover:underline font-semibold"
            >
              programs
            </Link>
            , learn more{" "}
            <Link
              href="/about"
              className="text-[#f9f871] hover:underline font-semibold"
            >
              about us
            </Link>
            , or{" "}
            <Link
              href="/contact-us"
              className="text-[#f9f871] hover:underline font-semibold"
            >
              get in touch
            </Link>
            .
          </p>
        </motion.div>
      </div>

      <TestimonialModal
        testimonial={selectedTestimonial}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <style jsx global>{`
        .testimonials-swiper-wrapper {
          --testimonials-swiper-padding-x: 12px;
          --testimonials-swiper-padding-bottom: 44px;
        }
        @media (min-width: 640px) {
          .testimonials-swiper-wrapper {
            --testimonials-swiper-padding-x: 48px;
          }
        }
        @media (min-width: 1024px) {
          .testimonials-swiper-wrapper {
            --testimonials-swiper-padding-x: 60px;
          }
        }
        .testimonials-swiper {
          padding: 16px var(--testimonials-swiper-padding-x) var(--testimonials-swiper-padding-bottom);
        }
        .testimonials-swiper .swiper-slide {
          height: auto;
        }
        .testimonials-swiper-pagination {
          position: relative !important;
          bottom: auto !important;
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 8px 0;
        }
        .testimonials-swiper-pagination .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          width: 10px;
          height: 10px;
          margin: 0 4px !important;
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
          flex-shrink: 0;
        }
        @media (hover: hover) {
          .testimonials-swiper-pagination .swiper-pagination-bullet:hover {
            background: rgba(249, 248, 113, 0.6);
            transform: scale(1.2);
          }
        }
        .testimonials-swiper-pagination .swiper-pagination-bullet-active {
          background: #f9f871;
          width: 28px;
          border-radius: 6px;
          box-shadow: 0 0 12px rgba(249, 248, 113, 0.5);
        }
        @media (hover: hover) {
          .testimonials-swiper-pagination .swiper-pagination-bullet-active:hover {
            background: #f9f871;
            box-shadow: 0 0 16px rgba(249, 248, 113, 0.7);
            transform: scale(1.05);
          }
        }
        @media (max-width: 639px) {
          .testimonials-swiper-pagination .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
          }
          .testimonials-swiper-pagination .swiper-pagination-bullet-active {
            width: 24px;
          }
        }
      `}</style>
    </section>
  );
}
