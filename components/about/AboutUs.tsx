"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Settings } from "lucide-react";

interface StatisticBox {
  number: string;
  suffix?: string;
  label: string;
}

interface CoreValue {
  name: string;
}

interface AboutUsProps {
  sectionLabel?: string;
  title: string;
  titleAccent?: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  statisticBox: StatisticBox;
  coreValues: CoreValue[];
  showAsterisk?: boolean;
}

export default function AboutUs({
  sectionLabel = "About Us",
  title,
  titleAccent,
  description,
  image,
  statisticBox,
  coreValues,
  showAsterisk = false,
}: AboutUsProps) {
  return (
    <section className="py-10 md:py-20 bg-[#3a225c]">
      <div className=" w-auto md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Image with Callout */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Statistic Callout Box - Overlapping bottom-left */}
              <motion.div
                className="absolute -bottom-6 right-3 md:-right-[50px] bg-[#f9f871] rounded-xl p-6 md:p-8 shadow-2xl z-10 max-w-[280px]"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="text-[#3a225c]">
                  <div className="text-5xl flex items-center justify-center md:text-6xl lg:text-7xl font-bold mb-2 leading-none">
                    {statisticBox.number}{" "}
                    {statisticBox.suffix && (
                      <span className="text-2xl md:text-3xl">
                        {statisticBox.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-xs md:text-sm font-semibold uppercase tracking-wider mt-2">
                    {statisticBox.label}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - About Us Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Label */}
            <div className="flex items-center gap-2 mb-6">
              <Settings size={18} className="text-[#f9f871]" />
              <span className="text-[#f9f871] text-xs font-semibold uppercase tracking-wider">
                {sectionLabel}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight mb-4 md:pr-[80px]">
              {title}{" "}
              {titleAccent && (
                <span className="text-[#f9f871]">{titleAccent}</span>
              )}
            </h2>

            {/* Decorative Asterisk */}
            {showAsterisk && (
              <div className="w-4 h-4 bg-[#f9f871] rotate-45 mb-6" />
            )}

            {/* Descriptive Paragraph */}
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
              {description}
            </p>

            {/* Core Values List - Two Column */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Our Core <span className="text-[#f9f871]">Values</span>
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coreValues.map((value, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <CheckCircle
                      size={20}
                      className="text-[#f9f871] flex-shrink-0"
                      strokeWidth={2.5}
                      fill="currentColor"
                    />
                    <span className="text-white text-base md:text-lg">
                      {value.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
