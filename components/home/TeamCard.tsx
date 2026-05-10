"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  featured?: boolean;
  social: {
    linkedin: string;
    instagram: string;
    twitter: string;
  };
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
  onClick?: () => void;
}

export default function TeamCard({ member, index, onClick }: TeamCardProps) {
  return (
    <motion.div
      className="relative group h-full cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />

        {/* Featured Badge */}
        {member.featured && (
          <motion.div
            className="hidden md:flex absolute top-4 right-4 z-10 w-5 md:w-20 h-5 md:h-20 bg-[#f9f871] rounded-full items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <span className="text-[#3a225c] font-bold text-xs text-center leading-tight">
              FOUNDER
            </span>
          </motion.div>
        )}

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(45,25,73,0.96)] via-[rgba(58,34,92,0.62)] to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="flex gap-3">
            <motion.a
              href={member.social.linkedin}
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={18} />
            </motion.a>
            {/* <motion.a
              href={member.social.instagram}
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram size={18} />
            </motion.a>
            <motion.a
              href={member.social.twitter}
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter size={18} />
            </motion.a> */}
          </div>
        </motion.div>
      </div>

      {/* Info Bar */}
      <div
        className="bg-transparent rounded-lg p-4 border border-white/10"
        style={{
          boxShadow:
            "inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
          {member.name}
        </h3>
        <p className="text-white/70 text-sm line-clamp-1">{member.role}</p>
      </div>
    </motion.div>
  );
}
