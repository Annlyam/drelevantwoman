"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing:", email);
    setEmail("");
  };

  return (
    <motion.div
      className="bg-[rgba(255,255,255,0.13)] rounded-2xl p-6 md:p-8 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xs uppercase tracking-wider text-[#3a225c] mb-4 font-semibold">
        Newsletter
      </h3>
      <p className="text-[#fff] font-bold text-lg mb-6">
        Get all the latest posts delivered straight to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="w-full px-4 py-3 bg-white rounded-lg text-[#3a225c] placeholder:text-[#3a225c]/60 focus:outline-none focus:ring-2 focus:ring-[#3a225c]"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#3a225c] text-white font-bold rounded-lg hover:bg-[#914177] transition-colors duration-300"
        >
          Subscribe
        </button>
      </form>
    </motion.div>
  );
}
