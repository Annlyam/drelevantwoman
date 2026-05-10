import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Marquee from "@/components/home/Marquee";
import Journey from "@/components/home/Journey";
import Gallery from "@/components/home/Gallery";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import Pillars from "@/components/home/Pillars";
import Testimonials from "@/components/home/Testimonials";
// import Partners from "@/components/home/Partners";
import Team from "@/components/home/Team";
import Newsletter from "@/components/home/Newsletter";
import Herov2 from "@/components/home/Herov2";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <Stats />
      <Marquee />
      <Journey />
      <Gallery />
      <FeaturedEvents />
      <Pillars />
      <Testimonials />
      {/* <Partners /> */}
      <Team />
      <Newsletter />
      <Footer />
    </main>
  );
}
