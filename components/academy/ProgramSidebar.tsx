"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { useCart } from "react-use-cart";
import Link from "next/link";

interface ProgramSidebarProps {
  programId: string;
  programTitle: string;
  programImage: string;
  programSlug: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: string;
  rating: number;
  reviews: number;
}

export default function ProgramSidebar({
  programId,
  programTitle,
  programImage,
  programSlug,
  price,
  originalPrice,
  duration,
  level,
  rating,
  reviews,
}: ProgramSidebarProps) {
  const { addItem, inCart } = useCart();
  const isInCart = inCart(programId);

  const handleAddToCart = () => {
    addItem(
      {
        id: programId,
        name: programTitle,
        price: price,
        image: programImage,
        slug: programSlug,
      },
      1
    );
  };

  return (
    <div className="space-y-6">
      {/* Price Card */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-4xl font-bold text-[#f9f871]">${price}</span>
            {originalPrice && (
              <span className="text-xl text-white/50 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          {originalPrice && (
            <p className="text-sm text-[#fc98ac]">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        {isInCart ? (
          <Link
            href="/checkout"
            className="w-full px-6 py-4 bg-[#f9f871] text-[#3a225c] rounded-lg font-semibold hover:bg-[#f9f871]/90 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Go to Checkout
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full px-6 py-4 bg-[#fc98ac] text-white rounded-lg font-semibold hover:bg-[#fc98ac]/80 transition-colors flex items-center justify-center gap-2"
            type="button"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-white/80"
            type="button"
            aria-label="Add to favorites"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm">Save</span>
          </button>
          <button
            className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-white/80"
            type="button"
            aria-label="Share program"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Program Details */}
        <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Duration</span>
            <span className="text-white">{duration}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Level</span>
            <span className="text-white">{level}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Rating</span>
            <span className="text-white">
              {rating} ({reviews} reviews)
            </span>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-sm text-white/70 text-center">
            <span className="text-[#f9f871] font-semibold">30-day</span>{" "}
            money-back guarantee
          </p>
        </div>
      </motion.div>
    </div>
  );
}
