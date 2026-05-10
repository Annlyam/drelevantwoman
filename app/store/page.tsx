"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import StoreHero from "@/components/store/StoreHero";
import KeyBenefits from "@/components/academy/KeyBenefits";
import ProgramCard, { Program } from "@/components/academy/ProgramCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation as SwiperNavigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FloatingCartButton from "@/components/shared/FloatingCartButton";
import "swiper/css";
import "swiper/css/navigation";

// Dummy programs related to The Relevant Woman themes
const programs: Program[] = [
  {
    id: "1",
    title: "Leadership Foundations for Young Women",
    description:
      "Build essential leadership skills and confidence to lead with purpose and impact.",
    instructor: {
      name: "Iveren Ann Lyam",
      image:
        "/assets/images/team/iveren_ann_lyam_founder_the_relevant_woman.jpg",
    },
    duration: "8 hours",
    level: "Beginner",
    rating: 4.8,
    reviews: 124,
    price: 49,
    originalPrice: 99,
    category: "Leadership",
    categoryColor: "#3b82f6",
    categoryIcon: "👑",
    image: "/assets/images/extras/mentorship_session.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Career Development Mastery",
    description:
      "Navigate your career path with confidence and strategic planning.",
    instructor: {
      name: "Victoria Wilson",
      image: "/assets/images/team/victoria_wilson_project_manager.jpg",
    },
    duration: "12 hours",
    level: "Intermediate",
    rating: 4.9,
    reviews: 89,
    price: 79,
    originalPrice: 149,
    category: "Career",
    categoryColor: "#ec4899",
    categoryIcon: "💼",
    image: "/assets/images/extras/collaborative_learning.jpg",
  },
  {
    id: "3",
    title: "Mentorship Excellence Program",
    description:
      "Learn to become an effective mentor and guide others on their journey.",
    instructor: {
      name: "Gift Odey",
      image: "/assets/images/team/gift_odey_hr_administrative_manager.jpg",
    },
    duration: "10 hours",
    level: "Intermediate",
    rating: 4.7,
    reviews: 156,
    price: 69,
    category: "Mentorship",
    categoryColor: "#10b981",
    categoryIcon: "🤝",
    image: "/assets/images/extras/network_event.jpg",
  },
  {
    id: "4",
    title: "Personal Branding for Professional Women",
    description:
      "Build a powerful personal brand that opens doors and creates opportunities.",
    instructor: {
      name: "Mercy Shamaki",
    },
    duration: "6 hours",
    level: "Beginner",
    rating: 4.6,
    reviews: 203,
    price: 59,
    category: "Branding",
    categoryColor: "#f59e0b",
    categoryIcon: "✨",
    image: "/assets/images/extras/empowerment_workshop.jpg",
  },
  {
    id: "5",
    title: "Financial Literacy for Entrepreneurs",
    description:
      "Master financial management and build wealth as a female entrepreneur.",
    instructor: {
      name: "Cynthia Christopher",
    },
    duration: "14 hours",
    level: "Advanced",
    rating: 4.9,
    reviews: 67,
    price: 99,
    originalPrice: 199,
    category: "Finance",
    categoryColor: "#8b5cf6",
    categoryIcon: "💰",
    image: "/assets/images/extras/collaborative_learning.jpg",
  },
  {
    id: "6",
    title: "Public Speaking and Communication",
    description:
      "Overcome fear and master the art of confident public speaking.",
    instructor: {
      name: "Treasure Babalola",
    },
    duration: "7 hours",
    level: "Beginner",
    rating: 4.8,
    reviews: 145,
    price: 54,
    category: "Communication",
    categoryColor: "#ef4444",
    categoryIcon: "🎤",
    image: "/assets/images/extras/mentorship_session.jpg",
  },
  {
    id: "7",
    title: "Networking Strategies for Success",
    description:
      "Build meaningful professional relationships that advance your career.",
    instructor: {
      name: "Iveren Ann Lyam",
      image:
        "/assets/images/team/iveren_ann_lyam_founder_the_relevant_woman.jpg",
    },
    duration: "5 hours",
    level: "Beginner",
    rating: 4.7,
    reviews: 178,
    price: 49,
    category: "Networking",
    categoryColor: "#06b6d4",
    categoryIcon: "🌐",
    image: "/assets/images/extras/network_event.jpg",
  },
  {
    id: "8",
    title: "Work-Life Balance Mastery",
    description:
      "Achieve harmony between your professional ambitions and personal well-being.",
    instructor: {
      name: "Victoria Wilson",
      image: "/assets/images/team/victoria_wilson_project_manager.jpg",
    },
    duration: "9 hours",
    level: "Intermediate",
    rating: 4.6,
    reviews: 112,
    price: 64,
    category: "Wellness",
    categoryColor: "#14b8a6",
    categoryIcon: "⚖️",
    image: "/assets/images/extras/empowerment_workshop.jpg",
  },
];

const recommendedPrograms = programs.slice(0, 4);
const popularPrograms = programs.slice(2, 6);
const trendingPrograms = programs.slice(4, 8);

export default function Store() {
  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />
      <StoreHero />
      <KeyBenefits />

      {/* Recommended Products (hidden) */}
      {false && (
        <section className="py-12 bg-[#3a225c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Recommended to You
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
                prevEl: ".swiper-button-prev-recommended",
                nextEl: ".swiper-button-next-recommended",
              }}
              className="relative"
            >
              {recommendedPrograms.map((program, index) => (
                <SwiperSlide key={program.id}>
                  <ProgramCard program={program} index={index} />
                </SwiperSlide>
              ))}
              <button
                className="swiper-button-prev-recommended absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                type="button"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                className="swiper-button-next-recommended absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                type="button"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </Swiper>
          </div>
        </section>
      )}

      {/* Most Popular Products (hidden) */}
      {false && (
        <section className="py-12 bg-[#3a225c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Most Popular
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
                prevEl: ".swiper-button-prev-popular",
                nextEl: ".swiper-button-next-popular",
              }}
              className="relative"
            >
              {popularPrograms.map((program, index) => (
                <SwiperSlide key={program.id}>
                  <ProgramCard program={program} index={index} />
                </SwiperSlide>
              ))}
              <button
                className="swiper-button-prev-popular absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                type="button"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                className="swiper-button-next-popular absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                type="button"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </Swiper>
          </div>
        </section>
      )}

      {/* Trending Products (hidden) */}
      {false && (
        <section className="py-12 bg-[#3a225c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Trending Now
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
                prevEl: ".swiper-button-prev-trending",
                nextEl: ".swiper-button-next-trending",
              }}
              className="relative"
            >
              {trendingPrograms.map((program, index) => (
                <SwiperSlide key={program.id}>
                  <ProgramCard program={program} index={index} />
                </SwiperSlide>
              ))}
              <button
                className="swiper-button-prev-trending absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                type="button"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                className="swiper-button-next-trending absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                type="button"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </Swiper>
          </div>
        </section>
      )}

      <FloatingCartButton />
      <Footer />
    </main>
  );
}
