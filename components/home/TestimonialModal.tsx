"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TestimonialModal({
  testimonial,
  isOpen,
  onClose,
}: TestimonialModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!testimonial) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative bg-[#3a225c] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#fc98ac] hover:border-[#fc98ac] transition-all duration-300"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="p-6 md:p-8 overflow-y-auto max-h-[90vh]">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className="fill-[#ffbc5c] text-[#ffbc5c] shrink-0"
                    />
                  ))}
                </div>

                {/* Full Quote */}
                <p className="text-white/90 text-lg leading-relaxed mb-6 whitespace-pre-line">
                  &quot;{testimonial.quote}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-white/70 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
