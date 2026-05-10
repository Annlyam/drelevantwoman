"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { getIsFeatured } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  featured?: boolean;
  hierarchy?: number;
  bio?: string;
  social: {
    linkedin: string;
    instagram: string;
    twitter: string;
  };
}

interface TeamPageCardProps {
  member: TeamMember;
  index: number;
  onClick?: () => void;
}

export default function TeamPageCard({
  member,
  index,
  onClick,
}: TeamPageCardProps) {
  return (
    <motion.div
      className="relative group h-full cursor-pointer w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      onClick={onClick}
    >
      {/* Image Container with better aspect ratio */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5 shadow-xl">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={90}
        />

        {/* Featured Badge */}
        {getIsFeatured(member) && (
          <motion.div
            className="absolute top-4 right-4 z-10 px-4 py-2 bg-[#f9f871] rounded-full shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <span className="text-[#3a225c] font-bold text-xs md:text-sm">
              FOUNDER
            </span>
          </motion.div>
        )}

        {/* Hover Overlay with Social Icons */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(58,34,92,0.95)] via-[rgba(58,34,92,0.7)] to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="flex gap-3">
            <motion.a
              href={member.social.linkedin}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-all duration-300"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} />
            </motion.a>
            {/* <motion.a
              href={member.social.instagram}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-all duration-300"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={20} />
            </motion.a>
            <motion.a
              href={member.social.twitter}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-all duration-300"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter size={20} />
            </motion.a> */}
          </div>
        </motion.div>

        {/* Subtle border glow on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#f9f871]/30 transition-all duration-300 pointer-events-none" />
      </div>

      {/* Info Section */}
      <div className="text-center space-y-2">
        <h3 className="text-white font-bold text-lg md:text-xl mb-1 line-clamp-2 group-hover:text-[#f9f871] transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-white/70 text-sm md:text-base line-clamp-2">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}
