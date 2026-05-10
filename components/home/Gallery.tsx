"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    title: "Collaborative Learning",
    description: "Young women working together on projects",
    overlay: false,
    imageUrl: "/assets/images/extras/collaborative_learning.jpg",
  },
  {
    id: 2,
    title: "Empowerment Workshop",
    description: "Leadership training session in progress",
    overlay: false,
    overlayText: "Building Tomorrow's Leaders",
    imageUrl: "/assets/images/extras/empowerment_workshop.jpg",
  },
  {
    id: 3,
    title: "Mentorship Session",
    description: "One-on-one guidance and support",
    overlay: false,
    imageUrl: "/assets/images/extras/mentorship_session.jpg",
  },
  {
    id: 4,
    title: "Network Event",
    description: "Community gathering and networking",
    overlay: false,
    overlayText: "Connecting Women, Creating Impact",
    imageUrl: "/assets/images/extras/network_event.jpg",
  },
];

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-10 md:py-20 bg-[#3a225c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8  md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Exploring the Boundaries of{" "}
              <span className="text-[#f9f871]">Imagination</span>
            </h2>
            <div className="w-3 h-3 bg-[#f9f871] rotate-45" />
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#914177] to-[#fc98ac]">
                <div className="w-full h-full flex items-center justify-center text-white/30">
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Overlay */}
              {image.overlay && (
                <motion.div
                  className={`absolute inset-0 flex flex-col items-center justify-center p-6`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      hoveredId === image.id ? 1 : image.id === 2 ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className={`text-2xl md:text-3xl font-bold mb-3 text-white`}
                  >
                    {image.overlayText}
                  </h3>
                  <p className={`text-center text-gray-300`}>
                    {image.description}
                  </p>
                </motion.div>
              )}

              {/* Hover Overlay for non-overlay images */}
              {!image.overlay && (
                <motion.div
                  className="absolute inset-0 bg-[rgba(73,50,106,0.8)] flex flex-col items-center justify-center p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredId === image.id ? 1 : 0,
                    y: hoveredId === image.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 text-center">
                    {image.description}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
