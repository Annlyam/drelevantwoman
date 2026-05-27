"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Video,
} from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/188LaQRkQK/?mibextid=wwXIfr", label: "Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/the-relevant-woman/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/the_relevantwoman?igsh=MXRnaGk4YzI1NXU3cA%3D%3D&utm_source=qr", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@therelevantwoman?si=UB3Iq_MDy0Swyjh7", label: "YouTube" },
  { icon: Video, href: "https://www.tiktok.com/@the.relevant.woma?_r=1&_t=ZT-937VTMiELR9", label: "TikTok" },
  { icon: MessageCircle, href: "https://t.me/TheRelevantWoman", label: "Telegram" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
  };

  return (
    <section className="py-8 sm:py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-gradient-to-br from-[#3a225c] to-[#914177] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-12 border-2 border-[#fc98ac]/30 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Social & Contact */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="min-w-0"
            >
              <h3 className="text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4">
                Let&apos;s Connect
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-all duration-300 border border-white/20 shrink-0"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                    </motion.a>
                  );
                })}
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2.5 sm:gap-3 text-white/90 text-sm sm:text-base min-w-0">
                  <Phone size={18} className="shrink-0 w-[18px] h-[18px]" />
                  <a href="tel:+2348123553150" className="hover:text-[#f9f871] transition-colors">
                    08123553150
                  </a>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 text-white/90 text-sm sm:text-base min-w-0">
                  <Mail size={18} className="shrink-0 w-[18px] h-[18px]" />
                  <a href="mailto:therelevantw@gmail.com" className="hover:text-[#f9f871] transition-colors break-all">
                    therelevantw@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-white/80 mt-4 sm:mt-6 text-xs sm:text-sm">
                Reach out and we&apos;ll provide assistance any time of day
              </p>
            </motion.div>

            {/* Right Side - Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="min-w-0"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                SUBSCRIBE NOW FOR TIPS, UPDATES AND EXCLUSIVE OFFERS!
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  disabled={isLoading}
                  className="flex-1 min-w-0 px-4 sm:px-6 py-3.5 sm:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[#f9f871] focus:bg-white/20 transition-all duration-300 text-base disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 font-bold rounded-lg transition-all duration-300 shadow-lg touch-manipulation shrink-0 ${
                    isLoading
                      ? "bg-[#999] text-[#3a225c] cursor-not-allowed"
                      : status === "success"
                      ? "bg-green-500 text-white"
                      : status === "error"
                      ? "bg-red-500 text-white"
                      : "bg-[#f9f871] text-[#3a225c] hover:bg-[#ffbc5c]"
                  }`}
                  whileHover={!isLoading ? { scale: 1.05 } : {}}
                  whileTap={!isLoading ? { scale: 0.95 } : {}}
                >
                  {isLoading ? "Subscribing..." : status === "success" ? "✓ Subscribed!" : status === "error" ? "✗ Try Again" : "Submit"}
                </motion.button>
              </form>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 text-sm font-medium ${
                    status === "success" ? "text-green-300" : status === "error" ? "text-red-300" : "text-white/80"
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
