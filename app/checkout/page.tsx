"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import { useCart } from "react-use-cart";
import { ShoppingCart, Trash2, CreditCard, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Checkout() {
  const { items, removeItem, cartTotal, emptyCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleMakePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Payment logic would go here
      console.log("Payment data:", { formData, items, total: cartTotal });
      alert("Payment functionality will be implemented here");
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#3a225c]">
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
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />

      <section className="pt-32 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Cart</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Checkout
            </h1>
            <p className="text-white/60">Complete your purchase below</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h2>
                <form onSubmit={handleMakePayment} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-[#fc98ac]"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-[#fc98ac]"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-[#fc98ac]"
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Make Payment Button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-[#f9f871] text-[#3a225c] rounded-lg font-semibold hover:bg-[#f9f871]/90 transition-colors flex items-center justify-center gap-2 mt-8"
                  >
                    <CreditCard className="w-5 h-5" />
                    Make Payment
                  </button>
                </form>
              </motion.div>
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

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 pb-4 border-b border-white/10"
                    >
                      {item.image && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#f9f871] mt-1">
                          ${item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/50 hover:text-red-400 transition-colors"
                        type="button"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/80">Subtotal</span>
                    <span className="text-white font-semibold">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-white/80">Total</span>
                    <span className="text-2xl font-bold text-[#f9f871]">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
