"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  endTime?: string;
  venue: string;
  location: string;
  price: number;
  currency: string;
  image: string;
  featured?: boolean;
  isFeatured?: boolean;
  status: "upcoming" | "past" | "cancelled";
  organizer?: {
    name: string;
    contact: string;
  };
  tags?: string[];
  capacity?: number;
  registered?: number;
  website?: string;
  registrationEndDate?: string;
  features?: string[];
  benefits?: string[];
}

interface EventCardProps {
  event: Event;
  index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      full: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    };
  };

  const dateInfo = formatDate(event.date);
  const priceDisplay =
    event.price === 0
      ? "FREE"
      : `${event.currency}${event.price}${event.price > 0 ? "" : ""}`;

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/events/${event.id}`}>
        <div className="bg-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-[#fc98ac]/50 h-full flex flex-col">
          {/* Event Image */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#3a225c] to-[#914177]">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3a225c]/90 via-[#3a225c]/40 to-transparent" />

            {/* Date Badge */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-[#3a225c]">
                  {dateInfo.day}
                </div>
                <div className="text-xs font-semibold text-[#914177] uppercase">
                  {dateInfo.month}
                </div>
              </div>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-3 right-3 bg-[#f9f871] text-[#3a225c] px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
              {priceDisplay}
            </div>

            {/* Featured Badge */}
            {event.featured && (
              <div className="absolute top-3 left-3 bg-[#fc98ac] text-white px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-3 bg-[#3a225c] flex-1 flex flex-col">
            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#f9f871]/15 backdrop-blur-sm rounded-full text-[#f9f871] text-xs font-semibold border border-[#f9f871]/25">
                {event.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-[#f9f871] transition-colors duration-300 leading-tight">
              {event.title}
            </h3>

            {/* Venue & Time */}
            <div className="space-y-2 text-sm text-white/75">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#fc98ac] flex-shrink-0" />
                <span className="line-clamp-1">{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#fc98ac] flex-shrink-0" />
                <span>
                  {event.time}
                  {event.endTime && ` - ${event.endTime}`}
                </span>
              </div>
            </div>

            {/* Countdown Timer - Prominent Display */}
            <div className="bg-gradient-to-r from-[#f9f871]/20 to-[#fc98ac]/20 backdrop-blur-sm rounded-lg p-3 border-2 border-[#f9f871]/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                  Event Starts In
                </span>
              </div>
              <div className="flex items-center justify-center">
                <CountdownTimer
                  targetDate={event.date}
                  targetTime={event.time}
                  className="text-xl"
                />
              </div>
            </div>

            {/* Capacity Info */}
            {event.capacity && event.registered !== undefined && (
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>
                    {event.registered} / {event.capacity} registered
                  </span>
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#f9f871] rounded-full transition-all duration-300"
                      style={{
                        width: `${(event.registered / event.capacity) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
