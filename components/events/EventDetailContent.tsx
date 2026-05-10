"use client";

import { motion } from "framer-motion";
import { Event } from "./EventCard";

interface EventDetailContentProps {
  event: Event;
}

export default function EventDetailContent({ event }: EventDetailContentProps) {
  return (
    <div className="space-y-8">
      {/* About This Event */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          About This Event
        </h2>
        <div className="prose prose-invert max-w-none">
          <div
            className="text-white/90 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </div>
      </motion.section>

      {/* Organized by */}
      {event.organizer && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Organized by
          </h2>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fc98ac] to-[#f68565] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {event.organizer.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {event.organizer.name}
              </h3>
              {event.organizer.contact && (
                <div className="flex items-center gap-4 mt-4">
                  <a
                    href={`mailto:${event.organizer.contact}`}
                    className="px-4 py-2 bg-[#f9f871] text-[#3a225c] font-semibold rounded-lg hover:bg-[#f9f871]/90 transition-colors inline-flex items-center gap-2"
                  >
                    Contact organizer
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
