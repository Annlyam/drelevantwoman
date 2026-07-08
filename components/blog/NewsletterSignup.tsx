"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    // Handle newsletter subscription
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log(data);
    setEmail("");
=======
    
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Successfully subscribed!");
        setEmail("");
        // Auto-reset success state after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
>>>>>>> origin/main
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
          disabled={isLoading}
          className="w-full px-4 py-3 bg-white rounded-lg text-[#3a225c] placeholder:text-[#3a225c]/60 focus:outline-none focus:ring-2 focus:ring-[#3a225c] disabled:opacity-50 transition-opacity"
        />
        <motion.button
          type="submit"
          disabled={isLoading}
          className={`w-full px-6 py-3 font-bold rounded-lg transition-colors duration-300 ${
            isLoading
              ? "bg-[#999] text-white cursor-not-allowed"
              : status === "success"
              ? "bg-green-600 text-white"
              : status === "error"
              ? "bg-red-600 text-white"
              : "bg-[#3a225c] text-white hover:bg-[#914177]"
          }`}
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          {isLoading ? "Subscribing..." : status === "success" ? "✓ Subscribed!" : status === "error" ? "✗ Try Again" : "Subscribe"}
        </motion.button>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm font-medium text-center ${
              status === "success" ? "text-green-600" : status === "error" ? "text-red-600" : "text-[#3a225c]/70"
            }`}
          >
            {message}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}
