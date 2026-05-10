"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Award } from "lucide-react";

interface ProgramContentProps {
  curriculum: string[];
  learningOutcomes: string[];
  prerequisites?: string[];
  whatYouGet: string[];
}

export default function ProgramContent({
  curriculum,
  learningOutcomes,
  prerequisites,
  whatYouGet,
}: ProgramContentProps) {
  return (
    <div className="space-y-12">
      {/* What You'll Learn */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          What You&apos;ll Learn
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {learningOutcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#fc98ac] flex-shrink-0 mt-0.5" />
              <p className="text-white/80">{outcome}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Prerequisites */}
      {prerequisites && prerequisites.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Prerequisites</h2>
          <ul className="space-y-2">
            {prerequisites.map((prereq, index) => (
              <li key={index} className="flex items-start gap-3 text-white/80">
                <span className="text-[#fc98ac]">•</span>
                <span>{prereq}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Curriculum */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">Curriculum</h2>
        <div className="space-y-4">
          {curriculum.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#fc98ac]/20 flex items-center justify-center text-[#fc98ac] font-bold">
                  {index + 1}
                </div>
                <p className="text-white/90 font-medium">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* What's Included */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          What&apos;s Included
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {whatYouGet.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#f9f871] flex-shrink-0" />
              <p className="text-white/80">{item}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
