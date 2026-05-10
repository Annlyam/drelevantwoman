"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import EventCard, { Event } from "@/components/events/EventCard";
import eventData from "@/lib/data/eventData.json";
import { getIsFeatured } from "@/lib/utils";

export default function FeaturedEvents() {
  // Get top 3 featured events
  const featuredEvents = (eventData as Event[])
    .filter((event) => getIsFeatured(event) && event.status === "upcoming" && event.hidden !== true)
    .slice(0, 3);

  if (featuredEvents.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 md:py-24 bg-[#3a225c] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Featured <span className="text-[#f9f871]">Events</span>
            </h2>
            <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
          </div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Don&apos;t miss out on these upcoming opportunities to grow and connect
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {featuredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* View All Events CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-5 h-5" />
              View All Events
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
