"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Share2, Facebook, Twitter, Linkedin, Mail, Link2 } from "lucide-react";

interface BlogDetailHeroProps {
  title: string;
  excerpt: string;
  tags: string[];
  author: {
    name: string;
    image?: string;
  };
  date: string;
  readTime: string;
  heroImage: string;
}

export default function BlogDetailHero({
  title,
  excerpt,
  tags,
  author,
  date,
  readTime,
  heroImage,
}: BlogDetailHeroProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    // You could add a toast notification here
  };

  return (
    <section className="relative bg-[#3a225c] pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>

        {/* Excerpt */}
        <motion.p
          className="text-xl md:text-2xl text-white/85 mb-8 leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {excerpt}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20 hover:bg-white/15 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Author & Meta Info */}
        <motion.div
          className="flex items-center justify-between flex-wrap gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#914177] to-[#fc98ac] flex items-center justify-center text-white font-bold text-lg">
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              ) : (
                author.name.charAt(0)
              )}
            </div>
            <div>
              <p className="text-white font-semibold">{author.name}</p>
              <p className="text-white/70 text-sm">
                {date} • {readTime}
              </p>
            </div>
          </div>

          {/* Social Share Icons */}
          <div className="flex items-center gap-3">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors duration-300"
              aria-label="Share on Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors duration-300"
              aria-label="Share on Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors duration-300"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <button
              onClick={handleCopyLink}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors duration-300"
              aria-label="Copy link"
            >
              <Link2 size={18} />
            </button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
