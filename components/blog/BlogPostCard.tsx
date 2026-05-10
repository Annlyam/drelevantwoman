"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { generateSlug } from "@/lib/utils";

interface BlogPostCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    tags: string[];
    image: string;
    featured?: boolean;
    slug?: string;
  };
  variant?: "large" | "medium" | "small" | "editor";
  index?: number;
}

export default function BlogPostCard({
  post,
  variant = "medium",
  index = 0,
}: BlogPostCardProps) {
  if (variant === "large") {
    return (
      <motion.article
        className="space-y-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden group shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3a225c]/95 via-[#3a225c]/50 to-transparent -bottom-3" />
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-[#f9f871]/15 backdrop-blur-sm rounded-full text-[#f9f871] text-xs font-semibold border border-[#f9f871]/25 hover:bg-[#f9f871]/25 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
          {post.title}
        </h2>
        <p className="text-white/85 text-lg leading-relaxed font-light">
          {post.excerpt}
        </p>
        <div className="text-white/75 text-sm font-medium">
          by <span className="text-white/90">{post.author}</span> | {post.date}{" "}
          • {post.readTime}
        </div>
      </motion.article>
    );
  }

  if (variant === "editor") {
    return (
      <motion.article
        className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group cursor-pointer border border-[#f9f871]/30 hover:border-[#f9f871] shadow-xl hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -8, scale: 1.02 }}
      >
        <Link href={`/blog/${post.slug || generateSlug(post.title)}`}>
          <div className="relative aspect-video">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3a225c]/90 via-[#3a225c]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -bottom-3" />
            {/* Editor's Choice Badge */}
            <div className="absolute top-4 right-4 bg-[#f9f871] text-[#3a225c] px-3 py-1 rounded-full text-xs font-bold">
              Editor&apos;s Pick
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-[#f9f871]/20 backdrop-blur-sm rounded-full text-[#f9f871] text-xs font-semibold border border-[#f9f871]/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-[#f9f871] transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-white/75 text-sm font-medium">
              by {post.author}
            </p>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{
        y: -8,
        borderColor: "#f9f871",
        boxShadow:
          "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(249, 248, 113, 0.2)",
      }}
    >
      <Link href={`/blog/${post.id}`}>
        <div className="relative aspect-video">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3a225c]/90 via-[#3a225c]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -bottom-3" />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-[#f9f871]/15 backdrop-blur-sm rounded-full text-[#f9f871] text-xs font-semibold border border-[#f9f871]/25 hover:bg-[#f9f871]/25 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#f9f871] transition-colors duration-300 leading-tight">
            {post.title}
          </h3>
          <p className="text-white/75 text-sm mb-4 line-clamp-2 leading-relaxed font-light">
            {post.excerpt}
          </p>
          <p className="text-white/70 text-xs font-medium">by {post.author}</p>
        </div>
      </Link>
    </motion.article>
  );
}
