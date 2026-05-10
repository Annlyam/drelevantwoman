"use client";

import { motion } from "framer-motion";

const partners = [
  "Partner 1",
  "Partner 2",
  "Partner 3",
  "Partner 4",
  "Partner 5",
  "Partner 6",
];

export default function Partners() {
  return (
    <section className="py-10 md:py-20 bg-[#3a225c]">
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Esteemed Partners in Building a Better{" "}
              <span className="text-[#f9f871]">Future</span>
            </h2>
            <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
          </div>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center p-6 bg-transparent rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 grayscale hover:grayscale-0"
              style={{
                boxShadow:
                  "inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                scale: 1.1,
                y: -5,
                borderColor: "rgba(255, 255, 255, 0.2)",
                boxShadow:
                  "inset 0 1px 0 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="text-white/70 hover:text-white text-center font-semibold">
                {partner}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
