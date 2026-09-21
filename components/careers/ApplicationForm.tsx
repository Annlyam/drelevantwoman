"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Head of Social Media",
  "Asst. Social Media Manager",
  "Community Manager - WhatsApp",
  "Community Manager - Telegram",
  "Community Manager - Instagram",
  "Community Manager - LinkedIn",
  "Community Manager - TikTok",
  "Content Writer",
  "Video Editor",
  "Project Manager",
  "Asst. Project Manager",
  "Programs Coordinator",
  "Partnership Coordinator",
  "Marketing/Sales Manager",
  "Accountant",
  "Graphic Designer"
];

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("resume") as File;
    
    if (file && file.size > 4 * 1024 * 1024) {
      setStatus("error");
      setMessage("Resume file size must be less than 4MB.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Your application has been submitted successfully! We'll be in touch.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Application error:", error);
      setStatus("error");
      setMessage("A network error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100" id="apply">
      <h3 className="text-2xl font-bold text-[#3a225c] mb-6">Submit Your Application</h3>
      <p className="text-gray-600 mb-8">
        Fill out the form below to apply for a volunteer role. Ensure your CV and Cover Letter highlight your relevant experience and skills.
      </p>

      {status === "success" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 text-center"
        >
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 className="text-xl font-bold mb-2">Application Received!</h4>
          <p>{message}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-[#3a225c] mb-2">Full Name *</label>
              <input type="text" id="fullName" name="fullName" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f9f871] focus:border-[#3a225c] transition-colors" placeholder="Jane Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#3a225c] mb-2">Email Address *</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f9f871] focus:border-[#3a225c] transition-colors" placeholder="jane@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-[#3a225c] mb-2">Phone Number *</label>
              <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f9f871] focus:border-[#3a225c] transition-colors" placeholder="+234..." />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-[#3a225c] mb-2">Role Applying For *</label>
              <select id="role" name="role" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f9f871] focus:border-[#3a225c] transition-colors bg-white">
                <option value="">Select a role...</option>
                {ROLES.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="portfolio" className="block text-sm font-semibold text-[#3a225c] mb-2">Portfolio / LinkedIn URL (Optional)</label>
            <input type="url" id="portfolio" name="portfolio" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f9f871] focus:border-[#3a225c] transition-colors" placeholder="https://..." />
          </div>

          <div>
            <label htmlFor="resume" className="block text-sm font-semibold text-[#3a225c] mb-2">Upload Resume/CV * <span className="text-xs text-gray-500 font-normal">(PDF, DOC, DOCX. Max 4MB)</span></label>
            <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f9f871] focus:border-[#3a225c] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f9f871]/20 file:text-[#3a225c] hover:file:bg-[#f9f871]/30 cursor-pointer" />
          </div>

          <div>
            <label htmlFor="coverLetter" className="block text-sm font-semibold text-[#3a225c] mb-2">Cover Letter *</label>
            <p className="text-xs text-gray-500 mb-2">Please state your interest in the position and highlight your relevant experience, skills, and suitability for the role.</p>
            <textarea id="coverLetter" name="coverLetter" required rows={6} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f9f871] focus:border-[#3a225c] transition-colors resize-none" placeholder="Write your cover letter here..."></textarea>
          </div>

          {status === "error" && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              isSubmitting 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-[#3a225c] text-white hover:bg-[#5b1364] hover:shadow-lg transform hover:-translate-y-1"
            }`}
          >
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  );
}
