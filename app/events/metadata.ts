import { Metadata } from "next";
import { Event } from "@/components/events/EventCard";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://drelevantwoman.vercel.app";
const siteName = "The Relevant Woman";

export function generateEventsPageMetadata(): Metadata {
  return {
    title: "Events | The Relevant Woman",
    description:
      "Discover empowering events, workshops, and networking opportunities designed to inspire, educate, and connect. Join The Relevant Woman community for transformative experiences.",
    keywords: [
      "women events",
      "women empowerment events",
      "leadership workshops",
      "women networking events",
      "professional development events",
      "women mentorship programs",
      "women community events",
      "career development workshops",
      "women entrepreneurship events",
    ],
    openGraph: {
      title: "Events | The Relevant Woman",
      description:
        "Discover empowering events, workshops, and networking opportunities designed to inspire, educate, and connect.",
      url: `${siteUrl}/events`,
      siteName: siteName,
      images: [
        {
          url: "/assets/images/extras/empowerment_workshop.jpg",
          width: 1200,
          height: 630,
          alt: "The Relevant Woman Events - Empowering Women Through Events",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Events | The Relevant Woman",
      description:
        "Discover empowering events, workshops, and networking opportunities designed to inspire, educate, and connect.",
      images: ["/assets/images/extras/empowerment_workshop.jpg"],
      creator: "@therelevantwoman",
      site: "@therelevantwoman",
    },
    alternates: {
      canonical: `${siteUrl}/events`,
    },
  };
}

export function generateEventDetailMetadata(event: Event): Metadata {
  // Strip HTML tags from description for meta description
  const plainDescription = event.description
    .replace(/<[^>]*>/g, "")
    .replace(/\n/g, " ")
    .trim()
    .substring(0, 160);

  const eventUrl = `${siteUrl}/events/${event.id}`;
  const eventImage = event.image.startsWith("http")
    ? event.image
    : `${siteUrl}${event.image}`;

  // Format date for better display
  const eventDate = new Date(`${event.date}T${event.time}`);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    title: `${event.title} | The Relevant Woman Events`,
    description: plainDescription || `${event.title} - ${formattedDate} at ${event.venue}. ${event.category} event by The Relevant Woman.`,
    keywords: [
      event.title,
      event.category,
      ...(event.tags || []),
      "women events",
      "women empowerment",
      "The Relevant Woman",
    ],
    openGraph: {
      title: `${event.title} | The Relevant Woman`,
      description: plainDescription || `${event.title} - Join us on ${formattedDate} at ${event.venue}`,
      url: eventUrl,
      siteName: siteName,
      images: [
        {
          url: eventImage,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: plainDescription || `${event.title} - ${formattedDate} at ${event.venue}`,
      images: [eventImage],
      creator: "@therelevantwoman",
      site: "@therelevantwoman",
    },
    alternates: {
      canonical: eventUrl,
    },
  };
}

export function generateEventStructuredData(event: Event) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://drelevantwoman.vercel.app";
  const eventUrl = `${siteUrl}/events/${event.id}`;
  const eventImage = event.image.startsWith("http")
    ? event.image
    : `${siteUrl}${event.image}`;

  const startDate = new Date(`${event.date}T${event.time}`);
  const endDate = event.endTime
    ? new Date(`${event.date}T${event.endTime}`)
    : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description.replace(/<[^>]*>/g, "").substring(0, 500),
    image: eventImage,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      event.venue?.toLowerCase().includes("virtual") ||
      event.venue?.toLowerCase().includes("online")
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    location:
      event.venue?.toLowerCase().includes("virtual") ||
      event.venue?.toLowerCase().includes("online")
        ? {
            "@type": "VirtualLocation",
            url: event.website ? (event.website.startsWith("http") ? event.website : `https://${event.website}`) : eventUrl,
          }
        : {
            "@type": "Place",
            name: event.venue,
            address: {
              "@type": "PostalAddress",
              addressLocality: event.location,
            },
          },
    organizer: event.organizer
      ? {
          "@type": "Organization",
          name: event.organizer.name,
          email: event.organizer.contact,
        }
      : {
          "@type": "Organization",
          name: "The Relevant Woman",
          url: siteUrl,
        },
    offers: {
      "@type": "Offer",
      url: eventUrl,
      price: event.price === 0 ? "0" : event.price.toString(),
      priceCurrency: event.currency || "NGN",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
    category: event.category,
    ...(event.capacity && {
      maximumAttendeeCapacity: event.capacity,
    }),
  };
}
