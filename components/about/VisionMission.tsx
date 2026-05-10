"use client";

import { motion } from "framer-motion";

interface VisionMissionItem {
  title: string;
  titleAccent?: string;
  description: string;
  showAsterisk?: boolean;
}

interface VisionMissionProps {
  vision: VisionMissionItem;
  mission: VisionMissionItem;
  accentColor?: string;
}

export default function VisionMission({
  vision,
  mission,
  accentColor = "#f9f871",
}: VisionMissionProps) {
  return (
    <section className="py-10 md:py-20 bg-[#3a225c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Our Vision */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {vision.title}{" "}
                {vision.titleAccent && (
                  <span style={{ color: accentColor }}>
                    {vision.titleAccent}
                  </span>
                )}
              </h2>
              {/* Decorative Asterisk */}
              {vision.showAsterisk !== false && (
                <div
                  className="w-4 h-4 rotate-45 mb-6"
                  style={{ backgroundColor: accentColor }}
                />
              )}
            </div>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              {vision.description}
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {mission.title}{" "}
                {mission.titleAccent && (
                  <span style={{ color: accentColor }}>
                    {mission.titleAccent}
                  </span>
                )}
              </h2>
              {/* Decorative Asterisk */}
              {mission.showAsterisk !== false && (
                <div
                  className="w-4 h-4 rotate-45 mb-6"
                  style={{ backgroundColor: accentColor }}
                />
              )}
            </div>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              {mission.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
