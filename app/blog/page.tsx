"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import BlogHero from "@/components/blog/BlogHero";
import PopularTags from "@/components/blog/PopularTags";
import BlogPostCard from "@/components/blog/BlogPostCard";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import { client } from "@/sanity/lib/client";
import { getBlogPostsQuery } from "@/sanity/lib/queries";

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
  const [sanityPosts, setSanityPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await client.fetch(getBlogPostsQuery);
        if (posts && posts.length > 0) {
          setSanityPosts(posts);
        }
      } catch (error) {
        console.error("Failed to fetch blog posts from Sanity:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />

      <BlogHero />
      <PopularTags />

      {/* The Relevant Woman Magazine Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-[#3a225c] to-[#5b1364] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f9f871] rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fc98ac] rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="w-full md:w-1/3 flex justify-center relative z-10">
              <div className="w-64 h-80 bg-white rounded-xl shadow-xl overflow-hidden transform -rotate-3 transition-transform hover:rotate-0 duration-500 border-4 border-white">
                <img src="/assets/magazines/magazine_cover.jpg" alt="The Relevant Woman Magazine Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-white font-bold text-xl tracking-widest uppercase border-2 border-white px-4 py-2 opacity-0 hover:opacity-100 transition-opacity">Maiden Issue</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 text-center md:text-left relative z-10">
              <span className="inline-block px-4 py-1 bg-[#fc98ac]/20 text-[#fc98ac] rounded-full text-sm font-bold tracking-wider uppercase mb-4 border border-[#fc98ac]/30">Now Available</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">The Relevant Woman <span className="text-[#f9f871]">Magazine</span></h2>
              <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
                Get your hands on our highly anticipated Maiden Edition! Packed with exclusive interviews, leadership insights, and powerful stories from women making a difference.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href="/assets/magazines/TRW_Maiden_Magazine.pdf" 
                  download 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#f9f871] text-[#3a225c] font-bold rounded-xl hover:bg-[#ffbc5c] hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download Free Copy
                </a>
                <a 
                  href="/assets/magazines/TRW_Maiden_Magazine.pdf"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  Read Online
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's New, Editor's Choice, and Previous Posts sections removed per request */}

      {/* Newsletter CTA */}
      <section className="py-10 md:py-24 bg-[#3a225c]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <NewsletterSignup />
        </div>
      </section>

      <Footer />
    </main>
  );
}
