"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import AcademyHero from "@/components/academy/AcademyHero";

export default function Academy() {
  return (
    <main className="min-h-screen bg-[#3a225c]">
      <Navigation />
      <AcademyHero />

      <Footer />
    </main>
  );
}
