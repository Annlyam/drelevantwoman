"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, BarChart3, Star, Users } from "lucide-react";

interface ProgramDetailHeroProps {
  title: string;
  description: string;
  instructor: {
    name: string;
    image?: string;
  };
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  category: string;
  categoryColor: string;
  categoryIcon: string;
  heroImage: string;
}

export default function ProgramDetailHero({
  title,
  description,
  instructor,
  duration,
  level,
  rating,
  reviews,
  price,
  originalPrice,
  category,
  categoryColor,
  categoryIcon,
  heroImage,
}: ProgramDetailHeroProps) {
  return (
    <section className="relative bg-[#3a225c] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Category Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-xl">{categoryIcon}</span>
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
                <Clock className="w-5 h-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                <span>{level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-[#f9f871] text-[#f9f871]" />
                <span>{rating}</span>
                <span className="text-white/50">({reviews} reviews)</span>
              </div>
            </motion.div>

            {/* Instructor */}
            <motion.div
              className="flex items-center gap-3 pt-4 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {instructor.image ? (
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#fc98ac] flex items-center justify-center text-white text-lg font-bold">
                  {instructor.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm text-white/60">Instructor</p>
                <p className="text-lg font-semibold text-white">
                  {instructor.name}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Hero Image and Price Card */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={heroImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Price Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-[#f9f871]">
                      ${price}
                    </span>
                    {originalPrice && (
                      <span className="text-lg text-white/50 line-through">
                        ${originalPrice}
                      </span>
                    )}
                  </div>
                  {originalPrice && (
                    <p className="text-sm text-[#fc98ac] mt-1">
                      {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
