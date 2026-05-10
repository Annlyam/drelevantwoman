import { Metadata } from "next";
import { generateEventsPageMetadata } from "./metadata";

export const metadata: Metadata = generateEventsPageMetadata();

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
