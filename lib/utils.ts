/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Compatibility helper: prefer `isFeatured`, fall back to legacy `featured`.
 */
export function getIsFeatured(event: any): boolean {
  return (event?.isFeatured ?? event?.featured ?? false) as boolean;
}

/**
 * Determine if an event is upcoming or past based on current date/time
 */
export function getEventStatus(
  eventDate: string,
  eventTime: string
): "upcoming" | "past" {
  const now = new Date();
  const eventDateTime = new Date(`${eventDate}T${eventTime}`);
  return eventDateTime > now ? "upcoming" : "past";
}

/**
 * Check if event is in the past
 */
export function isEventPast(eventDate: string, eventTime: string): boolean {
  return getEventStatus(eventDate, eventTime) === "past";
}

/**
 * Check if event is upcoming
 */
export function isEventUpcoming(eventDate: string, eventTime: string): boolean {
  return getEventStatus(eventDate, eventTime) === "upcoming";
}
