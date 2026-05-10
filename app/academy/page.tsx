"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import AcademyHero from "@/components/academy/AcademyHero";
import BookCard, { Book } from "@/components/academy/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation as SwiperNavigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

// Dummy books related to The Relevant Woman themes
const books: Book[] = [
  {
    id: "1",
    title: "Leadership Foundations for Young Women",
    description:
      "A comprehensive guide to building essential leadership skills and confidence to lead with purpose and impact.",
    author: {
      name: "Iveren Ann Lyam",
      image:
        "/assets/images/team/iveren_ann_lyam_founder_the_relevant_woman.jpg",
    },
    pages: 245,
    readTime: "6-8 hours",
    rating: 4.8,
    reviews: 124,
    category: "Leadership",
    categoryColor: "#3b82f6",
    coverImage: "/assets/images/books/book-cover-1.png",
    pdfPath: "/assets/books/book-1.pdf",
    featured: true,
    publishedDate: "2024",
  },
  {
    id: "2",
    title: "Career Development Mastery",
    description:
      "Navigate your career path with confidence and strategic planning. Learn how to identify opportunities and build a fulfilling career.",
    author: {
      name: "Victoria Wilson",
      image: "/assets/images/team/victoria_wilson_project_manager.jpg",
    },
    pages: 312,
    readTime: "8-10 hours",
    rating: 4.9,
    reviews: 89,
    category: "Career",
    categoryColor: "#ec4899",
    coverImage: "/assets/images/books/book-cover-2.jpeg",
    pdfPath: "/assets/books/book-2.pdf",
    publishedDate: "2024",
  },
  {
    id: "3",
    title: "Mentorship Excellence: A Guide to Empowering Others",
    description:
      "Learn to become an effective mentor and guide others on their journey. Discover the art of meaningful mentorship.",
    author: {
      name: "Gift Odey",
      image: "/assets/images/team/gift_odey_hr_administrative_manager.jpg",
    },
    pages: 198,
    readTime: "5-6 hours",
    rating: 4.7,
    reviews: 156,
    category: "Mentorship",
    categoryColor: "#10b981",
    coverImage: "/assets/images/books/book-cover-3.jpeg",
    pdfPath: "/assets/books/book-1.pdf",
    publishedDate: "2024",
  },
  {
    id: "4",
    title: "Personal Branding for Professional Women",
    description:
      "Build a powerful personal brand that opens doors and creates opportunities. Master the art of professional presence.",
    author: {
      name: "Mercy Shamaki",
    },
    pages: 267,
    readTime: "7-9 hours",
    rating: 4.6,
    reviews: 203,
    category: "Branding",
    categoryColor: "#f59e0b",
    coverImage: "/assets/images/books/book-cover-4.jpeg",
    pdfPath: "/assets/books/book-2.pdf",
    publishedDate: "2024",
  },
  {
    id: "5",
    title: "Financial Literacy for Entrepreneurs",
    description:
      "Master financial management and build wealth as a female entrepreneur. Essential financial skills for business success.",
    author: {
      name: "Cynthia Christopher",
    },
    pages: 389,
    readTime: "10-12 hours",
    rating: 4.9,
    reviews: 67,
    category: "Finance",
    categoryColor: "#8b5cf6",
    coverImage: "/assets/images/books/book-cover-5.jpg",
    pdfPath: "/assets/books/book-1.pdf",
    publishedDate: "2024",
  },
  {
    id: "6",
    title: "Public Speaking and Communication Mastery",
    description:
      "Overcome fear and master the art of confident public speaking. Transform your communication skills and presence.",
    author: {
      name: "Treasure Babalola",
    },
    pages: 223,
    readTime: "6-7 hours",
    rating: 4.8,
    reviews: 145,
    category: "Communication",
    categoryColor: "#ef4444",
    coverImage: "/assets/images/books/book-cover-6.jpg",
    pdfPath: "/assets/books/book-2.pdf",
    publishedDate: "2024",
  },
];

const featuredBooks = books.filter((book) => book.featured);
const recommendedBooks = books.slice(0, 4);
const popularBooks = books.slice(1, 5);
const trendingBooks = books.slice(2, 6);

export default function Academy() {
  return (
    <main className="min-h-screen bg-[#3a225c]">
      <Navigation />
      <AcademyHero />

      {/* Featured Books */}
      {featuredBooks.length > 0 && (
        <section className="py-12 bg-[#3a225c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured Books
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {featuredBooks.map((book, index) => (
                <BookCard
                  key={book.id}
                  book={book}
                  variant="featured"
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended Books */}
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
              1280: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: ".swiper-button-prev-recommended",
              nextEl: ".swiper-button-next-recommended",
            }}
            className="relative"
          >
            {recommendedBooks.map((book, index) => (
              <SwiperSlide key={book.id}>
                <BookCard book={book} index={index} />
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

      {/* Most Popular Books */}
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
              1280: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: ".swiper-button-prev-popular",
              nextEl: ".swiper-button-next-popular",
            }}
            className="relative"
          >
            {popularBooks.map((book, index) => (
              <SwiperSlide key={book.id}>
                <BookCard book={book} index={index} />
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

      {/* Trending Books */}
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
              1280: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: ".swiper-button-prev-trending",
              nextEl: ".swiper-button-next-trending",
            }}
            className="relative"
          >
            {trendingBooks.map((book, index) => (
              <SwiperSlide key={book.id}>
                <BookCard book={book} index={index} />
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

      <Footer />
    </main>
  );
}
