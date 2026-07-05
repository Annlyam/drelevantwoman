"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "react-use-cart";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, cartTotal, totalItems, removeItem, updateItemQuantity } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[70] cursor-default bg-black/60 backdrop-blur-sm"
            aria-label="Close cart"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-[#2c144c] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
              <div>
                <h2 className="text-xl font-bold text-white">Your Cart</h2>
                <p className="text-sm text-white/60">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingCart className="mb-5 h-16 w-16 text-white/30" />
                <h3 className="text-2xl font-bold text-white">
                  Your cart is empty
                </h3>
                <p className="mt-2 text-white/60">
                  Add products from the store to review them here.
                </p>
                <Link
                  href="/store"
                  onClick={onClose}
                  className="mt-8 rounded-lg bg-[#f9f871] px-5 py-3 font-bold text-[#3a225c] transition-colors hover:bg-[#f9f871]/90"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex gap-3">
                        {item.image && (
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white/10">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 font-semibold text-white">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm font-bold text-[#f9f871]">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="h-9 w-9 rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-red-300"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="mx-auto h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="inline-flex items-center overflow-hidden rounded-lg border border-white/15">
                          <button
                            type="button"
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                Math.max((item.quantity || 1) - 1, 1)
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center text-white/80 transition-colors hover:bg-white/10"
                            aria-label={`Decrease quantity for ${item.name}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="flex h-9 min-w-10 items-center justify-center border-x border-white/15 px-3 text-sm font-bold text-white">
                            {item.quantity || 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                (item.quantity || 1) + 1
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center text-white/80 transition-colors hover:bg-white/10"
                            aria-label={`Increase quantity for ${item.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-white">
                          ${(item.itemTotal || item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-white/70">Subtotal</span>
                    <span className="text-2xl font-bold text-[#f9f871]">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/cart"
                      onClick={onClose}
                      className="rounded-lg border border-white/15 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={onClose}
                      className="rounded-lg bg-[#f9f871] px-4 py-3 text-center font-bold text-[#3a225c] transition-colors hover:bg-[#f9f871]/90"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
