"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Event } from "./EventCard";

interface OrderSummaryProps {
  event: Event;
  quantity: number;
  ticketPrice: number;
  serviceFee: number;
  insuranceFee: number;
  total: number;
  currentStep: 1 | 2;
}

export default function OrderSummary({
  event,
  quantity,
  ticketPrice,
  serviceFee,
  insuranceFee,
  total,
  currentStep,
}: OrderSummaryProps) {
  const priceDisplay =
    ticketPrice === 0
      ? "FREE"
      : `${event.currency}${ticketPrice.toLocaleString()}.00`;

  const totalDisplay =
    total === 0 ? "FREE" : `${event.currency}${total.toLocaleString()}.00`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-white" />
        <h2 className="text-2xl font-bold text-white">Order Summary</h2>
      </div>

      {/* Event Title */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white leading-tight">
          {event.title}
        </h3>
      </div>

      {/* Slots Section */}
      {currentStep === 1 ? (
        <div className="mb-6">
          <p className="text-white/60 text-sm">
            Please, choose a slot type to continue
          </p>
        </div>
      ) : (
        <div className="mb-6">
          <div className="text-sm font-semibold text-white/80 mb-2">
            Slots
          </div>
          <div className="flex items-center justify-between text-sm text-white/70 mb-1">
            <span>
              {quantity}x {event.category}
            </span>
            <span>{priceDisplay}</span>
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      {currentStep === 2 && (
        <div className="space-y-2 mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Subtotal</span>
            <span>
              {ticketPrice === 0
                ? "FREE"
                : `${event.currency}${(ticketPrice * quantity).toLocaleString()}.00`}
            </span>
          </div>
          {serviceFee > 0 && (
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>Service Fees</span>
              <span>
                {event.currency}
                {serviceFee.toLocaleString()}.00
              </span>
            </div>
          )}
          {insuranceFee > 0 && (
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>Insurance Fees</span>
              <span>
                {event.currency}
                {insuranceFee.toLocaleString()}.00
              </span>
            </div>
          )}
        </div>
      )}

      {/* Total */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-lg font-bold text-white">Total</span>
        <span className="text-2xl font-bold text-[#f9f871]">
          {currentStep === 1 ? (
            <span className="text-white/60 text-lg">
              {event.currency} 0.00
            </span>
          ) : (
            totalDisplay
          )}
        </span>
      </div>

      {currentStep === 1 && (
        <p className="mt-4 text-xs text-white/50 text-center">
          Select slots to continue
        </p>
      )}

      {currentStep === 2 && (
        <p className="mt-4 text-xs text-white/50 text-center">
          Continue to enter your details
        </p>
      )}
    </motion.div>
  );
}
