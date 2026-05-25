"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { statsConfig } from "@/lib/data/statsConfig";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.5,
    margin: "0px 0px -50px 0px"
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isInView && count < value) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = count;

      timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isInView, value, count]);

  return (
    <div ref={containerRef} className="inline-block">
      <span>
        {count.toLocaleString()}
        {suffix}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-10 md:py-20 bg-[#3a225c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-[#3a225c] rounded-2xl border-2 border-[#f9f871] p-3 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              {/* Headline */}
              <motion.h2
                className="text-3xl md:text-4xl lg:text-3xl font-bold text-white mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Comprehensive Network Empowering Young Women Forward
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-base md:text-lg text-white mb-8 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Join a thriving community of ambitious young women dedicated to discovering your unlimited potential. Through mentorship, leadership development, and professional growth opportunities, we empower you to shape tomorrow and make lasting impact.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link
                  href="/become-a-member"
                  className="inline-block px-8 py-4 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871] transition-all duration-300 uppercase tracking-wide"
                >
                  Get Started
                </Link>
              </motion.div>

              {/* Stats - Horizontal Layout */}
              <div className="flex items-start gap-4 md:gap-8">
                {statsConfig.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex-1 text-center relative"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    >
                      {/* Icon - Outlined style */}
                      <div className="flex justify-center mb-4">
                        <Icon
                          size={36}
                          className="text-[#f9f871]"
                          strokeWidth={1.5}
                          fill="none"
                        />
                      </div>
                      {/* Number */}
                      <div className="text-2xl md:text-5xl font-bold text-white mb-2">
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </div>
                      {/* Label */}
                      <div className="text-base md:text-lg text-white">
                        {stat.label}
                      </div>
                      {/* Vertical Divider */}
                      {index < statsConfig.length - 1 && (
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10 -mr-2 md:-mr-4" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Image Placeholder */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[#914177] to-[#fc98ac] rounded-lg flex items-center justify-center overflow-hidden relative">
                <Image
                  src="/assets/images/hero/young_women_relev_x.jpg"
                  alt="The Relevant Woman"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
