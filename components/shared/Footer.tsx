"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Youtube,
  MessageCircle,
  Video,
} from "lucide-react";

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Team", href: "/about/team" },
    { name: "Blog", href: "/media" },
    { name: "Contact", href: "/contact-us" },
  ],
  quickLinks: [
    { name: "Programs", href: "/academy" },
    { name: "Partnerships", href: "/partnerships" },
    { name: "Store", href: "/store" },
    { name: "Library", href: "/library" },
  ],
};

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

export default function Footer() {
  return (
    <footer className="bg-[#3a225c] border-t border-[#914177]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#f9f871] transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f9f871] group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#f9f871] transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f9f871] group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              {/* <li className="flex items-center space-x-2 text-white/70">
                <MapPin size={16} />
                <span>New York, NY</span>
              </li> */}
              <li className="flex items-center space-x-2 text-white/70">
                <Phone size={16} />
                <a
                  href="tel:+2348123553150"
                  className="hover:text-[#f9f871] transition-colors"
                >
                  08123553150
                </a>
              </li>
              <li className="flex items-center space-x-2 text-white/70">
                <Mail size={16} />
                <a
                  href="mailto:therelevantw@gmail.com"
                  className="hover:text-[#f9f871] transition-colors"
                >
                  therelevantw@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Follow Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Follow Us On</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-white/70 hover:text-[#f9f871] hover:border-[#f9f871] transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-[#3e0660]/30 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-center md:text-left text-white/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} The Relevant Woman. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy-policy"
              className="text-white/70 hover:text-[#f9f871] text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-white/70 hover:text-[#f9f871] text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
