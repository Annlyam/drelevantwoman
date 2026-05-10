# Setup Instructions

## Installation

1. Install dependencies:

```bash
npm install
```

This will install:

- `framer-motion` - For animations
- `lucide-react` - For icons
- `react-hook-form` - For form handling

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  ├── page.tsx              # Home page
  ├── about/page.tsx        # About page (placeholder)
  ├── academy/page.tsx      # Academy/Programs page (placeholder)
  ├── partnerships/page.tsx # Partnerships page (placeholder)
  ├── store/page.tsx        # Store page (placeholder)
  ├── media/page.tsx        # Media/Stories page (placeholder)
  ├── library/page.tsx      # Library page (placeholder)
  └── contact-us/page.tsx   # Contact page (placeholder)

components/
  ├── shared/
  │   ├── Navigation.tsx    # Main navigation component
  │   └── Footer.tsx        # Footer component
  └── home/
      ├── Hero.tsx          # Hero section
      ├── Stats.tsx         # Statistics section
      ├── Marquee.tsx       # Scrolling banner
      ├── Journey.tsx       # Journey/Process section
      ├── Gallery.tsx       # Image gallery
      ├── Pillars.tsx       # Services/Pillars section
      ├── Testimonials.tsx  # Testimonials section
      ├── Partners.tsx      # Partners section
      ├── Team.tsx          # Team section
      └── Newsletter.tsx    # Newsletter/CTA section
```

## Design System

### Colors

- Background: `#0a0f20` (deep black)
- Primary Text: `#c800de` (purple)
- Accent/Highlight: `#3e0660` (deep purple)
- Secondary Background: `#1a1a1a`
- Lime Green: `#aaff00` (for CTAs and highlights)

### Typography

- Font: Inter (loaded via Next.js)
- Responsive heading sizes
- Font weights: 300, 400, 700, 800

## Next Steps

1. Replace placeholder images with actual images
2. Update partner logos in the Partners section
3. Add real team member photos and information
4. Connect forms to backend/email service
5. Add actual content to placeholder pages
6. Optimize images using Next.js Image component
