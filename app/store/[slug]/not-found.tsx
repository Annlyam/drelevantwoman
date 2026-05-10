import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#3a225c] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white/80 mb-4">
          Product Not Found
        </h2>
        <p className="text-white/60 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/store"
          className="inline-block px-6 py-3 bg-[#fc98ac] text-white rounded-lg font-semibold hover:bg-[#fc98ac]/80 transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
}
