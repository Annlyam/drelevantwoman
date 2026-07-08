"use client";

import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import StoreHero from "@/components/store/StoreHero";
import ProductGrid from "@/components/store/ProductGrid";
import FloatingCartButton from "@/components/shared/FloatingCartButton";

export default function Store() {
  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />
      <StoreHero />
      <ProductGrid />
      <FloatingCartButton />
      <Footer />
    </main>
  );
}
