"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Clock, Star, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BookDetailHeroProps {
  title: string;
  description: string;
  author: {
    name: string;
    image?: string;
  };
  pages: number;
  readTime: string;
  rating: number;
  reviews: number;
  category: string;
  categoryColor: string;
  coverImage: string;
  pdfPath: string;
  publishedDate: string;
}

export default function BookDetailHero({
  title,
  description,
  author,
  pages,
  readTime,
  rating,
  reviews,
  category,
  categoryColor,
  coverImage,
  pdfPath,
  publishedDate,
}: BookDetailHeroProps) {
  return (
    <section className="relative bg-[#3a225c] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Category Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: `${categoryColor}20`,
                color: categoryColor,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>{category}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-white/85 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {description}
            </motion.p>

            {/* Meta Info */}
            <motion.div
              className="flex flex-wrap items-center gap-6 text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{pages} pages</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-[#f9f871] text-[#f9f871]" />
                <span>{rating}</span>
                <span className="text-white/50">({reviews} reviews)</span>
              </div>
            </motion.div>

            {/* Author */}
            <motion.div
              className="flex items-center gap-3 pt-4 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#fc98ac] flex items-center justify-center text-white text-lg font-bold">
                  {author.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm text-white/60">Author</p>
                <p className="text-lg font-semibold text-white">
                  {author.name}
                </p>
              </div>
            </motion.div>

            {/* Read Book Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link
                href={`/academy/read?book=${encodeURIComponent(
                  pdfPath
                )}&title=${encodeURIComponent(title)}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#fc98ac] text-white rounded-lg font-semibold hover:bg-[#fc98ac]/80 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Read Book
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Book Cover */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
