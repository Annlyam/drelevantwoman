"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";

export default function StoreHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#2c144c] via-[#2c144c] to-[#5b1364] pt-20 md:pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl font-bold text-white/5">
          🛍️
        </div>
        <div className="absolute top-40 right-20 text-5xl font-bold text-white/5">
          💼
        </div>
        <div className="absolute bottom-20 left-1/4 text-7xl font-bold text-white/5">
          ✨
        </div>
        <div className="absolute bottom-40 right-1/3 text-6xl font-bold text-white/5">
          🎁
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-[#f9f871]" />
              <span className="text-white/90 text-sm font-medium">
                Curated Collection
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Welcome to The Relevant Woman{" "}
              <span className="text-[#f9f871]">Store</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-white/85 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore our curated collection of products designed to inspire,
              empower, and uplift you. From books and courses to accessories and
              lifestyle items, we have something for everyone.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 z-10" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#fc98ac] focus:border-[#fc98ac] transition-all"
                />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="px-8 py-4 bg-[#f9f871] text-[#3a225c] rounded-xl font-semibold hover:bg-[#f9f871]/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Browse Products
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-105">
                View Collections
              </button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* Image */}
              <Image
                src="/assets/images/extras/book-hero.jpeg"
                alt="The Relevant Woman Store"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a225c]/80 via-transparent to-transparent" />

              {/* Decorative Elements */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-[#f9f871]/20 backdrop-blur-sm rounded-full border border-[#f9f871]/30 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-[#f9f871]" />
              </div>

              <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <p className="text-white font-semibold text-sm">
                  ✨ Premium Quality
                </p>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-[#fc98ac]/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#f9f871]/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
