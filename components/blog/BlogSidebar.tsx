"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";

interface Author {
  name: string;
  bio: string;
  image?: string;
}

interface EditorPick {
  id: number;
  slug: string;
  title: string;
  image: string;
}

interface BlogSidebarProps {
  author: Author;
  editorPicks: EditorPick[];
}

export default function BlogSidebar({ author, editorPicks }: BlogSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Written By Section */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-white font-bold text-lg mb-4">Written By</h3>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#914177] to-[#fc98ac] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {author.image ? (
              <Image
                src={author.image}
                alt={author.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            ) : (
              author.name.charAt(0)
            )}
          </div>
          <div>
            <p className="text-white font-semibold mb-2">{author.name}</p>
            <p className="text-white/75 text-sm leading-relaxed">
              {author.bio}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Editor's Pick Section */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h3 className="text-white font-bold text-lg mb-6">Editor&apos;s Pick</h3>
        <div className="space-y-4">
          {editorPicks.map((pick, index) => (
            <Link
              key={pick.id}
              href={`/blog/${pick.slug}`}
              className="block group"
            >
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={pick.image}
                    alt={pick.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-[#f9f871] transition-colors duration-300 leading-tight">
                    {pick.title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <NewsletterSignup />
      </motion.div>
    </aside>
  );
}
