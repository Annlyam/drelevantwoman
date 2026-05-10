"use client";

import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import Team from "@/components/home/Team";
import AboutHero from "@/components/about/AboutHero";
import HearFromOurFounder from "@/components/about/HearFromOurFounder";
import AboutUs from "@/components/about/AboutUs";
import VisionMission from "@/components/about/VisionMission";

export default function About() {
  const coreValues = [
    { name: "Leadership" },
    { name: "Faith" },
    { name: "Purpose" },
    { name: "Integrity" },
    { name: "Excellence" },
  ];

  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />

      <AboutHero
        title="About"
        titleAccent="Us"
        accentColor="#fce698"
        overlayColor="rgba(44,25,71,0.87)"
      />

      <HearFromOurFounder />

      <AboutUs
        sectionLabel="About Us"
        title="Empowering Women to"
        titleAccent="Shape Tomorrow"
        description="The Relevant Woman is a transformative community dedicated to empowering young women through comprehensive mentorship, leadership development, and professional growth opportunities. We provide a supportive network where ambitious women can connect, learn, and thrive while building meaningful careers and making lasting impact in their communities and beyond."
        image={{
          src: "/assets/images/hero/young_women_relev_x.jpg",
          alt: "The Relevant Woman Community",
        }}
        statisticBox={{
          number: "855",
          suffix: "+",
          label: "WOMEN EMPOWERED",
        }}
        coreValues={coreValues}
        showAsterisk={false}
      />

      <VisionMission
        vision={{
          title: "Our",
          titleAccent: "Vision",
          description:
            "A community of resilient young women, inspired by greatness, actively shaping and influencing culture across various spheres of society.",
        }}
        mission={{
          title: "Our",
          titleAccent: "Mission",
          description:
            "To Train young women to aim for more and help them discover their unlimited potential and pursue their dreams without fear.",
        }}
      />

      <Team />

      <Footer />
    </main>
  );
}
