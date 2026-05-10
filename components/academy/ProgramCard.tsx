"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, BarChart3, Star, Bookmark, ShoppingCart } from "lucide-react";
import { useCart } from "react-use-cart";
import { generateSlug } from "@/lib/utils";

export interface Program {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    image?: string;
  };
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  category: string;
  categoryColor: string;
  categoryIcon: string;
  image: string;
  featured?: boolean;
}

interface ProgramCardProps {
  program: Program;
  variant?: "default" | "featured";
  index?: number;
}

export default function ProgramCard({
  program,
  variant = "default",
  index = 0,
}: ProgramCardProps) {
  const { addItem, inCart } = useCart();
  const slug = generateSlug(program.title);
  const isInCart = inCart(program.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        id: program.id,
        name: program.title,
        price: program.price,
        image: program.image,
        slug: slug,
      },
      1
    );
  };

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/store/${slug}`}>
        <div className="bg-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-[#fc98ac]/50">
          {/* Category Header */}
          <div
            className="relative h-32 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: program.categoryColor }}
          >
            {/* Program Image Background */}
            <div className="absolute inset-0">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="absolute top-3 right-3 z-10">
              <Bookmark className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4 bg-[#3a225c]">
            {/* Title */}
            <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-[#fc98ac] transition-colors">
              {program.title}
            </h3>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                <span>{program.level}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(program.rating)
                        ? "fill-[#f9f871] text-[#f9f871]"
                        : "fill-none text-white/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/80">
                {program.rating} ({program.reviews})
              </span>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                {program.instructor.image ? (
                  <Image
                    src={program.instructor.image}
                    alt={program.instructor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#f9f871] flex items-center justify-center text-[#3A225C] text-xs font-bold">
                    {program.instructor.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-sm text-white/70 flex-1">
                {program.instructor.name}
              </span>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#f9f871]">
                  ${program.price}
                </span>
                {program.originalPrice && (
                  <span className="text-sm text-white/50 line-through">
                    ${program.originalPrice}
                  </span>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  isInCart
                    ? "bg-white/10 text-white/50 cursor-not-allowed"
                    : "bg-[#f9f871] hover:bg-[#dbdb4a]/80 text-[#3A225C]"
                }`}
                type="button"
                aria-label={isInCart ? "Already in cart" : "Add to cart"}
              >
                {isInCart ? (
                  "In Cart"
                ) : (
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
