"use client";

import { useState, useMemo } from "react";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import AcademyHero from "@/components/academy/AcademyHero";
import BookCard from "@/components/academy/BookCard";
import ProgramCard from "@/components/academy/ProgramCard";
import { booksData, programsData } from "@/lib/data/academyData";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Award, Search } from "lucide-react";

type FilterType = "all" | "books" | "programs";

export default function Academy() {
  const [activeTab, setActiveTab] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    return booksData.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredPrograms = useMemo(() => {
    return programsData.filter((program) =>
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const hasResults =
    (activeTab === "all" && (filteredBooks.length > 0 || filteredPrograms.length > 0)) ||
    (activeTab === "books" && filteredBooks.length > 0) ||
    (activeTab === "programs" && filteredPrograms.length > 0);

  return (
    <main className="min-h-screen bg-[#3a225c] text-white">
      <Navigation />
      
      {/* Academy Hero Section */}
      <AcademyHero />

      {/* Main Grid and Filter Section */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          {/* Tabs */}
          <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10 self-start">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-[#f9f871] text-[#3a225c] shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              All Resources
            </button>
            <button
              onClick={() => setActiveTab("books")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "books"
                  ? "bg-[#f9f871] text-[#3a225c] shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Books
            </button>
            <button
              onClick={() => setActiveTab("programs")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "programs"
                  ? "bg-[#f9f871] text-[#3a225c] shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Award className="w-4 h-4" />
              Courses & Programs
            </button>
          </div>

          {/* Search bar inside container */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search resource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#fc98ac] focus:border-transparent text-sm transition-all"
            />
          </div>
        </div>

        {/* Content Grids */}
        <AnimatePresence mode="wait">
          {hasResults ? (
            <motion.div
              key={activeTab + searchQuery}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Programs Grid */}
              {(activeTab === "all" || activeTab === "programs") && filteredPrograms.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="p-2 bg-[#fc98ac]/10 rounded-lg text-[#fc98ac]">
                      🎓
                    </span>
                    <h2 className="text-2xl font-bold text-white">Courses & Workshops</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPrograms.map((program, index) => (
                      <ProgramCard key={program.id} program={program} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* Books Grid */}
              {(activeTab === "all" || activeTab === "books") && filteredBooks.length > 0 && (
                <div className="space-y-6 pt-6">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="p-2 bg-[#f9f871]/10 rounded-lg text-[#f9f871]">
                      📚
                    </span>
                    <h2 className="text-2xl font-bold text-white">Featured Books & Guides</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBooks.map((book, index) => (
                      <BookCard key={book.id} book={book} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/5 rounded-2xl border border-white/10"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No Resources Found</h3>
              <p className="text-white/60">
                We couldn&apos;t find any items matching &quot;{searchQuery}&quot;. Please try another search term.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}
