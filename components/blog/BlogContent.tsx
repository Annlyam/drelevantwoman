"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BlogContentProps {
  content: string[];
  bulletPoints?: string[];
  inlineImage?: {
    src: string;
    alt: string;
    credit?: string;
    creditLink?: string;
  };
  blockQuote?: {
    text: string;
  };
  highlightedSection?: {
    text: string;
  };
}

export default function BlogContent({
  content,
  bulletPoints,
  inlineImage,
  blockQuote,
  highlightedSection,
}: BlogContentProps) {
  return (
    <article className="prose prose-invert max-w-none">
      <div className="space-y-6 text-white/90 leading-relaxed">
        {content.map((paragraph, index) => (
          <motion.p
            key={index}
            className="text-lg leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            {paragraph}
          </motion.p>
        ))}

        {/* Bullet Points List */}
        {bulletPoints && bulletPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ul className="space-y-4 my-8 pl-6 list-none">
              {bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="text-lg leading-relaxed font-light text-white/90 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-[#f9f871]"
                >
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Block Quote */}
        {blockQuote && (
          <motion.blockquote
            className="relative my-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl md:text-8xl text-[#f9f871]/20 font-serif mb-4">
              &quot;
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white italic leading-relaxed px-8">
              {blockQuote.text}
            </p>
          </motion.blockquote>
        )}

        {/* Inline Image */}
        {inlineImage && (
          <motion.figure
            className="my-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={inlineImage.src}
                alt={inlineImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
            {inlineImage.credit && (
              <figcaption className="mt-4 text-white/60 text-sm text-center">
                Photo by{" "}
                {inlineImage.creditLink ? (
                  <a
                    href={inlineImage.creditLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f9f871] transition-colors duration-300"
                  >
                    {inlineImage.credit}
                  </a>
                ) : (
                  inlineImage.credit
                )}
              </figcaption>
            )}
          </motion.figure>
        )}

        {/* Highlighted Section */}
        {highlightedSection && (
          <motion.div
            className="relative pl-6 my-12 border-l-4 border-[#f9f871] bg-white/5 rounded-r-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-white/90 leading-relaxed font-light">
              {highlightedSection.text}
            </p>
          </motion.div>
        )}
      </div>
    </article>
  );
}
