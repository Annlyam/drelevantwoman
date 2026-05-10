"use client";

import { motion } from "framer-motion";
import { Search, Settings, Workflow, BadgeCheck, Rocket } from "lucide-react";
import Link from "next/link";

const journeySteps = [
  {
    icon: Search,
    secondaryIcon: Settings,
    title: "Research and Analysis",
    number: "01",
  },
  {
    icon: Workflow,
    title: "Design Execution",
    number: "02",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    number: "03",
  },
  {
    icon: Rocket,
    title: "Delivery Completion",
    number: "04",
  },
];

export default function Journey() {
  return (
    <section className="py-10 md:py-20 bg-[#3a225c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Unveiling Our Crafting{" "}
              <span className="text-[#f9f871]">Work Process</span>
            </h2>
            <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
          </div>
        </motion.div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            const SecondaryIcon = step.secondaryIcon;
            // Map steps to relevant pages
            const stepLinks = ["/about", "/academy", "/store", "/contact-us"];
            return (
              <Link
                key={index}
                href={stepLinks[index] || "/about"}
                className="block"
              >
                <motion.div
                  className="relative bg-transparent rounded-3xl p-8 border border-white/10 transition-all duration-300 group min-h-[320px] flex flex-col cursor-pointer"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)",
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{
                    y: -8,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    boxShadow:
                      "inset 0 1px 0 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.3)",
                  }}
                >
                {/* Number in top-right - large outlined style */}
                <div className="absolute top-6 right-6 z-0">
                  <span
                    className="text-7xl md:text-8xl font-extrabold"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.25)",
                      WebkitTextStrokeWidth: "1.5px",
                      lineHeight: 1,
                      fontFamily: "inherit",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Icon - centered */}
                <div className="flex-1 flex items-center justify-center mb-8 relative z-10">
                  <div className="relative">
                    {SecondaryIcon ? (
                      <div className="relative flex items-center justify-center">
                        <Icon
                          size={56}
                          className="text-white"
                          strokeWidth={1.5}
                          fill="none"
                        />
                        <SecondaryIcon
                          size={28}
                          className="text-white absolute -bottom-2 -right-2"
                          strokeWidth={1.5}
                          fill="none"
                        />
                      </div>
                    ) : (
                      <Icon
                        size={56}
                        className="text-white"
                        strokeWidth={1.5}
                        fill="none"
                      />
                    )}
                  </div>
                </div>

                {/* Title at bottom-left */}
                <h3 className="text-xl font-bold text-white relative z-10">
                  {step.title}
                </h3>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
