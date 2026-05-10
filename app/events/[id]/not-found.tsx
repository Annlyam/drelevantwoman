import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import { CalendarX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#3a225c] flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          <CalendarX className="w-24 h-24 text-[#fc98ac] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Event Not Found
          </h1>
          <p className="text-lg text-white/70 mb-8">
            The event you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/events"
            className="px-6 py-3 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors inline-block"
          >
            Browse All Events
          </Link>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
