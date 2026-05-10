"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "react-use-cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function FloatingCartButton() {
  const { totalItems } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Link href="/cart">
            <div className="relative">
              <button
                className="w-16 h-16 bg-[#fc98ac] hover:bg-[#fc98ac]/90 rounded-full shadow-2xl flex items-center justify-center transition-colors"
                type="button"
                aria-label="View cart"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
              </button>
              {totalItems > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-[#f9f871] text-[#3a225c] rounded-full flex items-center justify-center text-xs font-bold"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </motion.div>
              )}
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
