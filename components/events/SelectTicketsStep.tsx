"use client";

import { motion } from "framer-motion";
import { Ticket, ChevronDown, ChevronUp } from "lucide-react";
import { Event } from "./EventCard";
import { useState } from "react";

interface SelectTicketsStepProps {
  event: Event;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onNext: () => void;
}

export default function SelectTicketsStep({
  event,
  quantity,
  onQuantityChange,
  onNext,
}: SelectTicketsStepProps) {
  const [showQuantityDropdown, setShowQuantityDropdown] = useState(false);

  const priceDisplay =
    event.price === 0
      ? "FREE"
      : `${event.currency}${event.price.toLocaleString()}.00`;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      onQuantityChange(newQuantity);
      setShowQuantityDropdown(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-[#f9f871] flex items-center justify-center">
          <Ticket className="w-6 h-6 text-[#3a225c]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Choose Slot
        </h2>
      </div>

      {/* Slot Card */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              {event.category}
            </h3>
            <p className="text-white/70 text-sm mb-2">Admits one person</p>
            <p className="text-white/60 text-xs">
              {event.price === 0
                ? "Free registration"
                : "Insurance cover included"}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white mb-2">
              {priceDisplay}
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-white/70 text-sm">Quantity</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowQuantityDropdown(!showQuantityDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors"
            >
              <span>{quantity}</span>
              {showQuantityDropdown ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showQuantityDropdown && (
              <div className="absolute right-0 mt-2 w-20 bg-[#3a225c] border border-white/20 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleQuantityChange(num)}
                    className={`w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors ${
                      quantity === num ? "bg-[#f9f871]/20" : ""
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full px-6 py-4 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors"
      >
        Continue to Contact Info →
      </motion.button>
    </motion.div>
  );
}
