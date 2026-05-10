"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import ProgramDetailHero from "@/components/academy/ProgramDetailHero";
import ProgramContent from "@/components/academy/ProgramContent";
import ProgramSidebar from "@/components/academy/ProgramSidebar";
import { Program } from "@/components/academy/ProgramCard";
import { generateSlug } from "@/lib/utils";

// Mock programs data - In production, this would come from a CMS or API
const programs: Record<
  string,
  Program & {
    curriculum: string[];
    learningOutcomes: string[];
    prerequisites?: string[];
    whatYouGet: string[];
  }
> = {
  "leadership-foundations-for-young-women": {
    id: "1",
    title: "Leadership Foundations for Young Women",
    description:
      "Build essential leadership skills and confidence to lead with purpose and impact. This comprehensive program is designed specifically for young women who are ready to step into leadership roles and make a meaningful difference in their communities and careers.",
    instructor: {
      name: "Iveren Ann Lyam",
      image:
        "/assets/images/team/iveren_ann_lyam_founder_the_relevant_woman.jpg",
    },
    duration: "8 hours",
    level: "Beginner",
    rating: 4.8,
    reviews: 124,
    price: 49,
    originalPrice: 99,
    category: "Leadership",
    categoryColor: "#3b82f6",
    categoryIcon: "👑",
    image: "/assets/images/extras/mentorship_session.jpg",
    curriculum: [
      "Introduction to Leadership Principles",
      "Building Self-Confidence and Presence",
      "Effective Communication Strategies",
      "Leading Teams and Managing Conflict",
      "Decision-Making and Problem-Solving",
      "Creating Your Leadership Vision",
      "Networking and Building Relationships",
      "Sustaining Leadership Excellence",
    ],
    learningOutcomes: [
      "Develop a strong personal leadership style",
      "Master effective communication techniques",
      "Build confidence in decision-making",
      "Create and lead high-performing teams",
      "Navigate challenges with resilience",
      "Establish a clear leadership vision",
    ],
    prerequisites: [
      "No prior leadership experience required",
      "Open to all young women ready to grow",
    ],
    whatYouGet: [
      "8 hours of on-demand video content",
      "Downloadable resources and worksheets",
      "Certificate of completion",
      "Lifetime access to course materials",
      "Access to private community forum",
      "Monthly Q&A sessions with instructor",
    ],
  },
  "career-development-mastery": {
    id: "2",
    title: "Career Development Mastery",
    description:
      "Navigate your career path with confidence and strategic planning. Learn how to identify opportunities, negotiate effectively, and build a career that aligns with your values and goals.",
    instructor: {
      name: "Victoria Wilson",
      image: "/assets/images/team/victoria_wilson_project_manager.jpg",
    },
    duration: "12 hours",
    level: "Intermediate",
    rating: 4.9,
    reviews: 89,
    price: 79,
    originalPrice: 149,
    category: "Career",
    categoryColor: "#ec4899",
    categoryIcon: "💼",
    image: "/assets/images/extras/collaborative_learning.jpg",
    curriculum: [
      "Career Assessment and Goal Setting",
      "Building Your Professional Brand",
      "Resume and LinkedIn Optimization",
      "Interview Mastery Techniques",
      "Salary Negotiation Strategies",
      "Building Strategic Networks",
      "Career Pivoting and Transitions",
      "Long-term Career Planning",
    ],
    learningOutcomes: [
      "Create a clear career development plan",
      "Master interview and negotiation skills",
      "Build a compelling professional brand",
      "Develop strategic networking abilities",
      "Navigate career transitions confidently",
    ],
    whatYouGet: [
      "12 hours of comprehensive video content",
      "Resume and LinkedIn templates",
      "Interview preparation guides",
      "Certificate of completion",
      "Lifetime access to materials",
      "Career coaching resources",
    ],
  },
  "mentorship-excellence-program": {
    id: "3",
    title: "Mentorship Excellence Program",
    description:
      "Learn to become an effective mentor and guide others on their journey. This program teaches you how to provide meaningful support, share wisdom, and create lasting impact in the lives of other women.",
    instructor: {
      name: "Gift Odey",
      image: "/assets/images/team/gift_odey_hr_administrative_manager.jpg",
    },
    duration: "10 hours",
    level: "Intermediate",
    rating: 4.7,
    reviews: 156,
    price: 69,
    category: "Mentorship",
    categoryColor: "#10b981",
    categoryIcon: "🤝",
    image: "/assets/images/extras/network_event.jpg",
    curriculum: [
      "Foundations of Effective Mentorship",
      "Building Mentor-Mentee Relationships",
      "Active Listening and Communication",
      "Goal Setting and Accountability",
      "Providing Constructive Feedback",
      "Navigating Difficult Conversations",
      "Creating Mentorship Programs",
      "Sustaining Long-term Mentorship",
    ],
    learningOutcomes: [
      "Develop effective mentorship skills",
      "Build strong mentor-mentee relationships",
      "Master communication and feedback techniques",
      "Create structured mentorship programs",
      "Support mentees through challenges",
    ],
    whatYouGet: [
      "10 hours of expert instruction",
      "Mentorship framework templates",
      "Communication guides",
      "Certificate of completion",
      "Lifetime access",
      "Mentor community access",
    ],
  },
  "personal-branding-for-professional-women": {
    id: "4",
    title: "Personal Branding for Professional Women",
    description:
      "Build a powerful personal brand that opens doors and creates opportunities. Learn how to craft your unique story, establish your online presence, and position yourself as a thought leader in your industry.",
    instructor: {
      name: "Mercy Shamaki",
    },
    duration: "6 hours",
    level: "Beginner",
    rating: 4.6,
    reviews: 203,
    price: 59,
    category: "Branding",
    categoryColor: "#f59e0b",
    categoryIcon: "✨",
    image: "/assets/images/extras/empowerment_workshop.jpg",
    curriculum: [
      "Understanding Personal Branding",
      "Crafting Your Unique Story",
      "Building Your Online Presence",
      "Content Creation Strategies",
      "Networking and Relationship Building",
      "Maintaining Brand Consistency",
    ],
    learningOutcomes: [
      "Define your unique personal brand",
      "Create compelling brand messaging",
      "Build a strong online presence",
      "Develop content that reflects your brand",
      "Network effectively with your brand",
    ],
    whatYouGet: [
      "6 hours of video content",
      "Branding templates and worksheets",
      "Social media strategy guide",
      "Certificate of completion",
      "Lifetime access",
      "Brand audit checklist",
    ],
  },
  "financial-literacy-for-entrepreneurs": {
    id: "5",
    title: "Financial Literacy for Entrepreneurs",
    description:
      "Master financial management and build wealth as a female entrepreneur. Learn essential financial skills including budgeting, investing, and building sustainable business finances.",
    instructor: {
      name: "Cynthia Christopher",
    },
    duration: "14 hours",
    level: "Advanced",
    rating: 4.9,
    reviews: 67,
    price: 99,
    originalPrice: 199,
    category: "Finance",
    categoryColor: "#8b5cf6",
    categoryIcon: "💰",
    image: "/assets/images/extras/collaborative_learning.jpg",
    curriculum: [
      "Financial Fundamentals",
      "Budgeting and Cash Flow Management",
      "Understanding Business Finances",
      "Investment Strategies",
      "Tax Planning and Compliance",
      "Building Long-term Wealth",
      "Financial Risk Management",
      "Scaling Your Financial Success",
    ],
    learningOutcomes: [
      "Master financial planning basics",
      "Create effective budgets",
      "Understand investment options",
      "Navigate tax obligations",
      "Build sustainable financial habits",
    ],
    whatYouGet: [
      "14 hours of comprehensive content",
      "Financial planning templates",
      "Budget worksheets",
      "Certificate of completion",
      "Lifetime access",
      "Financial planning tools",
    ],
  },
  "public-speaking-and-communication": {
    id: "6",
    title: "Public Speaking and Communication",
    description:
      "Overcome fear and master the art of confident public speaking. Learn techniques to engage audiences, deliver powerful presentations, and communicate with impact.",
    instructor: {
      name: "Treasure Babalola",
    },
    duration: "7 hours",
    level: "Beginner",
    rating: 4.8,
    reviews: 145,
    price: 54,
    category: "Communication",
    categoryColor: "#ef4444",
    categoryIcon: "🎤",
    image: "/assets/images/extras/mentorship_session.jpg",
    curriculum: [
      "Overcoming Speaking Anxiety",
      "Structuring Your Presentation",
      "Engaging Your Audience",
      "Body Language and Presence",
      "Handling Q&A Sessions",
      "Virtual Presentation Skills",
      "Building Confidence",
    ],
    learningOutcomes: [
      "Overcome public speaking anxiety",
      "Structure compelling presentations",
      "Engage and connect with audiences",
      "Use body language effectively",
      "Handle difficult questions confidently",
    ],
    whatYouGet: [
      "7 hours of video content",
      "Presentation templates",
      "Practice exercises",
      "Certificate of completion",
      "Lifetime access",
      "Speaking confidence guide",
    ],
  },
  "networking-strategies-for-success": {
    id: "7",
    title: "Networking Strategies for Success",
    description:
      "Build meaningful professional relationships that advance your career. Learn proven networking strategies, relationship-building techniques, and how to leverage your network for opportunities.",
    instructor: {
      name: "Iveren Ann Lyam",
      image:
        "/assets/images/team/iveren_ann_lyam_founder_the_relevant_woman.jpg",
    },
    duration: "5 hours",
    level: "Beginner",
    rating: 4.7,
    reviews: 178,
    price: 49,
    category: "Networking",
    categoryColor: "#06b6d4",
    categoryIcon: "🌐",
    image: "/assets/images/extras/network_event.jpg",
    curriculum: [
      "Networking Fundamentals",
      "Building Your Network",
      "Effective Communication in Networking",
      "Leveraging Social Media",
      "Maintaining Relationships",
      "Turning Connections into Opportunities",
    ],
    learningOutcomes: [
      "Build a strong professional network",
      "Communicate effectively in networking settings",
      "Leverage social media for networking",
      "Maintain long-term professional relationships",
      "Turn connections into opportunities",
    ],
    whatYouGet: [
      "5 hours of video content",
      "Networking templates",
      "Relationship tracking tools",
      "Certificate of completion",
      "Lifetime access",
      "Networking event guide",
    ],
  },
  "work-life-balance-mastery": {
    id: "8",
    title: "Work-Life Balance Mastery",
    description:
      "Achieve harmony between your professional ambitions and personal well-being. Learn strategies to manage time effectively, set boundaries, and create a sustainable work-life balance.",
    instructor: {
      name: "Victoria Wilson",
      image: "/assets/images/team/victoria_wilson_project_manager.jpg",
    },
    duration: "9 hours",
    level: "Intermediate",
    rating: 4.6,
    reviews: 112,
    price: 64,
    category: "Wellness",
    categoryColor: "#14b8a6",
    categoryIcon: "⚖️",
    image: "/assets/images/extras/empowerment_workshop.jpg",
    curriculum: [
      "Understanding Work-Life Balance",
      "Time Management Strategies",
      "Setting Healthy Boundaries",
      "Stress Management",
      "Prioritization Techniques",
      "Self-Care Practices",
      "Building Support Systems",
      "Sustaining Balance Long-term",
    ],
    learningOutcomes: [
      "Create effective time management systems",
      "Set and maintain healthy boundaries",
      "Manage stress effectively",
      "Prioritize what truly matters",
      "Build sustainable work-life balance",
    ],
    whatYouGet: [
      "9 hours of video content",
      "Time management templates",
      "Boundary-setting worksheets",
      "Certificate of completion",
      "Lifetime access",
      "Work-life balance assessment",
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function StoreDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const program = programs[slug];

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <ProgramDetailHero
        title={program.title}
        description={program.description}
        instructor={program.instructor}
        duration={program.duration}
        level={program.level}
        rating={program.rating}
        reviews={program.reviews}
        price={program.price}
        originalPrice={program.originalPrice}
        category={program.category}
        categoryColor={program.categoryColor}
        categoryIcon={program.categoryIcon}
        heroImage={program.image}
      />

      {/* Main Content Section */}
      <section className="py-10 md:py-20 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ProgramContent
                curriculum={program.curriculum}
                learningOutcomes={program.learningOutcomes}
                prerequisites={program.prerequisites}
                whatYouGet={program.whatYouGet}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProgramSidebar
                programId={program.id}
                programTitle={program.title}
                programImage={program.image}
                programSlug={slug}
                price={program.price}
                originalPrice={program.originalPrice}
                duration={program.duration}
                level={program.level}
                rating={program.rating}
                reviews={program.reviews}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
