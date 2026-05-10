"use client";

import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import AcademyHero from "@/components/academy/AcademyHero";

export default function Academy() {
  return (
    <main className="min-h-screen bg-[#3a225c]">
      <Navigation />
      {/* TODO: Carousel/animation removed. Re-add `framer-motion` imports and
          carousel components when restoring the carousel. */}
      <AcademyHero />

      <Footer />
    </main>
  );
}
