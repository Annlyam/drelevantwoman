"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import { BookOpen, FileText, Play, Search, Library as LibraryIcon, ExternalLink, Download, Eye } from "lucide-react";
import Link from "next/link";

type Resource = {
  id: string;
  title: string;
  type: "pdf" | "article" | "video";
  description: string;
  author: string;
  category: string;
  url: string;
  duration?: string; // For videos
  pages?: number; // For PDFs
};

const resourcesData: Resource[] = [
  {
    id: "rwa-identity-manual",
    title: "RWA Identity & Leadership Manual",
    type: "pdf",
    description: "The core foundational training module of The Relevant Woman Academy covering identity clarity, self-leadership, and communication.",
    author: "Iveren Ann Lyam",
    category: "Leadership",
    url: "/assets/books/book-1.pdf",
    pages: 45,
  },
  {
    id: "mastering-self-confidence",
    title: "Mastering Self-Confidence & Personal Presence",
    type: "article",
    description: "An in-depth article outlining actionable steps young women can take to cultivate confidence, overcome imposter syndrome, and own their space.",
    author: "Victoria Wilson",
    category: "Branding",
    url: "/blog/mastering-self-confidence",
  },
  {
    id: "fireside-functioning-wholeness",
    title: "Fireside Chat: Functioning From Wholeness 💜",
    type: "video",
    description: "Watch our celebrated Fireside panel discussion exploring the journey of building impactful brands while living authentically and whole.",
    author: "TRW Panelists",
    category: "Community",
    url: "https://www.youtube.com/@therelevantwoman",
    duration: "1h 45m",
  },
  {
    id: "career-development-roadmap",
    title: "Career Development & Strategy Roadmap",
    type: "pdf",
    description: "A workbook containing resume frameworks, portfolio structuring guides, and modern job search strategies designed for Gen-Z women.",
    author: "Victoria Wilson",
    category: "Career",
    url: "/assets/books/book-2.pdf",
    pages: 60,
  },
  {
    id: "financial-literacy-tips",
    title: "Building Generational Wealth: Financial Literacy Tips",
    type: "article",
    description: "Discover primary budgeting techniques, investment paths, and strategies to build a wealthy, free mindset as a modern woman.",
    author: "Cynthia Christopher",
    category: "Finance",
    url: "/blog/financial-literacy",
  },
  {
    id: "power-of-mentorship-video",
    title: "Mentorship Masterclass: The Power of Guidance",
    type: "video",
    description: "A keynote session explaining how to find the right mentor, nurture professional relationships, and become an inspiring guide to others.",
    author: "Gift Odey",
    category: "Mentorship",
    url: "https://www.youtube.com/@therelevantwoman",
    duration: "42m",
  },
];

export default function Library() {
  const [selectedType, setSelectedType] = useState<"all" | "pdf" | "article" | "video">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    return resourcesData.filter((resource) => {
      const matchesType = selectedType === "all" || resource.type === selectedType;
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  return (
    <main className="min-h-screen bg-[#3a225c] text-white overflow-x-hidden">
      <Navigation />

      {/* Library Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#2c144c] via-[#3a225c] to-[#2d0e5c] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-10 text-6xl text-white/5">📚</div>
          <div className="absolute bottom-20 right-20 text-6xl text-white/5">🎥</div>
          <div className="absolute top-1/2 left-1/3 text-6xl text-white/5">📝</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-2">
              <LibraryIcon className="w-5 h-5 text-[#f9f871]" />
              <span className="text-white/90 text-sm font-semibold">Resource Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Knowledge Hub & <span className="text-[#f9f871]">Resource Library</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Browse our catalog of PDFs, leadership training materials, educational articles, and video resources created to help you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Filter & Grid Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          {/* Tabs */}
          <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10 self-start flex-wrap">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                selectedType === "all" ? "bg-[#f9f871] text-[#3a225c] shadow-lg" : "text-white/70 hover:text-white"
              }`}
            >
              All Resources
            </button>
            <button
              onClick={() => setSelectedType("pdf")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                selectedType === "pdf" ? "bg-[#f9f871] text-[#3a225c] shadow-lg" : "text-white/70 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              PDF Guides
            </button>
            <button
              onClick={() => setSelectedType("article")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                selectedType === "article" ? "bg-[#f9f871] text-[#3a225c] shadow-lg" : "text-white/70 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Articles
            </button>
            <button
              onClick={() => setSelectedType("video")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                selectedType === "video" ? "bg-[#f9f871] text-[#3a225c] shadow-lg" : "text-white/70 hover:text-white"
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              Videos
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#fc98ac] focus:border-transparent text-sm transition-all"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <AnimatePresence mode="wait">
          {filteredResources.length > 0 ? (
            <motion.div
              key={selectedType + searchQuery}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#fc98ac]/50 hover:scale-[1.02] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="space-y-4">
                    {/* Header: Category and Icon badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#fc98ac]/10 text-[#fc98ac] rounded-full text-xs font-semibold">
                        {resource.category}
                      </span>
                      {resource.type === "pdf" && <span className="text-xs text-red-300 flex items-center gap-1 font-semibold"><FileText className="w-3.5 h-3.5" /> PDF</span>}
                      {resource.type === "article" && <span className="text-xs text-blue-300 flex items-center gap-1 font-semibold"><BookOpen className="w-3.5 h-3.5" /> Article</span>}
                      {resource.type === "video" && <span className="text-xs text-green-300 flex items-center gap-1 font-semibold"><Play className="w-3.5 h-3.5 fill-current" /> Video</span>}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold line-clamp-2 hover:text-[#fc98ac] transition-colors">
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm line-clamp-3 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  {/* Footer details & CTAs */}
                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/50">By {resource.author}</p>
                      {resource.pages && <p className="text-xs text-white/40 mt-0.5">{resource.pages} Pages</p>}
                      {resource.duration && <p className="text-xs text-white/40 mt-0.5">{resource.duration} Length</p>}
                    </div>

                    {/* Action buttons */}
                    {resource.type === "pdf" && (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/academy/read?book=${encodeURIComponent(resource.url)}&title=${encodeURIComponent(resource.title)}`}
                          className="p-2 bg-white/10 hover:bg-[#fc98ac]/20 text-white rounded-lg transition-colors"
                          title="Read Online"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <a
                          href={resource.url}
                          download
                          className="p-2 bg-[#f9f871] text-[#3a225c] hover:bg-[#f9f871]/90 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    )}

                    {resource.type === "article" && (
                      <Link
                        href={resource.url}
                        className="px-4 py-2 bg-white/10 hover:bg-[#fc98ac]/20 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        Read Article
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}

                    {resource.type === "video" && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#fc98ac] hover:bg-[#fc98ac]/90 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
                      >
                        Watch Video
                        <Play className="w-3 h-3 fill-current" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
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
                We couldn&apos;t find any resources matching your search or filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}
