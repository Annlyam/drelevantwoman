"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import EventCard, { Event } from "@/components/events/EventCard";
import { Calendar, MapPin, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
// Import event data
import eventData from "@/lib/data/eventData.json";

const allEvents: Event[] = (eventData as Event[]).filter((event) => !event.hidden);

type FilterType = "all" | "popular" | "upcoming" | "recent";

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredEvents = useMemo(() => {
    switch (activeFilter) {
      case "popular":
        return allEvents.filter(
          (event) =>
            event.capacity &&
            event.registered &&
            event.registered / event.capacity > 0.5,
        );
      case "upcoming":
        return allEvents.filter((event) => event.status === "upcoming");
      case "recent":
        return allEvents
          .filter((event) => event.status === "upcoming")
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
          .slice(0, 6);
      default:
        return allEvents;
    }
  }, [activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Generate structured data for events listing
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://drelevantwoman.vercel.app";
  const eventsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: allEvents
      .filter((e) => e.status === "upcoming")
      .slice(0, 10)
      .map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: event.title,
          url: `${siteUrl}/events/${event.id}`,
          startDate: new Date(`${event.date}T${event.time}`).toISOString(),
        },
      })),
  };

  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventsStructuredData),
        }}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#f9f871]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#fc98ac]/10 rounded-full blur-3xl" />
        </div>

        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/assets/images/extras/empowerment_workshop.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3a225c]/90 via-[#3a225c]/80 to-[#3a225c]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6 md:px-40">
              <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white">
                Discover Events That{" "}
                <span className="text-[#f9f871]">Move You</span>
              </h1>
              <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
            </div>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Empowering experiences, meaningful connections, and transformative
              moments. Join us for events designed to inspire, educate, and
              connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#events"
                  className="px-8 py-3 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors duration-300 inline-block"
                >
                  Browse Events
                </Link>
              </motion.div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[
                {
                  icon: Calendar,
                  title: "10+ Years",
                  description: "Empowering women through events since 2013",
                },
                {
                  icon: Users,
                  title: "5,000+ Members",
                  description: "Active community of empowered women",
                },
                {
                  icon: TrendingUp,
                  title: "50+ Events",
                  description: "Successfully organized events annually",
                },
                {
                  icon: MapPin,
                  title: "Multiple Locations",
                  description: "Events across Ghana and online",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <feature.icon className="w-8 h-8 text-[#f9f871] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 md:py-24 relative bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Events Happening Now
                </h2>
                <p className="text-lg text-white/80 max-w-2xl">
                  Discover empowering events across various categories. From
                  workshops to networking mixers, there&apos;s something for
                  everyone.
                </p>
              </div>
              <Link
                href="#events"
                className="text-[#f9f871] font-semibold hover:text-[#f9f871]/80 transition-colors"
              >
                View all events →
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3">
              {[
                { id: "all", label: "All Events" },
                { id: "popular", label: "Popular" },
                { id: "upcoming", label: "Upcoming" },
                { id: "recent", label: "Recent" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as FilterType)}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                    activeFilter === filter.id
                      ? "bg-[#f9f871] text-[#3a225c]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </motion.div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">
                No events found for this filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our Community Says
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fc98ac] to-[#f68565] flex items-center justify-center text-white font-bold text-xl">
                  AA
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Amma Aboagye</h3>
                  <p className="text-white/60 text-sm">
                    Founding Curator of The Afropole
                  </p>
                </div>
              </div>
              <p className="text-white/90 text-lg italic">
                &quot;When I think events, I always think The Relevant Woman.
                The quality of their programs and the community they&apos;ve
                built is truly exceptional.&quot;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f9f871] to-[#ffbc5c] flex items-center justify-center text-[#3a225c] font-bold text-xl">
                  SK
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Sarah Kwarteng
                  </h3>
                  <p className="text-white/60 text-sm">Entrepreneur & Mentor</p>
                </div>
              </div>
              <p className="text-white/90 text-lg italic">
                &quot;The networking opportunities and learning experiences at
                TRW events have been transformative for my career. Highly
                recommend!&quot;
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 relative bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Powering Women&apos;s Growth
            </h2>
            <p className="text-lg text-white/80">
              Trusted by thousands of women across the continent
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: "10+", label: "Years of Experience" },
              { number: "5,000+", label: "Active Members" },
              { number: "50+", label: "Events Annually" },
              { number: "100+", label: "Success Stories" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#f9f871] mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#914177] to-[#fc98ac] rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Create Experiences People Will Never Forget
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Join our platform to host events, manage registrations, and grow
              your audience with tools built for creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact-us"
                  className="px-8 py-3 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors duration-300 inline-block"
                >
                  Host an Event
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact-us"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors duration-300 inline-block"
                >
                  Talk to Our Team
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
