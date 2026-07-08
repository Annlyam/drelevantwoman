# Backend Developer's Guide to This Next.js Project

> You're a backend dev. You know Django, Express, Flask — things with URL files, views, controllers, and models.
> Next.js works **completely differently**. This guide maps what you already know to how this project works, so you can start contributing without confusion.

---

## Table of Contents

1. [The Big Picture: What Is Next.js?](#1-the-big-picture-what-is-nextjs)
2. [Folder Structure — The Full Map](#2-folder-structure--the-full-map)
3. [How Routing Works (No urls.py here)](#3-how-routing-works-no-urlspy-here)
4. [Where Data Lives (No Database... Yet)](#4-where-data-lives-no-database-yet)
5. [Components — The Building Blocks](#5-components--the-building-blocks)
6. [Server Components vs Client Components](#6-server-components-vs-client-components)
7. [Where To Put Backend Logic (API Routes)](#7-where-to-put-backend-logic-api-routes)
8. [Environment Variables](#8-environment-variables)
9. [How To Run The Project](#9-how-to-run-the-project)
10. [Step-by-Step: Adding a New Page](#10-step-by-step-adding-a-new-page)
11. [Step-by-Step: Adding an API Endpoint](#11-step-by-step-adding-an-api-endpoint)
12. [Common Patterns In This Project](#12-common-patterns-in-this-project)
13. [Quick Reference Cheat Sheet](#13-quick-reference-cheat-sheet)

---

## 1. The Big Picture: What Is Next.js?

Next.js is a **full-stack React framework**. Yes, full-stack — it handles both frontend AND backend in the same project.

| Backend concept you know | Next.js equivalent |
|---|---|
| `urls.py` / Express routes | **Folder names** inside `app/` |
| Views / Controllers | **`page.tsx`** files |
| API endpoints | **`route.ts`** files inside `app/api/` |
| Templates (HTML) | **JSX/TSX** (HTML written inside JavaScript) |
| Static files | **`public/`** folder |
| Models / Database | No database yet — data lives in **JSON files** in `lib/data/` |
| Middleware | **`middleware.ts`** at the project root |

**The key insight:** In Next.js, **the folder structure IS the routing**. There's no separate routing configuration file. If you create a folder called `app/about/`, the URL `/about` automatically exists.

---

## 2. Folder Structure — The Full Map

Here's every folder and what it does:

```
drelevantwoman/
│
├── app/                        # 🔴 THIS IS THE MAIN THING — all pages & routes live here
│   ├── layout.tsx              # Root layout — wraps EVERY page (like a base template)
│   ├── page.tsx                # Homepage (the "/" route)
│   ├── globals.css             # Global styles
│   ├── favicon.ico             # Site icon
│   │
│   ├── about/                  # → /about
│   │   ├── page.tsx            # The /about page
│   │   └── team/
│   │       └── page.tsx        # → /about/team
│   │
│   ├── academy/                # → /academy
│   │   ├── page.tsx            # The /academy page
│   │   ├── read/
│   │   │   └── page.tsx        # → /academy/read
│   │   └── [slug]/             # → /academy/anything-here (dynamic route)
│   │       ├── page.tsx        #   The actual page
│   │       └── not-found.tsx   #   Custom 404 for this route
│   │
│   ├── blog/                   # → /blog
│   │   ├── page.tsx
│   │   └── [slug]/             # → /blog/some-blog-post-title
│   │       ├── page.tsx
│   │       └── not-found.tsx
│   │
│   ├── events/                 # → /events
│   │   ├── page.tsx
│   │   ├── layout.tsx          # Layout only for /events/* pages
│   │   ├── metadata.ts         # SEO metadata helper for events
│   │   └── [id]/               # → /events/some-event-id
│   │       ├── page.tsx
│   │       ├── not-found.tsx
│   │       └── secure-a-slot/  # → /events/some-event-id/secure-a-slot
│   │           ├── page.tsx
│   │           └── not-found.tsx
│   │
│   ├── store/                  # → /store
│   │   ├── page.tsx
│   │   └── [slug]/             # → /store/some-product
│   │       ├── page.tsx
│   │       └── not-found.tsx
│   │
│   ├── become-a-member/        # → /become-a-member
│   │   └── page.tsx
│   ├── cart/                   # → /cart
│   │   └── page.tsx
│   ├── checkout/               # → /checkout
│   │   └── page.tsx
│   ├── contact-us/             # → /contact-us
│   │   └── page.tsx
│   ├── library/                # → /library
│   │   └── page.tsx
│   ├── media/                  # → /media
│   │   └── page.tsx
│   └── partnerships/           # → /partnerships
│       └── page.tsx
│
├── components/                 # 🟡 Reusable UI pieces (not pages, just parts of pages)
│   ├── shared/                 # Components used across multiple pages
│   │   ├── Navigation.tsx      #   The navbar
│   │   ├── Footer.tsx          #   The footer
│   │   ├── CartProvider.tsx    #   Shopping cart context/state
│   │   └── FloatingCartButton.tsx
│   ├── home/                   # Components only used on the homepage
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── Gallery.tsx
│   │   └── ... (10+ more)
│   ├── events/                 # Components only used on event pages
│   │   ├── EventCard.tsx
│   │   ├── EventDetailHero.tsx
│   │   └── ...
│   ├── blog/                   # Components only used on blog pages
│   ├── about/                  # Components only used on about pages
│   ├── academy/                # Components only used on academy pages
│   ├── store/                  # Components only used on store pages
│   └── team/                   # Components only used on team pages
│
├── lib/                        # 🟢 Utility code, data, and shared logic
│   ├── utils.ts                # Helper functions (e.g., generateSlug)
│   ├── featureFlags.ts         # Feature toggles (e.g., enableStoreCollections)
│   └── data/                   # Static data (this is where "the database" is right now)
│       ├── eventData.json      # All event data
│       ├── teamData.json       # All team member data
│       └── statsConfig.ts      # Stats configuration
│
├── public/                     # 🔵 Static files served as-is (images, robots.txt, etc.)
│   ├── assets/                 # Images, logos, etc.
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
│
├── next.config.ts              # Next.js configuration (redirects, rewrites, etc.)
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS config (used by Tailwind CSS)
├── eslint.config.mjs           # Linting rules
├── .env.local                  # Environment variables (DO NOT commit this)
└── .env.example                # Template for environment variables
```

### The rule is simple:

| You want to... | Put the file in... |
|---|---|
| Create a new page/URL | `app/your-page-name/page.tsx` |
| Create an API endpoint | `app/api/your-endpoint/route.ts` |
| Build a reusable UI component | `components/feature-name/ComponentName.tsx` |
| Add a utility/helper function | `lib/` |
| Add static data (JSON, etc.) | `lib/data/` |
| Add images/static assets | `public/assets/` |

---

## 3. How Routing Works (No urls.py here)

### The Golden Rule

**Folder name = URL path. The file called `page.tsx` inside that folder = the page that renders.**

```
app/about/page.tsx        →  yoursite.com/about
app/blog/page.tsx         →  yoursite.com/blog
app/events/page.tsx       →  yoursite.com/events
app/contact-us/page.tsx   →  yoursite.com/contact-us
```

That's it. No router config. No URL patterns. Just folders and files.

### Dynamic Routes (like `/events/:id` or `/blog/:slug`)

When you need a URL like `/events/event-123`, you use **square brackets** in the folder name:

```
app/events/[id]/page.tsx  →  yoursite.com/events/anything-goes-here
```

The `[id]` part becomes a variable. Inside the page, you access it like this:

```tsx
// app/events/[id]/page.tsx

interface PageProps {
  params: Promise<{ id: string }>;  // "id" matches the folder name [id]
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  // id = "event-123" if the URL was /events/event-123

  // Now use this id to look up the event data
  const event = events.find((e) => e.id === id);
}
```

**Django equivalent:**
```python
# This is conceptually what's happening:
# urlpatterns = [ path('events/<str:id>/', event_detail_view) ]
```

### Nested Routes

Folders nest = URLs nest:

```
app/events/[id]/secure-a-slot/page.tsx  →  /events/event-123/secure-a-slot
```

### Special Files in Each Route Folder

| File | Purpose |
|---|---|
| `page.tsx` | **Required.** The actual page content |
| `layout.tsx` | Wraps this page and all child pages (like a sub-template) |
| `not-found.tsx` | Custom 404 page for this route |
| `loading.tsx` | Loading spinner/skeleton while page loads |
| `error.tsx` | Error boundary — what to show if something crashes |
| `route.ts` | **API endpoint** (backend-only, no UI — explained in section 7) |

---

## 4. Where Data Lives (No Database... Yet)

Right now, this project has **NO database**. All data is hardcoded in two places:

### 1. JSON files in `lib/data/`

```
lib/data/eventData.json   ← All events
lib/data/teamData.json    ← All team members
```

Pages import and use them directly:

```tsx
import eventData from "@/lib/data/eventData.json";

const events = eventData as Event[];
const event = events.find((e) => e.id === id);
```

### 2. Hardcoded in page files

Some data (like blog posts) is currently defined directly inside the page file:

```tsx
// app/blog/[slug]/page.tsx — blog post data is just a big object at the top of the file
const blogPosts = {
  "my-blog-slug": {
    title: "...",
    content: ["..."],
    // ...
  },
};
```

### Where you come in as a backend developer

This is the **biggest opportunity** for a backend dev to contribute:

1. **Move data to a real database** (e.g., PostgreSQL, MongoDB, Supabase, or even a headless CMS)
2. **Create API routes** (see section 7) to fetch data instead of importing JSON
3. **Add authentication** (user login, member-only content)
4. **Add form handling** (contact forms, newsletter signups, event registrations)

---

## 5. Components — The Building Blocks

Components are reusable pieces of UI. Think of them like partial templates.

A component is just a function that returns HTML (JSX):

```tsx
// components/home/Stats.tsx
export default function Stats() {
  return (
    <section>
      <h2>Our Impact</h2>
      <p>5,000+ members</p>
    </section>
  );
}
```

Then a page uses it like this:

```tsx
// app/page.tsx (the homepage)
import Stats from "@/components/home/Stats";

export default function Home() {
  return (
    <main>
      <Stats />   {/* ← this renders the Stats component here */}
    </main>
  );
}
```

### The `@/` import alias

Everywhere in this project, you'll see imports starting with `@/`. This is an alias for the project root:

```tsx
import Navigation from "@/components/shared/Navigation";
// This means: drelevantwoman/components/shared/Navigation.tsx
```

This is configured in `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

---

## 6. Server Components vs Client Components

This is the most confusing part of Next.js for newcomers. Here's the simple version:

### Server Components (default)

- Run on the **server only** (like a Django view)
- Can directly read files, query databases, access secrets
- **Cannot** use browser features (onClick, useState, animations)
- Every component is a Server Component **by default**

```tsx
// This is a Server Component (no "use client" at the top)
export default async function EventDetailPage({ params }) {
  const { id } = await params;
  // Can do database queries here, read files, etc.
  return <div>Event {id}</div>;
}
```

### Client Components

- Run in the **browser** (like regular JavaScript)
- Can use interactivity: clicks, form state, animations
- Must have `"use client"` at the very top of the file

```tsx
"use client";  // ← This line makes it a Client Component

import { useState } from "react";

export default function EventsPage() {
  const [filter, setFilter] = useState("all");  // ← Interactive state
  // ...
}
```

### When to use which

| Scenario | Use |
|---|---|
| Fetching data from DB/API | Server Component |
| Displaying static content | Server Component |
| Handling clicks, forms, animations | Client Component (`"use client"`) |
| Using `useState`, `useEffect` | Client Component (`"use client"`) |

---

## 7. Where To Put Backend Logic (API Routes)

**This is the most important section for you.**

Next.js lets you create API endpoints alongside your pages. They work exactly like Express routes or Django API views.

### How to create one

Create a file called `route.ts` (not `page.tsx`) inside the `app/api/` folder:

```
app/api/events/route.ts      →  GET/POST  /api/events
app/api/events/[id]/route.ts  →  GET/PUT/DELETE  /api/events/123
app/api/newsletter/route.ts   →  POST  /api/newsletter
```

### Example: A Simple GET Endpoint

```ts
// app/api/events/route.ts
import { NextResponse } from "next/server";
import eventData from "@/lib/data/eventData.json";

// GET /api/events
export async function GET() {
  return NextResponse.json(eventData);
}
```

### Example: A POST Endpoint

```ts
// app/api/newsletter/route.ts
import { NextResponse } from "next/server";

// POST /api/newsletter
export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  // Validate
  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  // TODO: Save to database, send to email service, etc.

  return NextResponse.json(
    { message: "Successfully subscribed!" },
    { status: 201 }
  );
}
```

### Example: Dynamic Route with Params

```ts
// app/api/events/[id]/route.ts
import { NextResponse } from "next/server";
import eventData from "@/lib/data/eventData.json";

// GET /api/events/event-123
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = eventData.find((e: any) => e.id === id);

  if (!event) {
    return NextResponse.json(
      { error: "Event not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(event);
}
```

### Available HTTP Methods

Export any of these function names from `route.ts`:

```ts
export async function GET(request: Request) { }
export async function POST(request: Request) { }
export async function PUT(request: Request) { }
export async function PATCH(request: Request) { }
export async function DELETE(request: Request) { }
```

**That's literally it.** The function name = the HTTP method. No decorators, no `@app.route()`, no `urlpatterns`.

---

## 8. Environment Variables

Environment variables go in `.env.local` (never committed to git).

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://drelevantwoman.vercel.app
DATABASE_URL=postgresql://user:pass@host:5432/db
SECRET_API_KEY=my-secret-key
NEXT_PUBLIC_ENABLE_STORE_COLLECTIONS=true
```

### Important naming rule

| Prefix | Accessible where |
|---|---|
| `NEXT_PUBLIC_` | Both server AND browser (anyone can see these!) |
| No prefix | **Server only** — safe for secrets, API keys, DB credentials |

```ts
// ✅ Server-only (in route.ts or Server Components) - SAFE for secrets
const dbUrl = process.env.DATABASE_URL;

// ✅ Available everywhere (including the browser) - NOT for secrets
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
```

---

## 9. How To Run The Project

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Start the dev server
npm run dev

# 4. Open in browser
# → http://localhost:3000
```

The dev server has **hot reload** — save a file and the browser updates instantly.

---

## 10. Step-by-Step: Adding a New Page

Let's say you want to add a `/resources` page:

### Step 1: Create the folder and page file

```bash
mkdir -p app/resources
```

### Step 2: Create `app/resources/page.tsx`

```tsx
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#3a225c]">
      <Navigation />

      <section className="pt-32 pb-20 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white">Resources</h1>
        <p className="text-white/80 mt-4">Helpful resources for our community.</p>
      </section>

      <Footer />
    </main>
  );
}
```

### Step 3: Done!

Visit `http://localhost:3000/resources` — the page exists.

---

## 11. Step-by-Step: Adding an API Endpoint

Let's say you want to add `POST /api/contact` to handle contact form submissions:

### Step 1: Create the folder and route file

```bash
mkdir -p app/api/contact
```

### Step 2: Create `app/api/contact/route.ts`

```ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // TODO: Send email, save to DB, etc.
    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Step 3: Test it

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com", "message": "Hello!"}'
```

---

## 12. Common Patterns In This Project

### Pattern 1: Every page includes Navigation and Footer

```tsx
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";

export default function SomePage() {
  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />
      {/* Page content goes here */}
      <Footer />
    </main>
  );
}
```

### Pattern 2: Brand colors used everywhere

| Color | Hex | Usage |
|---|---|---|
| Deep purple | `#3a225c` | Background color |
| Yellow | `#f9f871` | Accent / CTAs |
| Pink | `#fc98ac` | Secondary accent |
| Orange | `#f68565` | Gradients |
| Orange-yellow | `#ffbc5c` | Hover states |

### Pattern 3: Feature flags

Feature flags control what's visible. Check `lib/featureFlags.ts`:

```ts
export const enableStoreCollections =
  process.env.NEXT_PUBLIC_ENABLE_STORE_COLLECTIONS === "true";
```

Used in pages like:

```tsx
{enableStoreCollections && <StoreCollectionSection />}
```

### Pattern 4: Dynamic routes load data from JSON by ID/slug

```tsx
import eventData from "@/lib/data/eventData.json";

const event = eventData.find((e) => e.id === id);
if (!event) notFound();  // shows the not-found.tsx page
```

---

## 13. Quick Reference Cheat Sheet

| I want to... | Do this |
|---|---|
| Create a page at `/xyz` | Create `app/xyz/page.tsx` |
| Create a dynamic page at `/xyz/:id` | Create `app/xyz/[id]/page.tsx` |
| Create an API endpoint | Create `app/api/xyz/route.ts` and export `GET`, `POST`, etc. |
| Add a reusable component | Create `components/feature-name/ComponentName.tsx` |
| Add a utility function | Add it to `lib/utils.ts` or create a new file in `lib/` |
| Add static data | Put JSON in `lib/data/` |
| Add images | Put them in `public/assets/` |
| Add an env variable (secret) | Add to `.env.local` WITHOUT `NEXT_PUBLIC_` prefix |
| Add an env variable (public) | Add to `.env.local` WITH `NEXT_PUBLIC_` prefix |
| Use interactivity (clicks, state) | Add `"use client"` at the top of the file |
| Run the dev server | `npm run dev` |
| Build for production | `npm run build` |

---

## Tech Stack Summary

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.1 | Full-stack React framework |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Framer Motion** | 11.x | Animations |
| **Deployed on** | Vercel | Hosting & CI/CD |

---

> **Bottom line:** Think of `app/` as your URL router, `components/` as your template partials, `lib/` as your utils and models, and `app/api/` as your backend views. The folder structure does the work that config files do in Django/Express.
