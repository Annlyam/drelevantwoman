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
