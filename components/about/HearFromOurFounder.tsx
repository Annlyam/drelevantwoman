"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HearFromOurFounder() {
  return (
    <section className="py-5 md:py-20 bg-[#3a225c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-4 md:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-center md:text-left text-2xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Hear from the <span className="text-[#f9f871]">Founder</span>
            </h2>

            <div className="space-y-6">
              <motion.p
                className="text-base md:text-2xl text-white/90 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                &quot;Every young woman has within her the power to transform
                not just her own life, but the world around her. At The Relevant
                Woman, we don&apos;t just believe in your potential—we&apos;re
                committed to helping you unlock it.&quot;
              </motion.p>

              <motion.p
                className="text-base md:text-lg text-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Our mission is to create a community where ambition meets
                opportunity, where dreams are not just encouraged but actively
                supported. We&apos;ve seen firsthand how mentorship, leadership
                development, and genuine community can change the trajectory of
                a young woman&apos;s life.
              </motion.p>

              <motion.p
                className="text-base md:text-lg text-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                When you join The Relevant Woman, you&apos;re not just joining
                an organization—you&apos;re becoming part of a movement. A
                movement that believes in your ability to lead, to inspire, and
                to create lasting change. Together, we are building a future
                where every young woman knows her worth and has the tools to
                achieve her greatest aspirations.
              </motion.p>
            </div>

            {/* Founder Name */}
            <motion.div
              className="pt-6 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-white/60 text-sm mb-1">Founder</p>
              <p className="text-2xl font-bold text-white">Iveren Ann Lyam</p>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/team/iveren_ann_lyam_founder_the_relevant_woman.jpg"
                alt="Iveren Ann Lyam - Founder of The Relevant Woman"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a225c]/60 via-transparent to-transparent" />
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#f9f871]/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
