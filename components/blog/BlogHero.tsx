"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

export default function BlogHero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative pt-20 md:pt-32 pb-16 bg-[#3a225c]">
      <div className="max-w-full md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hey, we&apos;re The Relevant Woman. We promote positive culture
          through <span className="text-[#f9f871]">inspiring articles</span> on
          empowerment, leadership, and growth.
        </motion.h1>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts, tags and authors"
            className="w-full px-6 py-4 pr-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#f9f871]/50 focus:border-[#f9f871]/50 transition-all duration-300"
          />
          <button
            title="Search"
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#f9f871] text-[#3a225c] rounded-full hover:bg-[#ffbc5c] transition-colors duration-300"
          >
            <Search size={20} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
