import Link from "next/link";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#3a225c]">
      <Navigation />
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Blog Post Not Found
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            The blog post you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-4 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#ffbc5c] transition-colors duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
