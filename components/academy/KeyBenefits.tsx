"use client";

import { motion } from "framer-motion";
import { Video, Users, Clock } from "lucide-react";

const benefits = [
  {
    icon: Video,
    title: "Quality Products",
    description:
      "Curated selection of premium products designed to empower and inspire",
    color: "bg-[#fc98ac]/20",
    iconColor: "text-[#fc98ac]",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Products chosen by and for our community of ambitious women",
    color: "bg-[#f9f871]/20",
    iconColor: "text-[#f9f871]",
  },
  {
    icon: Clock,
    title: "Fast Shipping",
    description: "Quick and reliable delivery to get your products to you fast",
    color: "bg-[#ffbc5c]/20",
    iconColor: "text-[#ffbc5c]",
  },
];

export default function KeyBenefits() {
  return (
    <section className="py-16 bg-[#3a225c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className={`w-20 h-20 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`w-10 h-10 ${benefit.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/70">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
