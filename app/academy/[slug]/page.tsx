"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import BookDetailHero from "@/components/academy/BookDetailHero";
import { generateSlug } from "@/lib/utils";
import { booksData } from "@/lib/data/academyData";
import { motion } from "framer-motion";
import { CheckCircle, BookOpen, Clock, Star } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BookDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  
  // Find the book by matching its generated slug
  const book = booksData.find((b) => generateSlug(b.title) === slug);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#3a225c] text-white">
      <Navigation />

      {/* Hero Section */}
      <BookDetailHero
        title={book.title}
        description={book.description}
        author={book.author}
        pages={book.pages}
        readTime={book.readTime}
        rating={book.rating}
        reviews={book.reviews}
        category={book.category}
        categoryColor={book.categoryColor}
        coverImage={book.coverImage}
        pdfPath={book.pdfPath}
        publishedDate={book.publishedDate}
      />

      {/* Main Content Section */}
      <section className="py-10 md:py-20 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* What You'll Learn */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  What You&apos;ll Learn
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {book.whatYouLearn.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#fc98ac] flex-shrink-0 mt-0.5" />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Key Takeaways */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Key Takeaways
                </h2>
                <ul className="space-y-3">
                  {book.keyTakeaways.map((takeaway: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-white/80"
                    >
                      <span className="text-[#fc98ac]">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* Table of Contents */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Table of Contents
                </h2>
                <div className="space-y-3">
                  {book.chapters.map((chapter: string, index: number) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#fc98ac]/20 flex items-center justify-center text-[#fc98ac] font-bold">
                          {index + 1}
                        </div>
                        <p className="text-white/90 font-medium">{chapter}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Book Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <BookOpen className="w-5 h-5 text-[#fc98ac]" />
                    <span>{book.pages} pages</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="w-5 h-5 text-[#fc98ac]" />
                    <span>{book.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Star className="w-5 h-5 text-[#f9f871] fill-[#f9f871]" />
                    <span>
                      {book.rating} ({book.reviews} reviews)
                    </span>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/60 mb-1">Published</p>
                    <p className="text-white font-semibold">
                      {book.publishedDate}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
