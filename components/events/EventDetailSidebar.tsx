"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { Event } from "./EventCard";
import EventCard from "./EventCard";
import CountdownTimer from "./CountdownTimer";
import eventData from "@/lib/data/eventData.json";

interface EventDetailSidebarProps {
  event: Event;
}

export default function EventDetailSidebar({ event }: EventDetailSidebarProps) {
  const handleAddToCalendar = () => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = event.endTime
      ? new Date(`${event.date}T${event.endTime}`)
      : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue)}`;

    window.open(calendarUrl, "_blank");
  };

  // Check if event is virtual/online
  const isVirtualEvent = event.venue?.toLowerCase().includes("virtual") || 
                         event.venue?.toLowerCase().includes("online") ||
                         event.location?.toLowerCase().includes("virtual");

  // Get similar events (same category, excluding current event)
  const similarEvents = (eventData as Event[])
    .filter(
      (e) => e.id !== event.id && e.category === event.category && e.status === "upcoming"
    )
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#f9f871]/20 to-[#fc98ac]/20 backdrop-blur-sm rounded-xl p-6 border-2 border-[#f9f871]/40"
      >
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-[#f9f871]" />
          <h3 className="text-xl font-bold text-white">Event Starts In</h3>
        </div>
        <div className="flex items-center justify-center py-2">
          <CountdownTimer
            targetDate={event.date}
            targetTime={event.time}
            className="text-xl"
          />
        </div>
      </motion.div>

      {/* Add to Calendar */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCalendar}
        className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <Calendar className="w-5 h-5" />
        Add to Calendar
      </motion.button>

      {/* Attendee Protection - Only show for physical events */}
      {!isVirtualEvent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-[#f9f871]/10 backdrop-blur-sm rounded-xl p-6 border-2 border-[#f9f871]/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-[#f9f871]" />
            <h3 className="text-xl font-bold text-white">Attendee Protection</h3>
          </div>
          <p className="text-white/90 text-sm mb-4">
            All slot holders are automatically covered by our insurance policy
            during the event.
          </p>
          <ul className="space-y-2 mb-4 text-white/80 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#f9f871] mt-1">•</span>
              <span>₵1,000 coverage per slot holder</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#f9f871] mt-1">•</span>
              <span>Covers accidental death or total permanent disability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#f9f871] mt-1">•</span>
              <span>12-hour coverage during event day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#f9f871] mt-1">•</span>
              <span>Claims settled within 3 working days</span>
            </li>
          </ul>
          <div className="pt-4 border-t border-[#f9f871]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Protection Fee</span>
              <span className="text-[#f9f871] font-bold">₵1.00</span>
            </div>
            <p className="text-white/60 text-xs">
              Added automatically at checkout
            </p>
          </div>
          <a
            href="#"
            className="text-[#f9f871] text-sm font-semibold hover:underline mt-2 inline-block"
          >
            View full policy details →
          </a>
        </motion.div>
      )}

      {/* Similar Events */}
      {similarEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold text-white">Similar Events</h3>
          <div className="space-y-4">
            {similarEvents.map((similarEvent, index) => (
              <EventCard
                key={similarEvent.id}
                event={similarEvent}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
