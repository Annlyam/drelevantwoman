import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import EventDetailHero from "@/components/events/EventDetailHero";
import EventDetailContent from "@/components/events/EventDetailContent";
import EventDetailSidebar from "@/components/events/EventDetailSidebar";
import { Event } from "@/components/events/EventCard";
import eventData from "@/lib/data/eventData.json";
import {
  generateEventDetailMetadata,
  generateEventStructuredData,
} from "../metadata";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const events = eventData as Event[];
  const event = events.find((e) => e.id === id);

  if (!event) {
    return {
      title: "Event Not Found | The Relevant Woman",
    };
  }

  return generateEventDetailMetadata(event);
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const events = eventData as Event[];
  const event = events.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const structuredData = generateEventStructuredData(event);

  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Navigation />

      {/* Hero Section */}
      <EventDetailHero event={event} />

      {/* Main Content Section */}
      <section className="py-10 md:py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <EventDetailContent event={event} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <EventDetailSidebar event={event} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
