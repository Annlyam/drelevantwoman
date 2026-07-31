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

import { client } from "@/sanity/lib/client";
import { getEventsQuery } from "@/sanity/lib/queries";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getEventData(id: string): Promise<Event | undefined> {
  try {
    const sanityEvents = await client.fetch(getEventsQuery);
    if (sanityEvents && sanityEvents.length > 0) {
      const mappedEvents = sanityEvents.map((e: any) => ({
        ...e,
        date: e.date ? e.date.split("T")[0] : "",
        time: e.date ? e.date.split("T")[1]?.slice(0, 5) : "",
        registered: e.registeredCount,
        id: e.slug || e.id,
      }));
      const sanityEvent = mappedEvents.find((e: Event) => e.id === id);
      if (sanityEvent) return sanityEvent;
    }
  } catch (error) {
    console.error("Failed to fetch events from Sanity:", error);
  }
  
  const events = eventData as Event[];
  return events.find((e) => e.id === id);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventData(id);

  if (!event) {
    return {
      title: "Event Not Found | The Relevant Woman",
    };
  }

  return generateEventDetailMetadata(event);
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = await getEventData(id);

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
