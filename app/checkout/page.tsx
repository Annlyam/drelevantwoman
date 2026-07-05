"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import { useCart } from "react-use-cart";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CheckoutStatus = "idle" | "processing" | "success" | "failed";

type CheckoutFormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  paymentProvider: "paystack" | "stripe";
};

const initialFormData: CheckoutFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  paymentProvider: "paystack",
};

const initialErrors: Record<keyof CheckoutFormData, string> = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  paymentProvider: "",
};

export default function Checkout() {
  const { items, removeItem, cartTotal, emptyCart, totalItems } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [checkoutStatus, setCheckoutStatus] =
    useState<CheckoutStatus>("idle");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof CheckoutFormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    } as CheckoutFormData));

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const validateForm = () => {
    const nextErrors = { ...initialErrors };

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      nextErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.address.trim()) {
      nextErrors.address = "Billing address is required";
    }

    if (!formData.city.trim()) {
      nextErrors.city = "City is required";
    }

    if (!formData.country.trim()) {
      nextErrors.country = "Country is required";
    }

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleMakePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setCheckoutStatus("processing");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setCheckoutStatus("success");
    emptyCart();
  };

  if (checkoutStatus === "success") {
    return (
      <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
        <Navigation />
        <section className="pt-32 pb-20 min-h-screen flex items-center justify-center px-4">
          <motion.div
            className="max-w-xl text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f9f871]/20">
              <CheckCircle className="h-10 w-10 text-[#f9f871]" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Order Submitted
            </h1>
            <p className="text-white/70 mb-8">
              Your checkout details were received successfully. A confirmation will be sent once your order is processed.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/store"
                className="rounded-lg bg-[#f9f871] px-6 py-3 font-bold text-[#3a225c] transition-colors hover:bg-[#f9f871]/90"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="rounded-lg border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Back Home
              </Link>
            </div>
          </motion.div>
        </section>
        <Footer />
      </main>
    );
  }

  if (checkoutStatus === "failed") {
    return (
      <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
        <Navigation />
        <section className="pt-32 pb-20 min-h-screen flex items-center justify-center px-4">
          <motion.div
            className="max-w-xl text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15">
              <AlertCircle className="h-10 w-10 text-red-300" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Payment Not Completed
            </h1>
            <p className="text-white/70 mb-8">
              Your cart is still available. You can review your details and try
              checkout again.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setCheckoutStatus("idle")}
                className="rounded-lg bg-[#f9f871] px-6 py-3 font-bold text-[#3a225c] transition-colors hover:bg-[#f9f871]/90"
              >
                Try Again
              </button>
              <Link
                href="/cart"
                className="rounded-lg border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Back to Cart
              </Link>
            </div>
          </motion.div>
        </section>
        <Footer />
      </main>
    );
  }
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#3a225c]">
        <Navigation />
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center px-4">
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
            <p className="text-white/60">
              Review your billing details and order summary.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Billing Information
                    </h2>
                    <p className="mt-2 text-white/60">
                      Enter your billing details to prepare your order.
                    </p>
                  </div>
                  <ShieldCheck className="hidden h-8 w-8 text-[#f9f871] sm:block" />
                </div>

                <form onSubmit={handleMakePayment} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-white/80 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                          errors.fullName
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/20 focus:ring-[#fc98ac]"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

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
                        placeholder="+234 000 000 0000"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-white/80 mb-2"
                      >
                        Billing Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                          errors.address
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/20 focus:ring-[#fc98ac]"
                        }`}
                        placeholder="Street address"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-white/80 mb-2"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                          errors.city
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/20 focus:ring-[#fc98ac]"
                        }`}
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-white/80 mb-2"
                      >
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                          errors.country
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/20 focus:ring-[#fc98ac]"
                        }`}
                        placeholder="Country"
                      />
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="paymentProvider"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Preferred Payment Provider
                    </label>
                    <select
                      id="paymentProvider"
                      name="paymentProvider"
                      value={formData.paymentProvider}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fc98ac]"
                    >
                      <option className="bg-[#3a225c]" value="paystack">
                        Paystack
                      </option>
                      <option className="bg-[#3a225c]" value="stripe">
                        Stripe
                      </option>
                    </select>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="submit"
                      disabled={checkoutStatus === "processing"}
                      className="w-full px-6 py-4 bg-[#f9f871] text-[#3a225c] rounded-lg font-semibold hover:bg-[#f9f871]/90 transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {checkoutStatus === "processing" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Preparing Checkout
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Continue to Payment
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutStatus("failed")}
                      className="w-full rounded-lg border border-white/15 px-6 py-4 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Cancel Payment
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

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

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 pb-4 border-b border-white/10"
                    >
                      {item.image && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
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
                          {item.quantity || 1} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/50 hover:text-red-400 transition-colors"
                        type="button"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/80">Subtotal</span>
                    <span className="text-white font-semibold">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/80">Items</span>
                    <span className="text-white font-semibold">{totalItems}</span>
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
