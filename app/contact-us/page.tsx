"use client";

import Footer from "@/components/shared/Footer";
import Navigation from "@/components/shared/Navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Twitter,
  User,
  Youtube,
  MessageCircle,
  Video,
} from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
      subject: "",
      message: "",
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

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after showing success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "therelevantw@gmail.com",
      link: "mailto:therelevantw@gmail.com",
      color: "bg-[#fc98ac]/20",
      iconColor: "text-[#fc98ac]",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "07041409742",
      link: "tel:+2347041409742",
      color: "bg-[#f9f871]/20",
      iconColor: "text-[#f9f871]",
    },
    // {
    //   icon: MapPin,
    //   title: "Visit Us",
    //   content: "New York, NY",
    //   link: "#",
    //   color: "bg-[#ffbc5c]/20",
    //   iconColor: "text-[#ffbc5c]",
    // },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Mon - Fri: 9AM - 6PM",
      link: "#",
      color: "bg-[#914177]/20",
      iconColor: "text-[#914177]",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/188LaQRkQK/?mibextid=wwXIfr",
      label: "Facebook",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/the-relevant-woman/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/the_relevantwoman?igsh=MXRnaGk4YzI1NXU3cA%3D%3D&utm_source=qr",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@therelevantwoman?si=UB3Iq_MDy0Swyjh7",
      label: "YouTube",
    },
    {
      icon: Video,
      href: "https://www.tiktok.com/@the.relevant.woma?_r=1&_t=ZT-937VTMiELR9",
      label: "TikTok",
    },
    {
      icon: MessageCircle,
      href: "https://t.me/TheRelevantWoman",
      label: "Telegram",
    },
  ];

  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c144c] via-[#3a225c] to-[#5b1364]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Get in <span className="text-[#f9f871]">Touch</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-20 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#fc98ac]/20 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-[#fc98ac]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Send us a Message
                    </h2>
                    <p className="text-white/60 text-sm">
                      Fill out the form below and we&apos;ll get back to you
                    </p>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-20 h-20 bg-[#f9f871]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-[#f9f871]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-white/70">
                      Thank you for contacting us. We&apos;ll get back to you
                      soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white/80 mb-2"
                      >
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                            errors.name
                              ? "border-red-500 focus:ring-red-500"
                              : "border-white/20 focus:ring-[#fc98ac] focus:border-[#fc98ac]"
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white/80 mb-2"
                        >
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                              errors.email
                                ? "border-red-500 focus:ring-red-500"
                                : "border-white/20 focus:ring-[#fc98ac] focus:border-[#fc98ac]"
                            }`}
                            placeholder="your.email@example.com"
                          />
                        </div>
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
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                              errors.phone
                                ? "border-red-500 focus:ring-red-500"
                                : "border-white/20 focus:ring-[#fc98ac] focus:border-[#fc98ac]"
                            }`}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-white/80 mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                          errors.subject
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/20 focus:ring-[#fc98ac] focus:border-[#fc98ac]"
                        }`}
                        placeholder="What is this regarding?"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-white/80 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all resize-none ${
                          errors.message
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/20 focus:ring-[#fc98ac] focus:border-[#fc98ac]"
                        }`}
                        placeholder="Tell us more about your inquiry..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.message}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-white/50">
                        {formData.message.length} / 500 characters
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-[#f9f871] text-[#3A225C] rounded-xl font-semibold hover:bg-[#dbdb4a]/80 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Info Cards */}
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.link}
                    className="block bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#fc98ac]/50 transition-all hover:scale-[1.02] group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className={`w-6 h-6 ${info.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">
                          {info.title}
                        </h3>
                        <p className="text-white/70 text-sm">{info.content}</p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}

              {/* Social Media */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-white font-semibold mb-4">Follow Us On</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/10 hover:bg-[#fc98ac]/20 rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110 border border-white/10 hover:border-[#fc98ac]/50"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Quick Response */}
              <motion.div
                className="bg-gradient-to-br from-[#fc98ac]/20 to-[#f9f871]/20 rounded-xl p-6 border border-[#fc98ac]/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#f9f871] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Quick Response
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      We typically respond within 24-48 hours during business
                      days.
                    </p>
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
