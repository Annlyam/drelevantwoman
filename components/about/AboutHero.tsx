"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutHeroProps {
  backgroundImage?: string;
  title: string;
  titleAccent?: string;
  accentColor?: string;
  overlayColor?: string;
}

export default function AboutHero({
  backgroundImage = "/assets/images/hero/relev.jpg",
  title,
  titleAccent,
  accentColor = "#fce698",
  overlayColor = "rgba(44,25,71,0.87)",
}: AboutHeroProps) {
  return (
    <section className="relative pt-10 md:pt-0 min-h-[24vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="About Us Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white">
          {title}{" "}
          {titleAccent && (
            <span style={{ color: accentColor }}>{titleAccent}</span>
          )}
        </h1>
      </motion.div>
    </section>
  );
}
