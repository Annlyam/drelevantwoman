"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Star, Clock, User } from "lucide-react";
import { generateSlug, getIsFeatured } from "@/lib/utils";

export interface Book {
  id: string;
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
  featured?: boolean;
  publishedDate: string;
}

interface BookCardProps {
  book: Book;
  variant?: "default" | "featured";
  index?: number;
}

export default function BookCard({
  book,
  variant = "default",
  index = 0,
}: BookCardProps) {
  const slug = generateSlug(book.title);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/academy/${slug}`}>
        <div className="bg-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-[#fc98ac]/50">
          {/* Book Cover */}
          <div className="relative h-[300px] overflow-hidden bg-gradient-to-br from-[#3a225c] to-[#914177]">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover  group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3a225c]/80 via-transparent to-transparent" />
            {getIsFeatured(book) && (
              <div className="absolute top-3 left-3 px-3 py-1 bg-[#f9f871] text-[#3a225c] rounded-full text-xs font-bold">
                Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-4 bg-[#3a225c]">
            {/* Category Badge */}
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${book.categoryColor}20`,
                color: book.categoryColor,
              }}
            >
              {book.category}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-[#fc98ac] transition-colors">
              {book.title}
            </h3>

            {/* Author */}
            <div className="flex items-center gap-2">
              {book.author.image ? (
                <Image
                  src={book.author.image}
                  alt={book.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#f9f871] flex items-center justify-center text-[#3A225C] text-xs font-bold">
                  {book.author.name.charAt(0)}
                </div>
              )}
              <span className="text-sm text-white/70">{book.author.name}</span>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{book.pages} pages</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{book.readTime}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(book.rating)
                        ? "fill-[#f9f871] text-[#f9f871]"
                        : "fill-none text-white/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/80">
                {book.rating} ({book.reviews})
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
