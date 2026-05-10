import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";

export default function Partnerships() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <div className="pt-20 min-h-screen flex items-center justify-center bg-[#3a225c]">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Partnerships <span className="text-[#fc98ac]">Program</span>
          </h1>
          <p className="text-gray-400 text-lg">Coming soon...</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
