"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { getIsFeatured } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  featured?: boolean;
  bio?: string;
  social: {
    linkedin: string;
    instagram: string;
    twitter: string;
  };
}

interface TeamModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamModal({ member, isOpen, onClose }: TeamModalProps) {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isBioModalOpen) {
          setIsBioModalOpen(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isBioModalOpen, onClose]);

  if (!member) return null;

  // Truncate bio to 500 characters
  const truncatedBio =
    member.bio && member.bio.length > 350
      ? member.bio.substring(0, 350) + "..."
      : member.bio;
  const shouldShowReadMore = member.bio && member.bio.length > 350;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative bg-[#3a225c] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#fc98ac] hover:border-[#fc98ac] transition-all duration-300"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Left Column - Image (Desktop) / Top (Mobile) - Fixed */}
              <div className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-auto md:h-auto md:max-h-[90vh] min-h-[300px] md:min-h-[500px] flex-shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {getIsFeatured(member) && (
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 px-4 py-2 bg-[#f9f871] rounded-full">
                    <span className="text-[#3a225c] font-bold text-xs md:text-sm">
                      FOUNDER
                    </span>
                  </div>
                )}

                {/* Social Icons Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(45,25,73,0.95)] via-[rgba(58,34,92,0.85)] to-transparent p-6 md:p-8">
                  <div className="flex items-center justify-center gap-4">
                    <motion.a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin size={20} />
                    </motion.a>
                    {/* <motion.a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Instagram size={20} />
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Twitter size={20} />
                    </motion.a> */}
                  </div>
                </div>
              </div>

              {/* Right Column - Bio Content (Scrollable) */}
              <div className="w-full md:w-1/2 flex flex-col overflow-hidden">
                <div className="overflow-y-auto flex-1 p-6 md:p-8 lg:p-12">
                  <div className="space-y-6">
                    {/* Name and Role */}
                    <div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                        {member.name}
                      </h2>
                      <p className="text-lg md:text-xl text-[#f9f871] font-semibold">
                        {member.role}
                      </p>
                    </div>

                    {/* Bio */}
                    {member.bio && (
                      <div className="space-y-3">
                        {/* <h3 className="text-white font-semibold text-lg md:text-xl">
                          About
                        </h3> */}
                        <div>
                          <p className="text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-line">
                            {truncatedBio}
                          </p>
                          {shouldShowReadMore && (
                            <button
                              onClick={() => setIsBioModalOpen(true)}
                              className="mt-3 text-[#f9f871] font-semibold hover:text-[#fc98ac] transition-colors text-sm md:text-base"
                            >
                              Read more
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Bio Read More Modal */}
      <AnimatePresence>
        {isBioModalOpen && member.bio && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBioModalOpen(false)}
            />

            {/* Bio Modal */}
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBioModalOpen(false)}
            >
              <motion.div
                className="relative bg-[#3a225c] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsBioModalOpen(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#fc98ac] hover:border-[#fc98ac] transition-all duration-300"
                  aria-label="Close bio modal"
                >
                  <X size={20} />
                </button>

                {/* Bio Content - Scrollable */}
                <div className="overflow-y-auto max-h-[80vh] p-6 md:p-8 lg:p-12">
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {member.name}
                    </h2>
                    {/* <h3 className="text-white font-semibold text-lg md:text-xl">
                      About
                    </h3> */}
                    <p className="text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
