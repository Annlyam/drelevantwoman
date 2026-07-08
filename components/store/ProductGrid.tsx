"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PackageSearch, RefreshCw, SlidersHorizontal } from "lucide-react";
import ProductCard, { StoreProduct } from "./ProductCard";

type ProductsResponse =
  | StoreProduct[]
  | {
      products?: StoreProduct[];
      data?: StoreProduct[];
    };

const ALL_CATEGORIES = "All";

function normalizeProducts(payload: ProductsResponse): StoreProduct[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.products)) return payload.products;
  if (Array.isArray(payload.data)) return payload.data;
  return [];
}

function ProductSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <div className="aspect-[4/3] animate-pulse bg-white/10" />
      <div className="space-y-4 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-white/10" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
        </div>
        <div className="h-6 w-24 animate-pulse rounded bg-white/10" />
        <div className="h-12 w-full animate-pulse rounded-lg bg-white/10" />
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/products", {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            if (isMounted) setProducts([]);
            return;
          }

          throw new Error("Products could not be loaded right now.");
        }

        const payload = (await response.json()) as ProductsResponse;
        if (isMounted) setProducts(normalizeProducts(payload));
      } catch (loadError) {
        if (!isMounted) return;
        setProducts([]);
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Products could not be loaded right now."
        );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const productCategories = products
      .map((product) => product.category)
      .filter((category): category is string => Boolean(category));

    return [ALL_CATEGORIES, ...Array.from(new Set(productCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES) return products;

    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <section id="products" className="bg-[#3a225c] py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
              <SlidersHorizontal className="h-4 w-4 text-[#f9f871]" />
              Store catalogue
            </p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Browse Products
            </h2>
            <p className="mt-3 max-w-2xl text-white/70">
              Explore curated resources and products from The Relevant Woman.
            </p>
          </motion.div>

          {products.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isSelected = category === selectedCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isSelected
                        ? "bg-[#f9f871] text-[#3a225c]"
                        : "border border-white/15 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-14 text-center backdrop-blur-sm">
            <PackageSearch className="mx-auto mb-5 h-16 w-16 text-white/35" />
            <h3 className="text-2xl font-bold text-white">
              No products available yet
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-white/65">
              {error ||
                "Products will appear here once the store catalogue is connected by the backend team."}
            </p>
            {error && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#f9f871] px-5 py-3 font-bold text-[#3a225c] transition-colors hover:bg-[#f9f871]/90"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
