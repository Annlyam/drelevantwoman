"use client";

import { motion } from "framer-motion";
import { Search, BookOpen } from "lucide-react";

export default function AcademyHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#2c144c] via-[#2c144c] to-[#2d0e5c] pt-20 md:pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 text-6xl font-bold text-white/10">
          📚
        </div>
        <div className="absolute top-40 right-20 text-5xl font-bold text-white/10">
          📖
        </div>
        <div className="absolute bottom-20 left-1/4 text-7xl font-bold text-white/10">
          ✍️
        </div>
        <div className="absolute bottom-40 right-1/3 text-6xl font-bold text-white/10">
          💡
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center">
          {/* Centered Content */}
          <motion.div
            className="space-y-6 max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
              <BookOpen className="w-5 h-5 text-[#f9f871]" />
              <span className="text-white/90 font-medium">Digital Library</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Welcome to The Relevant Woman{" "}
              <span className="text-[#f9f871]">Academy</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Explore our curated collection of empowering books designed to
              inspire, educate, and transform. From leadership guides to
              personal development, discover knowledge that shapes your journey.
            </p>
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search books..."
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#fc98ac] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-[#f9f871] text-[#3a225c] rounded-lg font-semibold hover:bg-[#f9f871]/90 transition-colors">
                Browse Books
              </button>
              <button className="px-8 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                View Collections
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
