"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, Share2, Facebook, Twitter, Linkedin, Mail, Link2, Info, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Event } from "./EventCard";

interface EventDetailHeroProps {
  event: Event;
}

export default function EventDetailHero({ event }: EventDetailHeroProps) {
  const [copied, setCopied] = useState(false);
  const [isVirtualInfoModalOpen, setIsVirtualInfoModalOpen] = useState(false);
  
  const isVirtualEvent = event.venue?.toLowerCase().includes("virtual") || 
                         event.venue?.toLowerCase().includes("online") ||
                         event.location?.toLowerCase().includes("virtual");

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVirtualInfoModalOpen) {
        setIsVirtualInfoModalOpen(false);
      }
    };

    if (isVirtualInfoModalOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVirtualInfoModalOpen]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
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
      : `${event.currency}${event.price.toLocaleString()}.00`;

  const handleShare = async (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = event.title;
    const text = event.description;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "mail":
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
      case "copy":
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
        break;
    }
  };

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-[#3a225c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-4 py-1.5 bg-[#fc98ac]/20 backdrop-blur-sm rounded-full text-[#fc98ac] text-sm font-semibold border border-[#fc98ac]/30">
            {event.category}
          </span>
          <span className="px-4 py-1.5 bg-[#f9f871]/20 backdrop-blur-sm rounded-full text-[#f9f871] text-sm font-semibold border border-[#f9f871]/30 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f9f871] rounded-full" />
            Attendee Protected
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {event.title}
              </h1>

              {event.organizer && (
                <p className="text-white/70 text-lg mb-6">
                  by {event.organizer.name}
                </p>
              )}

              {/* Event Metadata */}
              <div className="flex flex-wrap gap-6 mb-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#f9f871]" />
                  <span>
                    {dateInfo.full}, {event.time}
                    {event.endTime && ` - ${event.endTime}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#f9f871]" />
                  <span>{event.venue}</span>
                  {isVirtualEvent && (
                    <button
                      onClick={() => setIsVirtualInfoModalOpen(true)}
                      className="ml-1 p-1 rounded-full hover:bg-white/10 transition-colors group"
                      aria-label="Virtual event information"
                    >
                      <Info className="w-4 h-4 text-[#f9f871] group-hover:text-[#fc98ac] transition-colors" />
                    </button>
                  )}
                </div>
              </div>

              {/* CTA and Share */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <Link href={`/events/${event.id}/secure-a-slot`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors duration-300"
                  >
                    Secure a Slot / Register →
                  </motion.button>
                </Link>

                <div className="flex items-center gap-3">
                  <span className="text-white/70 text-sm">Share:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare("facebook")}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleShare("mail")}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Share via Email"
                    >
                      <Mail className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Copy link"
                    >
                      {copied ? (
                        <span className="text-xs text-[#f9f871]">Copied!</span>
                      ) : (
                        <Link2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Event Card Preview */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3a225c]/90 via-[#3a225c]/40 to-transparent" />
              </div>
              <div className="p-4 bg-[#3a225c]">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <div className="text-2xl font-bold text-[#f9f871]">
                  {priceDisplay}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Virtual Event Info Modal */}
      <AnimatePresence>
        {isVirtualInfoModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVirtualInfoModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVirtualInfoModalOpen(false)}
            >
              <motion.div
                className="relative bg-[#3a225c] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsVirtualInfoModalOpen(false)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#fc98ac] hover:border-[#fc98ac] transition-all duration-300"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Modal Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#f9f871]/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#f9f871]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Virtual Event Information
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-white/90 text-lg leading-relaxed">
                      This is a <strong className="text-[#f9f871]">virtual event</strong> that will be held online.
                    </p>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-white/80 leading-relaxed">
                        <strong className="text-white">After registration,</strong> you will automatically receive an email containing the meeting link and access details.
                      </p>
                    </div>
                    <p className="text-white/70 text-sm">
                      Please check your email inbox (and spam folder) for the meeting link after completing your registration.
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <button
                      onClick={() => setIsVirtualInfoModalOpen(false)}
                      className="w-full px-6 py-3 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors"
                    >
                      Got it!
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
