"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import TeamPageCard from "@/components/team/TeamPageCard";
import TeamModal from "@/components/home/TeamModal";
import teamMembers from "@/lib/data/teamData.json";

// Animation variants for scroll-triggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const sectionTitleVariants = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<
    (typeof teamMembers)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Organize team members by hierarchy
  const organizedTeam = useMemo(() => {
    const founder = teamMembers.find((m) => m.hierarchy === 1);
    const boardOfDirectors = teamMembers.filter(
      (m) => m.hierarchy === 2 && m.role.includes("Board of Director")
    );
    const mentors = teamMembers.filter(
      (m) => m.hierarchy === 2 && m.role.includes("Mentor")
    );
    const restOfTeam = teamMembers.filter((m) => m.hierarchy >= 3);

    return {
      founder,
      boardOfDirectors,
      mentors,
      restOfTeam,
    };
  }, []);

  const handleCardClick = (member: (typeof teamMembers)[0]) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#f9f871]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#fc98ac]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white">
                Meet Our <span className="text-[#f9f871]">Team</span>
              </h1>
              <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
            </div>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              The passionate individuals driving our mission forward
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section - Prominent Display */}
      {organizedTeam.founder && (
        <section className="py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={sectionTitleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f9f871]/50 to-[#f9f871]" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Founder
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#f9f871]/50 to-[#f9f871]" />
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center"
            >
              <motion.div variants={itemVariants} className="max-w-sm w-full">
                {organizedTeam.founder && (
                  <TeamPageCard
                    member={organizedTeam.founder}
                    index={0}
                    onClick={() => handleCardClick(organizedTeam.founder!)}
                  />
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Board of Directors Section */}
      {organizedTeam.boardOfDirectors.length > 0 && (
        <section className="py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={sectionTitleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#fc98ac]/50 to-[#fc98ac]" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Board of Directors
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#fc98ac]/50 to-[#fc98ac]" />
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto"
            >
              {organizedTeam.boardOfDirectors.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <TeamPageCard
                    member={member}
                    index={index}
                    onClick={() => handleCardClick(member)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Mentors Section */}
      {organizedTeam.mentors.length > 0 && (
        <section className="py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={sectionTitleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ffbc5c]/50 to-[#ffbc5c]" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Mentors
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#ffbc5c]/50 to-[#ffbc5c]" />
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto"
            >
              {organizedTeam.mentors.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <TeamPageCard
                    member={member}
                    index={index}
                    onClick={() => handleCardClick(member)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Rest of Team Section */}
      {organizedTeam.restOfTeam.length > 0 && (
        <section className="py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={sectionTitleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-white/30" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Our Team
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/30 to-white/30" />
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {organizedTeam.restOfTeam.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <TeamPageCard
                    member={member}
                    index={index}
                    onClick={() => handleCardClick(member)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Team Modal */}
      <TeamModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Footer />
    </main>
  );
}
