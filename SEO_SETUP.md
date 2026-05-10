# SEO Setup Guide for The Relevant Woman

## ✅ Completed SEO Implementations

### 1. **Meta Tags (app/layout.tsx)**

- ✅ Comprehensive title with template support
- ✅ Detailed meta description
- ✅ Relevant keywords for women empowerment
- ✅ Author, creator, and publisher information
- ✅ Canonical URLs
- ✅ Theme color and mobile app settings

### 2. **Open Graph Tags (Social Media)**

- ✅ Open Graph title, description, and images
- ✅ Multiple image sizes (1200x630 for standard, 1200x1200 for square)
- ✅ Site name and URL configuration
- ✅ Proper locale settings

### 3. **Twitter Card Tags**

- ✅ Summary large image card
- ✅ Twitter handle configuration
- ✅ Optimized images for Twitter sharing

### 4. **Structured Data (JSON-LD)**

- ✅ Organization schema
- ✅ Contact information
- ✅ Social media profiles
- ✅ Area served and expertise

### 5. **Technical SEO Files**

- ✅ robots.txt (search engine crawling rules)
- ✅ sitemap.xml (site structure for search engines)
- ✅ site.webmanifest (PWA support)

## 📋 Required Images to Create

You need to create the following images for optimal social media sharing:

### 1. **Open Graph Image (Primary)**

- **Path:** `/public/assets/images/og-image.jpg`
- **Dimensions:** 1200x630 pixels
- **Format:** JPG or PNG
- **Content:** Should include:
  - The Relevant Woman logo
  - Tagline: "Empowering Young Women Forward"
  - Brand colors (#3a225c, #f9f871)
  - Professional, inspiring imagery

### 2. **Open Graph Square Image**

- **Path:** `/public/assets/images/og-image-square.jpg`
- **Dimensions:** 1200x1200 pixels
- **Format:** JPG or PNG
- **Content:** Square version of the OG image for platforms that prefer square images

### 3. **Favicon Files**

Create these favicon files in `/public/`:

- `favicon.ico` (16x16, 32x32, 48x48)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `safari-pinned-tab.svg`

## 🔧 Environment Variables

Add to your `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://therelevantwoman.com
```

## 📝 Additional SEO Recommendations

### 1. **Page-Specific Metadata**

Each page should export its own metadata. Example for `app/about/page.tsx`:

```typescript
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The Relevant Woman's mission, vision, and the team behind empowering young women.",
  openGraph: {
    title: "About Us | The Relevant Woman",
    description:
      "Learn about The Relevant Woman's mission, vision, and the team behind empowering young women.",
    images: ["/assets/images/about-og.jpg"],
  },
};
```

### 2. **Blog Post SEO**

For blog posts (`app/blog/[slug]/page.tsx`), add:

- Dynamic metadata based on post content
- Article schema (JSON-LD)
- Author information
- Publication dates
- Breadcrumb schema

### 3. **Image Optimization**

- Use Next.js `Image` component (already implemented)
- Add `alt` attributes to all images
- Use descriptive filenames
- Compress images before uploading

### 4. **Content SEO**

- Use semantic HTML (h1, h2, h3 hierarchy)
- Add internal linking between pages
- Create a blog with regular, quality content
- Use descriptive URLs (already implemented with slugs)

### 5. **Performance SEO**

- Ensure fast page load times
- Optimize images (Next.js Image component helps)
- Minimize JavaScript bundles
- Use lazy loading for below-the-fold content

### 6. **Accessibility (SEO Factor)**

- Add ARIA labels where needed
- Ensure proper heading hierarchy
- Maintain good color contrast
- Add skip navigation links

## 🔍 SEO Testing Tools

Test your SEO implementation with:

1. **Google Search Console** - Monitor search performance
2. **Google Rich Results Test** - Test structured data
3. **Facebook Sharing Debugger** - Test Open Graph tags
4. **Twitter Card Validator** - Test Twitter cards
5. **PageSpeed Insights** - Test page performance
6. **Lighthouse** - Comprehensive SEO audit

## 📊 Next Steps

1. Create the required OG images
2. Create favicon files
3. Set up Google Search Console
4. Submit sitemap to Google Search Console
5. Add page-specific metadata to each route
6. Set up analytics (Google Analytics 4)
7. Create a blog content strategy
8. Build backlinks through partnerships

## 🌐 Social Media Handles

Update the social media URLs in `app/layout.tsx` (line 85-90) with your actual social media profiles:

- Facebook
- Instagram
- Twitter/X
- LinkedIn

## 📧 Contact Email

Update the contact email in `app/layout.tsx` (line 91) with your actual email address.
