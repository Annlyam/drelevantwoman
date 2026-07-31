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

import { client } from "@/sanity/lib/client";
import { getTeamQuery, getEventsQuery } from "@/sanity/lib/queries";
import staticTeamMembers from "@/lib/data/teamData.json";
import staticEventData from "@/lib/data/eventData.json";

export default async function Home() {
  let teamMembers = staticTeamMembers;
  let events = staticEventData;

  try {
    const sanityTeam = await client.fetch(getTeamQuery);
    if (sanityTeam && sanityTeam.length > 0) {
      teamMembers = sanityTeam;
    }
    
    const sanityEvents = await client.fetch(getEventsQuery);
    if (sanityEvents && sanityEvents.length > 0) {
      events = sanityEvents.map((e: any) => ({
        ...e,
        date: e.date ? e.date.split("T")[0] : "",
        time: e.date ? e.date.split("T")[1]?.slice(0, 5) : "",
        registered: e.registeredCount,
        id: e.slug || e.id,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch data from Sanity:", error);
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <Stats />
      <Marquee />
      <Journey />
      <Gallery />
      <FeaturedEvents events={events} />
      <Pillars />
      <Testimonials />
      {/* <Partners /> */}
      <Team teamMembers={teamMembers} />
      <Newsletter />
      <Footer />
    </main>
  );
}
