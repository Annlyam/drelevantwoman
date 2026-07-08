"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, PackageCheck } from "lucide-react";
import { useCart } from "react-use-cart";

export type StoreProduct = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  images?: string[];
  stock?: number;
  isAvailable?: boolean;
  currency?: string;
};

type ProductCardProps = {
  product: StoreProduct;
  index: number;
};

function formatPrice(price: number, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    return `$${price.toFixed(2)}`;
  }
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const image = product.image || product.images?.[0];
  const isAvailable = product.isAvailable !== false && product.stock !== 0;

  const handleAddToCart = () => {
    if (!isAvailable) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image,
      category: product.category,
    });
  };

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f9f871]/40 hover:bg-white/10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white/10">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <PackageCheck className="h-12 w-12 text-white/35" />
          </div>
        )}

        {product.category && (
          <span className="absolute left-4 top-4 rounded-full bg-[#3a225c]/85 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
            {product.category}
          </span>
        )}

        {!isAvailable && (
          <span className="absolute right-4 top-4 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-bold text-white">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-white/70">
          {product.description || "A curated item from The Relevant Woman."}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-xl font-bold text-[#f9f871]">
            {formatPrice(product.price, product.currency)}
          </p>
          {typeof product.stock === "number" && product.stock > 0 && (
            <p className="text-xs font-medium text-white/55">
              {product.stock} left
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#f9f871] px-4 py-3 font-bold text-[#3a225c] transition-colors hover:bg-[#f9f871]/90 disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/45"
        >
          <ShoppingBag className="h-5 w-5" />
          {isAvailable ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </motion.article>
  );
}
