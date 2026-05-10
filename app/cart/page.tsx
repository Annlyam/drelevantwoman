"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import { useCart } from "react-use-cart";
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { items, removeItem, cartTotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
        <Navigation />
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 text-white/30 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-white/60 mb-8">
              Add some products to your cart to get started.
            </p>
            <Link
              href="/store"
              className="inline-block px-6 py-3 bg-[#fc98ac] text-white rounded-lg font-semibold hover:bg-[#fc98ac]/80 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#3a225c]">
      <Navigation />

      <section className="pt-32 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Your Cart
            </h1>
            <p className="text-white/60">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    {item.image && (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    )}

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-[#f9f871]">
                            ${item.price?.toFixed(2)}
                          </p>
                          {item.quantity && item.quantity > 1 && (
                            <p className="text-sm text-white/50">
                              {item.quantity} × ${item.price?.toFixed(2)} = $
                              {(item.price * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-white/50 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                          type="button"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-[#f9f871]">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <button
                    className="w-full px-6 py-4 bg-[#f9f871] text-[#3a225c] rounded-lg font-semibold hover:bg-[#f9f871]/90 transition-colors flex items-center justify-center gap-2"
                    type="button"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                {/* Continue Shopping */}
                <Link href="/store">
                  <button
                    className="w-full mt-4 px-6 py-3 bg-white/5 text-white border border-white/20 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                    type="button"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
