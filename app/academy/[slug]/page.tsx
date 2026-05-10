"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import BookDetailHero from "@/components/academy/BookDetailHero";
import { Book } from "@/components/academy/BookCard";
import { generateSlug } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle, BookOpen, Clock, Star } from "lucide-react";

// Mock books data - In production, this would come from a CMS or API
const books: Record<
  string,
  Book & {
    chapters: string[];
    keyTakeaways: string[];
    whatYouLearn: string[];
  }
> = {
  "leadership-foundations-for-young-women": {
    id: "1",
    title: "Leadership Foundations for Young Women",
    description:
      "A comprehensive guide to building essential leadership skills and confidence to lead with purpose and impact. This book is designed specifically for young women who are ready to step into leadership roles and make a meaningful difference in their communities and careers.",
    author: {
      name: "Iveren Ann Lyam",
      image:
        "/assets/images/team/iveren_ann_lyam_founder_the_relevant_woman.jpg",
    },
    pages: 245,
    readTime: "6-8 hours",
    rating: 4.8,
    reviews: 124,
    category: "Leadership",
    categoryColor: "#3b82f6",
    coverImage: "/assets/images/books/book-cover-1.png",
    pdfPath: "/assets/books/book-1.pdf",
    featured: true,
    publishedDate: "2024",
    chapters: [
      "Introduction to Leadership Principles",
      "Building Self-Confidence and Presence",
      "Effective Communication Strategies",
      "Leading Teams and Managing Conflict",
      "Decision-Making and Problem-Solving",
      "Creating Your Leadership Vision",
      "Networking and Building Relationships",
      "Sustaining Leadership Excellence",
    ],
    keyTakeaways: [
      "Develop a strong personal leadership style",
      "Master effective communication techniques",
      "Build confidence in decision-making",
      "Create and lead high-performing teams",
      "Navigate challenges with resilience",
      "Establish a clear leadership vision",
    ],
    whatYouLearn: [
      "Core leadership principles and frameworks",
      "Communication and influence strategies",
      "Team building and management skills",
      "Decision-making and problem-solving",
      "Personal development and growth",
      "Building lasting professional relationships",
    ],
  },
  "career-development-mastery": {
    id: "2",
    title: "Career Development Mastery",
    description:
      "Navigate your career path with confidence and strategic planning. Learn how to identify opportunities, negotiate effectively, and build a career that aligns with your values and goals.",
    author: {
      name: "Victoria Wilson",
      image: "/assets/images/team/victoria_wilson_project_manager.jpg",
    },
    pages: 312,
    readTime: "8-10 hours",
    rating: 4.9,
    reviews: 89,
    category: "Career",
    categoryColor: "#ec4899",
    coverImage: "/assets/images/books/book-cover-2.jpeg",
    pdfPath: "/assets/books/book-2.pdf",
    publishedDate: "2024",
    chapters: [
      "Career Assessment and Goal Setting",
      "Building Your Professional Brand",
      "Resume and LinkedIn Optimization",
      "Interview Mastery Techniques",
      "Salary Negotiation Strategies",
      "Building Strategic Networks",
      "Career Pivoting and Transitions",
      "Long-term Career Planning",
    ],
    keyTakeaways: [
      "Create a clear career development plan",
      "Master interview and negotiation skills",
      "Build a compelling professional brand",
      "Develop strategic networking abilities",
      "Navigate career transitions confidently",
    ],
    whatYouLearn: [
      "Career planning and goal setting",
      "Professional branding strategies",
      "Interview and negotiation techniques",
      "Networking and relationship building",
      "Career transition management",
    ],
  },
  "mentorship-excellence-a-guide-to-empowering-others": {
    id: "3",
    title: "Mentorship Excellence: A Guide to Empowering Others",
    description:
      "Learn to become an effective mentor and guide others on their journey. This book teaches you how to provide meaningful support, share wisdom, and create lasting impact in the lives of other women.",
    author: {
      name: "Gift Odey",
      image: "/assets/images/team/gift_odey_hr_administrative_manager.jpg",
    },
    pages: 198,
    readTime: "5-6 hours",
    rating: 4.7,
    reviews: 156,
    category: "Mentorship",
    categoryColor: "#10b981",
    coverImage: "/assets/images/books/book-cover-3.jpeg",
    pdfPath: "/assets/books/book-1.pdf",
    publishedDate: "2024",
    chapters: [
      "Foundations of Effective Mentorship",
      "Building Mentor-Mentee Relationships",
      "Active Listening and Communication",
      "Goal Setting and Accountability",
      "Providing Constructive Feedback",
      "Navigating Difficult Conversations",
      "Creating Mentorship Programs",
      "Sustaining Long-term Mentorship",
    ],
    keyTakeaways: [
      "Develop effective mentorship skills",
      "Build strong mentor-mentee relationships",
      "Master communication and feedback techniques",
      "Create structured mentorship programs",
      "Support mentees through challenges",
    ],
    whatYouLearn: [
      "Mentorship fundamentals and principles",
      "Relationship building techniques",
      "Communication and feedback skills",
      "Program development strategies",
      "Long-term mentorship sustainability",
    ],
  },
  "personal-branding-for-professional-women": {
    id: "4",
    title: "Personal Branding for Professional Women",
    description:
      "Build a powerful personal brand that opens doors and creates opportunities. Master the art of professional presence and learn how to craft your unique story.",
    author: {
      name: "Mercy Shamaki",
    },
    pages: 267,
    readTime: "7-9 hours",
    rating: 4.6,
    reviews: 203,
    category: "Branding",
    categoryColor: "#f59e0b",
    coverImage: "/assets/images/books/book-cover-4.jpeg",
    pdfPath: "/assets/books/book-2.pdf",
    publishedDate: "2024",
    chapters: [
      "Understanding Personal Branding",
      "Crafting Your Unique Story",
      "Building Your Online Presence",
      "Content Creation Strategies",
      "Networking and Relationship Building",
      "Maintaining Brand Consistency",
    ],
    keyTakeaways: [
      "Define your unique personal brand",
      "Create compelling brand messaging",
      "Build a strong online presence",
      "Develop content that reflects your brand",
      "Network effectively with your brand",
    ],
    whatYouLearn: [
      "Personal branding fundamentals",
      "Storytelling and messaging",
      "Online presence strategies",
      "Content creation techniques",
      "Brand consistency maintenance",
    ],
  },
  "financial-literacy-for-entrepreneurs": {
    id: "5",
    title: "Financial Literacy for Entrepreneurs",
    description:
      "Master financial management and build wealth as a female entrepreneur. Learn essential financial skills including budgeting, investing, and building sustainable business finances.",
    author: {
      name: "Cynthia Christopher",
    },
    pages: 389,
    readTime: "10-12 hours",
    rating: 4.9,
    reviews: 67,
    category: "Finance",
    categoryColor: "#8b5cf6",
    coverImage: "/assets/images/books/book-cover-5.jpg",
    pdfPath: "/assets/books/book-1.pdf",
    publishedDate: "2024",
    chapters: [
      "Financial Fundamentals",
      "Budgeting and Cash Flow Management",
      "Understanding Business Finances",
      "Investment Strategies",
      "Tax Planning and Compliance",
      "Building Long-term Wealth",
      "Financial Risk Management",
      "Scaling Your Financial Success",
    ],
    keyTakeaways: [
      "Master financial planning basics",
      "Create effective budgets",
      "Understand investment options",
      "Navigate tax obligations",
      "Build sustainable financial habits",
    ],
    whatYouLearn: [
      "Financial planning fundamentals",
      "Budgeting and cash flow",
      "Investment strategies",
      "Tax planning and compliance",
      "Wealth building techniques",
    ],
  },
  "public-speaking-and-communication-mastery": {
    id: "6",
    title: "Public Speaking and Communication Mastery",
    description:
      "Overcome fear and master the art of confident public speaking. Transform your communication skills and presence with proven techniques and strategies.",
    author: {
      name: "Treasure Babalola",
    },
    pages: 223,
    readTime: "6-7 hours",
    rating: 4.8,
    reviews: 145,
    category: "Communication",
    categoryColor: "#ef4444",
    coverImage: "/assets/images/books/book-cover-6.jpg",
    pdfPath: "/assets/books/book-2.pdf",
    publishedDate: "2024",
    chapters: [
      "Overcoming Speaking Anxiety",
      "Structuring Your Presentation",
      "Engaging Your Audience",
      "Body Language and Presence",
      "Handling Q&A Sessions",
      "Virtual Presentation Skills",
      "Building Confidence",
    ],
    keyTakeaways: [
      "Overcome public speaking anxiety",
      "Structure compelling presentations",
      "Engage and connect with audiences",
      "Use body language effectively",
      "Handle difficult questions confidently",
    ],
    whatYouLearn: [
      "Anxiety management techniques",
      "Presentation structuring",
      "Audience engagement strategies",
      "Body language mastery",
      "Q&A handling skills",
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BookDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const book = books[slug];

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#3a225c]">
      <Navigation />

      {/* Hero Section */}
      <BookDetailHero
        title={book.title}
        description={book.description}
        author={book.author}
        pages={book.pages}
        readTime={book.readTime}
        rating={book.rating}
        reviews={book.reviews}
        category={book.category}
        categoryColor={book.categoryColor}
        coverImage={book.coverImage}
        pdfPath={book.pdfPath}
        publishedDate={book.publishedDate}
      />

      {/* Main Content Section */}
      <section className="py-10 md:py-20 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
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
                  {book.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#fc98ac] flex-shrink-0 mt-0.5" />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Key Takeaways */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Key Takeaways
                </h2>
                <ul className="space-y-3">
                  {book.keyTakeaways.map((takeaway, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-white/80"
                    >
                      <span className="text-[#fc98ac]">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* Table of Contents */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Table of Contents
                </h2>
                <div className="space-y-3">
                  {book.chapters.map((chapter, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#fc98ac]/20 flex items-center justify-center text-[#fc98ac] font-bold">
                          {index + 1}
                        </div>
                        <p className="text-white/90 font-medium">{chapter}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Book Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <BookOpen className="w-5 h-5 text-[#fc98ac]" />
                    <span>{book.pages} pages</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="w-5 h-5 text-[#fc98ac]" />
                    <span>{book.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Star className="w-5 h-5 text-[#f9f871] fill-[#f9f871]" />
                    <span>
                      {book.rating} ({book.reviews} reviews)
                    </span>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/60 mb-1">Published</p>
                    <p className="text-white font-semibold">
                      {book.publishedDate}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
