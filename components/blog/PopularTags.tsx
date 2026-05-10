"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const popularTags = [
  {
    name: "Leadership",
    image: "/assets/images/extras/collaborative_learning.jpg",
  },
  { name: "Mentorship", image: "/assets/images/extras/mentorship_session.jpg" },
  { name: "Career", image: "/assets/images/extras/empowerment_workshop.jpg" },
  { name: "Community", image: "/assets/images/extras/network_event.jpg" },
  { name: "Growth", image: "/assets/images/extras/collaborative_learning.jpg" },
  { name: "Success", image: "/assets/images/extras/empowerment_workshop.jpg" },
];

export default function PopularTags() {
  return (
    <section className="py-0 bg-[#3a225c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h3
          className="text-xs uppercase tracking-wider text-white/80 mb-8 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Popular Tags
        </motion.h3>
        <div className="flex gap-5 md:gap-12 overflow-x-auto pb-4 scrollbar-hide">
          {popularTags.map((tag, index) => (
            <motion.div
              key={tag.name}
              className="flex-shrink-0 relative w-36 h-36 rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <Image
                src={tag.image}
                alt={tag.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a225c]/95 via-[#3a225c]/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-white font-bold text-sm drop-shadow-lg">
                  {tag.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
