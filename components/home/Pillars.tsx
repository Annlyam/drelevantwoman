"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Network } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Users,
    title: "Mentorship Programs",
    description:
      "Connect with successful women leaders who provide guidance, support, and insights to help you navigate your career and personal growth journey.",
    color: "#f9f871",
    href: "/academy",
  },
  {
    icon: TrendingUp,
    title: "Leadership Development",
    description:
      "Build confidence and essential skills through comprehensive training programs designed to develop your leadership potential and professional capabilities.",
    color: "#fc98ac",
    href: "/academy",
  },
  {
    icon: Network,
    title: "Community Building",
    description:
      "Join a network of like-minded young women who support, inspire, and collaborate with each other to create meaningful impact in their communities.",
    color: "#f9f871",
    href: "/about",
  },
];

export default function Pillars() {
  return (
    <section className="py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary w-full">
              Boost Your Growth with{" "}
              <span className="text-[#f9f871]">Powerful Pillars</span>
            </h2>
            <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
          </div>
        </motion.div>

        {/* Pillars Cards */}
        <div className="space-y-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={index}
                href={pillar.href}
                className="block"
              >
                <motion.div
                  className=" backdrop-blur-sm rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-2 border-[#914177]/30 transition-all duration-300 group shadow-xl cursor-pointer"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{
                    y: -4,
                    borderColor: "#f9f871",
                    boxShadow: "0 20px 40px rgba(249, 248, 113, 0.2)",
                  }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${pillar.color}20` }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon size={32} style={{ color: pillar.color }} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#3a225c] mb-3 group-hover:text-[#fc98ac] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed max-w-3xl">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <motion.div className="flex-shrink-0" whileHover={{ x: 5 }}>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: pillar.color }}
                    >
                      <ArrowRight size={20} className="text-[#3a225c]" />
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
