"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import BlogHero from "@/components/blog/BlogHero";
import PopularTags from "@/components/blog/PopularTags";
import BlogPostCard from "@/components/blog/BlogPostCard";
import NewsletterSignup from "@/components/blog/NewsletterSignup";

// Dummy blog posts related to The Relevant Woman themes
const blogPosts = {
  featured: {
    id: 1,
    title:
      "The trick to getting more done is to have the freedom to pursue your passion",
    excerpt:
      "As young women navigating the professional world, we often find ourselves juggling multiple responsibilities. The key to achieving more isn't about working harder—it's about creating space for what truly matters. When you align your daily actions with your core values and passions, productivity becomes a natural byproduct of purpose-driven work. This article explores how successful women in our network have transformed their approach to work-life balance, finding freedom in structure and purpose in every task. \n\nWe have compiled a list of 10 tips for you to get more done in your day-to-day life.",
    author: "Iveren Ann Lyam & Victoria Wilson",
    date: "October 15, 2024",
    readTime: "5 min read",
    tags: ["Leadership", "Career", "Growth"],
    image: "/assets/images/hero/young_women_relev_x.jpg",
  },
  sidebar: [
    {
      id: 2,
      title: "AI can enhance your career development journey",
      excerpt:
        "Discover how technology and artificial intelligence are revolutionizing mentorship and professional growth for women.",
      author: "Solomon O. Olagoroye",
      date: "October 12, 2024",
      readTime: "4 min read",
      tags: ["Tech", "Career"],
      image: "/assets/images/extras/collaborative_learning.jpg",
    },
    // {
    //   id: 3,
    //   title: "There are still many questions left to answer about leadership",
    //   excerpt:
    //     "Exploring the evolving landscape of women's leadership and the questions that shape our understanding of effective mentorship.",
    //   author: "Gift Odey",
    //   date: "October 10, 2024",
    //   readTime: "6 min read",
    //   tags: ["Leadership", "Mentorship"],
    //   image: "/assets/images/extras/empowerment_workshop.jpg",
    // },
  ],
  editorChoice: [
    {
      id: 4,
      title: "AI can enhance your career development journey",
      excerpt:
        "Discover how technology is transforming professional growth for women.",
      author: "Solomon O. Olagoroye",
      date: "October 12, 2024",
      readTime: "4 min read",
      tags: ["Tech", "Career"],
      image: "/assets/images/extras/collaborative_learning.jpg",
    },
    {
      id: 5,
      title: "A healthy professional life starts from within",
      excerpt:
        "Building resilience and confidence through self-care and community support.",
      author: "Mercy Shamaki",
      date: "October 8, 2024",
      readTime: "5 min read",
      tags: ["Wellness", "Community"],
      image: "/assets/images/extras/network_event.jpg",
    },
    {
      id: 6,
      title: "It's a new era in leadership, there are no rules",
      excerpt:
        "Breaking traditional barriers and redefining what it means to lead as a woman.",
      author: "Iveren Ann Lyam & Treasure Babalola",
      date: "October 5, 2024",
      readTime: "7 min read",
      tags: ["Leadership", "Innovation"],
      image: "/assets/images/extras/mentorship_session.jpg",
    },
  ],
  previous: [
    {
      id: 7,
      title: "We are stronger as a group than as individuals",
      excerpt:
        "The power of community and collaboration in achieving professional success and personal growth.",
      author: "Cynthia Christopher",
      date: "October 3, 2024",
      readTime: "4 min read",
      tags: ["Community", "Growth"],
      image: "/assets/images/extras/network_event.jpg",
    },
    {
      id: 8,
      title: "Every day, in every city, women are making a difference",
      excerpt:
        "Celebrating the daily impact of empowered women across various industries and communities.",
      author: "Esther Terlumun",
      date: "October 1, 2024",
      readTime: "5 min read",
      tags: ["Impact", "Stories"],
      image: "/assets/images/extras/collaborative_learning.jpg",
    },
    {
      id: 9,
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
      title: "A healthy professional life starts from within",
      excerpt:
        "Prioritizing mental health and wellness in your career journey.",
      author: "Mercy Shamaki",
      date: "September 25, 2024",
      readTime: "4 min read",
      tags: ["Wellness", "Career"],
      image: "/assets/images/extras/network_event.jpg",
    },
    {
      id: 11,
      title: "Everyone has a different life story worth sharing",
      excerpt:
        "The importance of diverse voices and experiences in our community.",
      author: "Favour Ogbonna",
      date: "September 22, 2024",
      readTime: "5 min read",
      tags: ["Stories", "Diversity"],
      image: "/assets/images/extras/collaborative_learning.jpg",
    },
    {
      id: 12,
      title: "Look at life with the eyes of possibility",
      excerpt:
        "Cultivating a growth mindset and embracing opportunities for transformation.",
      author: "Gift Ilogho",
      date: "September 20, 2024",
      readTime: "6 min read",
      tags: ["Growth", "Mindset"],
      image: "/assets/images/extras/mentorship_session.jpg",
    },
  ],
};

export default function Blog() {
  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />

      <BlogHero />
      <PopularTags />

      {/* What's New Section */}
      <section className="py-10 md:py-24 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-xs uppercase tracking-wider text-white/80 mb-12 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What&apos;s New?
          </motion.h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Post - Left Column */}
            <div className="lg:col-span-2">
              <BlogPostCard post={blogPosts.featured} variant="large" />
            </div>

            {/* Right Column - Newsletter & Sidebar Posts */}
            <div className="space-y-8">
              <NewsletterSignup />
              {blogPosts.sidebar.map((post, index) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  variant="small"
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Editor's Choice Section */}
      <section className="py-0 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xs uppercase tracking-wider text-white/80 mb-4 font-semibold">
              Editor&apos;s Choice
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Get started with our best stories
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {blogPosts.editorChoice.map((post, index) => (
              <BlogPostCard
                key={post.id}
                post={post}
                variant="editor"
                index={index}
              />
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <a
              href="#previous-posts"
              className="inline-flex items-center gap-2 text-[#f9f871] hover:text-[#ffbc5c] transition-colors duration-300 font-semibold text-lg group"
            >
              See all featured posts
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Previous Posts Section */}
      <section id="previous-posts" className="py-24 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-xs uppercase tracking-wider text-white/80 mb-12 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Previous Posts
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.previous.map((post, index) => (
              <BlogPostCard
                key={post.id}
                post={post}
                variant="medium"
                index={index}
              />
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <button className="px-10 py-4 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#ffbc5c] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Load more
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-10 md:py-24 bg-[#3a225c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <button className="px-12 py-6 bg-[#f9f871] text-[#3a225c] font-bold text-lg rounded-lg hover:bg-[#ffbc5c] transition-all duration-300 mb-4 shadow-xl hover:shadow-2xl hover:scale-105">
              Become a subscriber
            </button>
            <p className="text-white/80 text-base font-light">
              Get all the latest posts delivered straight to your inbox.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
