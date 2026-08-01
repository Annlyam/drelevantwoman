import { groq } from 'next-sanity'

export const getTeamQuery = groq`
  *[_type == "teamMember"] | order(hierarchy asc) {
    name,
    role,
    "image": image.asset->url,
    bio,
    featured,
    hierarchy,
    "social": {
      "linkedin": socialLinks.linkedin,
      "instagram": socialLinks.instagram,
      "twitter": socialLinks.twitter
    }
  }
`

export const getEventsQuery = groq`
  *[_type == "event"] | order(date desc) {
    "id": slug.current,
    "_id": _id,
    title,
    "slug": slug.current,
    date,
    endTime,
    venue,
    location,
    zoomLink,
    category,
    capacity,
    registeredCount,
    isFeatured,
    hidden,
    status,
    price,
    currency,
    tags,
    registrationEndDate,
    "image": image.asset->url,
    description
  }
`

export const getBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    author,
    publishedAt,
    "mainImage": mainImage.asset->url,
    excerpt,
    content
  }
`

export const getAcademyItemsQuery = groq`
  *[_type == "academyItem"] | order(_createdAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    type,
    author,
    description,
    "coverImage": coverImage.asset->url,
    price,
    isFree,
    downloadUrl
  }
`

export const getStoreProductsQuery = groq`
  *[_type == "storeProduct"] | order(_createdAt desc) {
    "id": _id,
    name,
    "slug": slug.current,
    description,
    price,
    category,
    "images": images[].asset->url,
    stock,
    isAvailable
  }
`
