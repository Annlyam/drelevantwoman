"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import { Handshake, Target, Users2, ShieldCheck, Mail, Phone, Loader2, Sparkles, Building2 } from "lucide-react";
import Image from "next/image";

type PartnershipFormData = {
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

const initialFormData: PartnershipFormData = {
  orgName: "",
  contactName: "",
  email: "",
  phone: "",
  type: "sponsorship",
  message: "",
};

const initialErrors = {
  orgName: "",
  contactName: "",
  email: "",
  phone: "",
  message: "",
};

export default function Partnerships() {
  const [formData, setFormData] = useState<PartnershipFormData>(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const benefits = [
    {
      icon: Target,
      title: "Shared Community Impact",
      desc: "Align your organization with our mission to empower young women, helping build the next generation of leaders and female entrepreneurs.",
    },
    {
      icon: Users2,
      title: "Access to Top Talent",
      desc: "Connect directly with bright, driven, and certified graduates of The Relevant Woman Academy (RWA) for internship and employment opportunities.",
    },
    {
      icon: Sparkles,
      title: "Brand Visibility",
      desc: "Gain exposure across our media platforms, events, magazines, and newsletters, demonstrating your commitment to diversity and CSR.",
    },
  ];

  const partners = [
    { name: "TechHub Africa", logo: "/assets/images/partners/techhub.png", type: "Technology Partner" },
    { name: "SheLead Foundation", logo: "/assets/images/partners/shelead.png", type: "Mentorship Partner" },
    { name: "Future Finance", logo: "/assets/images/partners/futurefinance.png", type: "Sponsorship Partner" },
    { name: "Vanguard Media", logo: "/assets/images/partners/vanguard.png", type: "Media Partner" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.orgName.trim()) {
      nextErrors.orgName = "Organization name is required";
      isValid = false;
    }
    if (!formData.contactName.trim()) {
      nextErrors.contactName = "Contact person name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required";
      isValid = false;
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Please enter a brief message or proposal details";
      isValid = false;
    }

    setErrors(nextErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData(initialFormData);
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#3a225c] text-white overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#2c144c] via-[#3a225c] to-[#2d0e5c] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl text-white">🤝</div>
          <div className="absolute bottom-20 right-20 text-6xl text-white">✨</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-2">
              <Handshake className="w-5 h-5 text-[#f9f871]" />
              <span className="text-white/90 text-sm font-semibold">Partner With Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Collaborate to Empower <span className="text-[#f9f871]">Women Leaders</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              We work with corporations, educational institutions, foundations, and community leaders to create sustainable paths for women’s advancement. Join hands with us to amplify our impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Partner With Us?</h2>
            <p className="text-white/60 text-lg">
              Unlock mutual growth, shared social impact, and strategic positioning through custom collaboration models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#fc98ac]/50 hover:scale-[1.02] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="p-3 bg-[#fc98ac]/10 rounded-xl text-[#fc98ac] w-max mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Logos Grid */}
      <section className="py-16 bg-[#2c144c] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/50 text-sm font-semibold tracking-wider uppercase mb-10">
            Trusted by Forward-Thinking Organizations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                className="text-center group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-28 h-28 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:bg-white/10 transition-colors">
                  <Building2 className="w-10 h-10 text-white/40 group-hover:text-[#f9f871] transition-colors" />
                </div>
                <h4 className="font-bold text-white text-sm">{partner.name}</h4>
                <p className="text-xs text-white/50">{partner.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Inquiry Form Section */}
      <section id="inquiry-form" className="py-16 md:py-24 bg-[#3a225c]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Partnership Inquiry Form</h2>
              <p className="text-white/60 text-sm">
                Fill out the form below, and our partnership management team will respond within 48 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Org Name */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/45 focus:outline-none focus:ring-2 ${
                      errors.orgName ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#fc98ac]"
                    }`}
                    placeholder="e.g. Acme Corp"
                  />
                  {errors.orgName && <p className="text-red-400 text-xs mt-1">{errors.orgName}</p>}
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/45 focus:outline-none focus:ring-2 ${
                      errors.contactName ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#fc98ac]"
                    }`}
                    placeholder="e.g. Jane Doe"
                  />
                  {errors.contactName && <p className="text-red-400 text-xs mt-1">{errors.contactName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/45 focus:outline-none focus:ring-2 ${
                      errors.email ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#fc98ac]"
                    }`}
                    placeholder="e.g. partner@acme.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/45 focus:outline-none focus:ring-2 ${
                      errors.phone ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#fc98ac]"
                    }`}
                    placeholder="e.g. +234 800 000 0000"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Partnership Type */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Collaboration Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fc98ac]"
                >
                  <option className="bg-[#3a225c]" value="sponsorship">Corporate Sponsorship / Funding</option>
                  <option className="bg-[#3a225c]" value="academy">RWA Academy Sponsorship</option>
                  <option className="bg-[#3a225c]" value="mentorship">Mentorship Collaboration</option>
                  <option className="bg-[#3a225c]" value="inkind">In-Kind Donation / Venues</option>
                  <option className="bg-[#3a225c]" value="other">Other / Custom Collaboration</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Message / Collaboration Proposal *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/45 focus:outline-none focus:ring-2 ${
                    errors.message ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#fc98ac]"
                  }`}
                  placeholder="Outline how you would like to collaborate..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit states */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#f9f871] text-[#3a225c] rounded-xl font-bold hover:bg-[#f9f871]/95 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Inquiry...
                    </>
                  ) : (
                    <>
                      <Handshake className="w-5 h-5" />
                      Submit Partnership Request
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3 mt-4 text-green-300"
                  >
                    <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Thank You for Reaching Out!</p>
                      <p className="text-xs text-green-300/80 mt-0.5">
                        Your inquiry was submitted successfully. Our partnership team will contact you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mt-4 text-red-300 text-sm"
                  >
                    Failed to submit. Please check your network connection and try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
