"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Academy", href: "/academy" },
  { name: "Events", href: "/events" },
  { name: "Store", href: "/store" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact-us" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#3a225c]/95 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex w-13 h-13 md:w-15 md:h-15 relative items-center p-4 space-x-2"
          >
            <Image
              src="/assets/images/logo/rellogo.png"
              alt="The Relevant Woman"
              fill
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => {
              // Check if pathname matches exactly or starts with the link href
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`relative transition-colors duration-300 group ${
                      isActive
                        ? "text-[#f9f871]"
                        : "text-white hover:text-[#f9f871]"
                    }`}
                  >
                    {link.name}
                    <motion.span
                      className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                        isActive
                          ? "w-full bg-[#f9f871]"
                          : "w-0 bg-[#f9f871] group-hover:w-full"
                      }`}
                      initial={false}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/become-a-member"
                className="px-6 py-2.5 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871] transition-colors duration-300"
              >
                Become a Member
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#3a225c]/98 backdrop-blur-lg border-t border-[#914177]"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => {
                // Check if pathname matches exactly or starts with the link href
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href + "/"));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block transition-colors py-2 ${
                      isActive
                        ? "text-[#f9f871] font-semibold"
                        : "text-white hover:text-[#fc98ac]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/become-a-member"
                className="block px-6 py-2.5 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a Member
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
