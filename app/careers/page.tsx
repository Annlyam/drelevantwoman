import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import ApplicationForm from "@/components/careers/ApplicationForm";
import Image from "next/image";
import { Briefcase, CheckCircle, GraduationCap, Clock, FileText } from "lucide-react";

export const metadata = {
  title: "Careers - Join Our Team | The Relevant Woman",
  description: "We are hiring! Be a part of something greater at The Relevant Woman. Apply for our open volunteer roles today.",
};

export default function CareersPage() {
  const requirements = [
    {
      icon: Clock,
      title: "Age & Experience",
      desc: "Applicants must be 20 years and above. Minimum of 1 year relevant work experience (exceptions made for highly motivated candidates demonstrating practical skills)."
    },
    {
      icon: Briefcase,
      title: "Expertise",
      desc: "Must demonstrate relevant knowledge, practical skills, and expertise in the chosen role."
    },
    {
      icon: GraduationCap,
      title: "Qualification",
      desc: "Relevant education, training, certifications, professional knowledge, skills, or demonstrated ability related to the position."
    },
    {
      icon: FileText,
      title: "Application Materials",
      desc: "Submission of an updated CV and a targeted Cover Letter is compulsory for all applicants."
    }
  ];

  const rolesList1 = [
    "Head of Social Media",
    "Asst. Social Media Manager",
    "Community Managers (WhatsApp, Telegram, Instagram, LinkedIn, TikTok)",
    "Content Writers",
    "Video Editors",
    "Project Manager"
  ];

  const rolesList2 = [
    "Asst. Project Manager",
    "Programs Coordinator",
    "Partnership Coordinator",
    "Marketing/Sales Manager",
    "Accountant",
    "Graphic Designer"
  ];

  return (
    <main className="min-h-screen bg-[#f6f5f7] text-gray-900">
      <div className="bg-[#3a225c]">
        <Navigation />
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#3a225c] text-white pt-20 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f9f871] rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fc98ac] rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1 bg-[#f9f871]/20 text-[#f9f871] rounded-full text-sm font-bold tracking-wider uppercase mb-6 border border-[#f9f871]/30">We Are Hiring</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            We Want <span className="text-[#f9f871]">You</span> <br />on Our Team!
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Be a part of something greater. If you are passionate, creative, driven and believe in our vision, we&apos;d love to have you!
          </p>
          <a href="#apply" className="inline-block px-8 py-4 bg-[#f9f871] text-[#3a225c] font-bold rounded-xl hover:bg-[#ffbc5c] transition-all duration-300 shadow-lg transform hover:-translate-y-1">
            Apply Now
          </a>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Note / Banner */}
              <div className="bg-[#fc98ac]/10 border-l-4 border-[#fc98ac] p-6 rounded-r-xl">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#fc98ac]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#3a225c] mb-1">Strictly a Volunteer Role</h3>
                    <p className="text-gray-600">Bring your skills, support our mission, and grow with us! Men and women are welcome to apply.</p>
                  </div>
                </div>
              </div>

              {/* Open Roles */}
              <div>
                <h2 className="text-3xl font-bold text-[#3a225c] mb-8 border-b-2 border-gray-100 pb-4">Open Roles</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-4">
                    {rolesList1.map((role, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#3a225c] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{role}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-4">
                    {rolesList2.map((role, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#3a225c] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Basic Eligibility */}
              <div>
                <h2 className="text-3xl font-bold text-[#3a225c] mb-8 border-b-2 border-gray-100 pb-4">Basic Eligibility</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {requirements.map((req, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <req.icon className="w-8 h-8 text-[#fc98ac] mb-4" />
                      <h3 className="text-xl font-bold text-[#3a225c] mb-2">{req.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{req.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-[#3a225c] mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Have less than 1 year of experience?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Applicants who have less than one year of formal work experience may be considered where they can demonstrate relevant practical experience, knowledge, skills, and a strong willingness to learn through their CV and cover letter.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Application Form & Flyer */}
            <div className="lg:col-span-5 space-y-8 relative">
              <div className="sticky top-24">
                <ApplicationForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
