"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/**
 * Hero V2 – Split layout hero with content from Hero.tsx (The Relevant Woman).
 * Right: bento grid using images from /public/assets/images/hero/.
 */
const BENTO_ITEMS = [
  {
    id: "hero-1",
    src: "/assets/images/hero/relevant-woman-hero-2.jpg",
    alt: "Empowering the next generation",
    placeholder: "bg-gradient-to-br from-[#3a225c] via-[#914177] to-[#fc98ac]",
    gridClass: "col-span-2 row-span-2",
  },
  {
    id: "hero-2",
    src: "/assets/images/hero/relevant-woman-hero-1.jpg",
    alt: "Mentorship that transforms",
    placeholder: "bg-gradient-to-b from-[#914177] to-[#fc98ac]",
    gridClass: "col-span-1 row-span-2",
  },
  {
    id: "hero-3",
    src: "/assets/images/hero/empowerment_workshop.jpg",
    alt: "Empowerment workshop",
    placeholder: "bg-gradient-to-br from-[#fc98ac] to-[#f68565]",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: "hero-4",
    src: "/assets/images/hero/empower-1.jpg",
    alt: "Young women community",
    placeholder: "bg-gradient-to-br from-[#f68565] to-[#ffbc5c]",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: "hero-5",
    src: "/assets/images/hero/empower-2.jpg",
    alt: "The Relevant Woman community",
    placeholder: "bg-gradient-to-br from-[#ffbc5c] to-[#f9f871]",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: "hero-6",
    src: "/assets/images/hero/relev.jpg",
    alt: "Leadership and community",
    placeholder: "bg-gradient-to-br from-[#3a225c] via-[#914177] to-[#3a225c]",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: "hero-7",
    src: "/assets/images/hero/empower-4.jpg",
    alt: "The Relevant Woman",
    placeholder: "bg-gradient-to-r from-[#914177] via-[#fc98ac] to-[#f68565]",
    gridClass: "col-span-2 row-span-1",
  },
] as const;

function BentoCell({
  src,
  alt,
  placeholder,
  gridClass,
}: (typeof BENTO_ITEMS)[number]) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-lg ${gridClass} min-h-0`}
    >
      <div className={`absolute inset-0 ${placeholder}`} aria-hidden />
      {!imgFailed && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={() => setImgFailed(true)}
        />
      )}
    </div>
  );
}

function BentoGrid() {
  return (
    <div className="h-full w-full -mr-9 max-w-[700px] mx-auto shrink-0 px-2 sm:px-4">
      <div className="grid grid-cols-3 grid-rows-4 gap-2.5 sm:gap-3 h-full w-full min-h-[320px]">
        {BENTO_ITEMS.map((item) => (
          <BentoCell key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function Herov2() {
  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background overflow-hidden">
      {/* Decorative elements (like Hero.tsx) */}
      <motion.div
        className="absolute left-6 md:left-12 top-1/4 z-10 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="w-4 h-4 border-2 border-bright-highlight rotate-45" />
      </motion.div>
      <motion.div
        className="absolute right-6 md:right-12 top-20 z-10 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary-background via-background to-secondary-background shadow-xl ring-1 ring-white/10" />
        </div>
      </motion.div>

      {/* Left: Content */}
      <div className="relative flex flex-col justify-center px-6 sm:px-8 md:pl-12 lg:pl-16 xl:pl-20 py-16 lg:py-24 order-2 lg:order-1 z-10 min-w-0">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
            Empowering the Next Generation of{" "}
            <span className="text-bright-highlight">Influential Women</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-gray leading-relaxed mb-10 max-w-lg">
            Comprehensive network empowering young women through mentorship,
            leadership development, and community building.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/become-a-member"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bright-highlight text-background font-semibold rounded-xl hover:bg-warm-accent transition-colors shadow-lg"
              >
                Join the Community
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/academy"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/40 hover:border-primary-accent hover:bg-white/5 transition-colors"
              >
                Explore Programs
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right: Bento showcase – full height, top/bottom fade, no border */}
      <div className="hidden  lg:block relative order-1 lg:order-2 z-10 min-w-0 w-full h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="flex flex-col w-full"
            style={{ height: "200vh" }}
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="h-screen w-full flex justify-center items-center">
              <BentoGrid />
            </div>
            <div className="h-screen w-full mt-3 flex justify-center items-center">
              <BentoGrid />
            </div>
          </motion.div>
        </div>
        {/* Top fade / shadow */}
        <div
          className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10"
          aria-hidden
        />
        {/* Bottom fade / shadow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10"
          aria-hidden
        />
      </div>

      {/* Scroll indicator (from Hero.tsx) */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={32} className="text-bright-highlight" />
        </motion.div>
      </motion.div>
    </section>
  );
}
