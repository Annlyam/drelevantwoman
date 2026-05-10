"use client";

import { motion } from "framer-motion";

const marqueeItems = [
  "MENTORSHIP PROGRAMS",
  "LEADERSHIP DEVELOPMENT",
  "COMMUNITY BUILDING",
  "NETWORKING EVENTS",
  "SKILLS TRAINING",
  "SUCCESS STORIES",
  "CAREER GUIDANCE",
  "PERSONAL GROWTH",
];

export default function Marquee() {
  return (
    <section className="py-8 bg-[#f9f871] overflow-hidden">
      <div className="flex">
        {/* First set */}
        <motion.div
          className="flex space-x-8 flex-shrink-0"
          animate={{
            x: [0, -50 * 16],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div
              key={`first-${index}`}
              className="text-[#3a225c] font-bold text-lg md:text-xl whitespace-nowrap"
            >
              {item} •
            </div>
          ))}
        </motion.div>
        {/* Second set for seamless loop */}
        <motion.div
          className="flex space-x-8 flex-shrink-0"
          animate={{
            x: [0, -50 * 16],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div
              key={`second-${index}`}
              className="text-[#3a225c] font-bold text-lg md:text-xl whitespace-nowrap"
            >
              {item} •
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
