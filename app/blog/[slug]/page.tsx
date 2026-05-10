"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import BlogDetailHero from "@/components/blog/BlogDetailHero";
import BlogContent from "@/components/blog/BlogContent";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail, Link2 } from "lucide-react";
import { generateSlug } from "@/lib/utils";

// Mock blog posts data - In production, this would come from a CMS or API
const blogPosts: Record<
  string,
  {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    author: {
      name: string;
      bio: string;
      image?: string;
    };
    date: string;
    readTime: string;
    tags: string[];
    heroImage: string;
    content: string[];
    bulletPoints?: string[];
    inlineImage?: {
      src: string;
      alt: string;
      credit?: string;
      creditLink?: string;
    };
    blockQuote?: {
      text: string;
    };
    highlightedSection?: {
      text: string;
    };
  }
> = {
  "the-trick-to-getting-more-done-is-to-have-the-freedom-to-pursue-your-passion":
    {
      id: 1,
      slug: "the-trick-to-getting-more-done-is-to-have-the-freedom-to-pursue-your-passion",
      title:
        "The trick to getting more done is to have the freedom to pursue your passion",
      excerpt:
        "As young women navigating the professional world, we often find ourselves juggling multiple responsibilities. The key to achieving more isn't about working harder—it's about creating space for what truly matters.",
      author: {
        name: "Iveren Ann Lyam & Victoria Wilson",
        bio: "Iveren Ann Lyam is the Founder of The Relevant Woman, dedicated to empowering young women through mentorship and leadership development. Victoria Wilson serves as Project Manager, bringing years of experience in community building and professional growth.",
      },
      date: "October 15, 2024",
      readTime: "5 min read",
      tags: ["Leadership", "Career", "Growth"],
      heroImage: "/assets/images/hero/young_women_relev_x.jpg",
      content: [
        "As young women navigating the professional world, we often find ourselves juggling multiple responsibilities. The key to achieving more isn't about working harder—it's about creating space for what truly matters. When you align your daily actions with your core values and passions, productivity becomes a natural byproduct of purpose-driven work.",
        "This article explores how successful women in our network have transformed their approach to work-life balance, finding freedom in structure and purpose in every task. We've compiled insights from over 100 women who have mastered the art of intentional living.",
        "The first step is understanding your core values. What truly matters to you? Is it family time, creative expression, professional growth, or community impact? Once you identify these values, you can begin to structure your day around activities that align with them.",
        "Many successful women in our community have found that the traditional 9-to-5 structure doesn't work for everyone. Some thrive with flexible schedules, while others prefer structured routines. The key is finding what works for you and your unique circumstances.",
      ],
      bulletPoints: [
        "Identify your core values and align daily tasks with them",
        "Set clear boundaries between work and personal time",
        "Learn to say no to opportunities that don't serve your goals",
        "Create a flexible schedule that works for your lifestyle",
        "Prioritize self-care and mental wellness",
        "Build a supportive network of like-minded women",
        "Celebrate small wins and progress along the way",
        "Regularly review and adjust your approach",
        "Seek mentorship from women who have achieved similar goals",
        "Remember that productivity is personal—what works for others may not work for you",
      ],
      blockQuote: {
        text: "Productivity is not about doing more—it's about doing what matters most with intention and purpose.",
      },
      inlineImage: {
        src: "/assets/images/extras/collaborative_learning.jpg",
        alt: "Women working collaboratively",
        credit: "The Relevant Woman",
      },
      highlightedSection: {
        text: "Remember: Freedom in your professional life comes from setting clear boundaries, prioritizing your values, and saying no to things that don't align with your goals. This isn't selfish—it's essential for sustainable success.",
      },
    },
  "ai-can-enhance-your-career-development-journey": {
    id: 2,
    slug: "ai-can-enhance-your-career-development-journey",
    title: "AI can enhance your career development journey",
    excerpt:
      "Discover how technology and artificial intelligence are revolutionizing mentorship and professional growth for women.",
    author: {
      name: "Solomon O. Olagoroye",
      bio: "Solomon O. Olagoroye is the IT, Media & Marketing specialist at The Relevant Woman, focusing on leveraging technology to empower women in their professional journeys.",
    },
    date: "October 12, 2024",
    readTime: "4 min read",
    tags: ["Tech", "Career"],
    heroImage: "/assets/images/extras/collaborative_learning.jpg",
    content: [
      "Technology and artificial intelligence are transforming how we approach career development and mentorship. For young women entering the workforce, understanding and leveraging these tools can be a game-changer in accelerating professional growth.",
      "AI-powered platforms are now making personalized mentorship more accessible than ever. These systems can match mentees with mentors based on career goals, industry experience, and learning styles, creating more meaningful connections.",
      "From resume optimization to interview preparation, AI tools are helping women present their best selves in professional settings. However, it's important to remember that technology should enhance, not replace, human connections and authentic networking.",
      "The future of work is increasingly digital, and women who embrace these tools early will have a significant advantage. But success comes from balancing technological efficiency with genuine human relationships and emotional intelligence.",
    ],
  },
};

// Related posts for "You might also like" section
const relatedPosts = [
  {
    id: 7,
    slug: "we-are-stronger-as-a-group",
    title: "We are stronger as a group than as individuals",
    excerpt:
      "The power of community and collaboration in achieving professional success.",
    author: "Cynthia Christopher",
    date: "October 3, 2024",
    readTime: "4 min read",
    tags: ["Community", "Growth"],
    image: "/assets/images/extras/network_event.jpg",
  },
  {
    id: 8,
    slug: "every-day-women-making-difference",
    title: "Every day, in every city, women are making a difference",
    excerpt:
      "Celebrating the daily impact of empowered women across various industries.",
    author: "Esther Terlumun",
    date: "October 1, 2024",
    readTime: "5 min read",
    tags: ["Impact", "Stories"],
    image: "/assets/images/extras/collaborative_learning.jpg",
  },
  {
    id: 9,
    slug: "world-is-one-big-family",
    title: "I believe the world is one big family of empowered women",
    excerpt:
      "Building global connections and fostering cross-cultural mentorship opportunities.",
    author: "Peter Ogar",
    date: "September 28, 2024",
    readTime: "6 min read",
    tags: ["Global", "Mentorship"],
    image: "/assets/images/extras/empowerment_workshop.jpg",
  },
  {
    id: 10,
    slug: "healthy-professional-life-starts-within",
    title: "A healthy professional life starts from within",
    excerpt: "Prioritizing mental health and wellness in your career journey.",
    author: "Mercy Shamaki",
    date: "September 25, 2024",
    readTime: "4 min read",
    tags: ["Wellness", "Career"],
    image: "/assets/images/extras/network_event.jpg",
  },
];

// Editor's picks for sidebar
const editorPicks = [
  {
    id: 4,
    slug: "ai-can-enhance-your-career-development-journey",
    title: "AI can enhance your career development journey",
    image: "/assets/images/extras/collaborative_learning.jpg",
  },
  {
    id: 5,
    slug: "healthy-professional-life-starts-within",
    title: "A healthy professional life starts from within",
    image: "/assets/images/extras/network_event.jpg",
  },
  {
    id: 6,
    slug: "new-era-in-leadership",
    title: "It's a new era in leadership, there are no rules",
    image: "/assets/images/extras/mentorship_session.jpg",
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedTitle = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <main className="min-h-screen bg-[#3a225c]">
      <Navigation />

      {/* Hero Section */}
      <BlogDetailHero
        title={post.title}
        excerpt={post.excerpt}
        tags={post.tags}
        author={post.author}
        date={post.date}
        readTime={post.readTime}
        heroImage={post.heroImage}
      />

      {/* Main Content Section */}
      <section className="py-10 md:py-20 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Article Content */}
            <div className="lg:col-span-2">
              <BlogContent
                content={post.content}
                bulletPoints={post.bulletPoints}
                inlineImage={post.inlineImage}
                blockQuote={post.blockQuote}
                highlightedSection={post.highlightedSection}
              />

              {/* Share Section */}
              <motion.div
                className="mt-12 pt-8 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-white/70 text-sm mb-4 font-semibold">
                  Share this article
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors duration-300"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors duration-300"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors duration-300"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={shareLinks.email}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors duration-300"
                    aria-label="Share via Email"
                  >
                    <Mail size={20} />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#f9f871] hover:text-[#3a225c] transition-colors duration-300"
                    aria-label="Copy link"
                  >
                    <Link2 size={20} />
                  </button>
                </div>
              </motion.div>

              {/* Member Discussion Section */}
              <motion.div
                className="mt-12 pt-8 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-white font-bold text-xl mb-4">
                  Member Discussion
                </h3>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <p className="text-white/70 text-sm mb-4">
                    Join the conversation and share your thoughts.
                  </p>
                  <button className="px-6 py-3 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#ffbc5c] transition-colors duration-300">
                    Add Comment
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar author={post.author} editorPicks={editorPicks} />
            </div>
          </div>
        </div>
      </section>

      {/* You Might Also Like Section */}
      <section className="py-10 md:py-20 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-xs uppercase tracking-wider text-white/80 mb-12 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            You Might Also Like
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPosts.map((post, index) => (
              <BlogPostCard
                key={post.id}
                post={{ ...post, slug: post.slug }}
                variant="medium"
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
