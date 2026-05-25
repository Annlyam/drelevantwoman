# The Relevant Woman — Official Website

<div align="center">

![The Relevant Woman](https://www.drelevantwoman.com/_next/image?url=%2Fassets%2Fimages%2Flogo%2Frellogo.png&w=384&q=75)

**Empowering young women through mentorship, leadership development, and community building.**

[![Live Site](https://img.shields.io/badge/Live%20Site-drelevantwoman.com-3a225c?style=for-the-badge&logo=vercel)](https://www.drelevantwoman.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)

</div>

---

## Table of Contents

- [About the Project](#about-the-project)
- [Live Site](#live-site)
- [Tech Stack](#tech-stack)
- [Pages & Features](#pages--features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Team](#team)
- [Contact](#contact)

---

## About the Project

**The Relevant Woman (TRW)** is a nonprofit organisation dedicated to empowering young women through mentorship, leadership training, community building, and networking opportunities. This repository contains the full source code for the official TRW website, which serves as the primary digital platform for:

- Showcasing programmes and the Academy
- Managing and registering members
- Promoting and registering for events
- Hosting a store for curated products
- Publishing blog content and success stories
- Connecting with mentors and the broader community

---

## Live Site

| Environment | URL |
|-------------|-----|
| **Production** | [https://www.drelevantwoman.com](https://www.drelevantwoman.com) |
| **Vercel Preview** | Auto-generated per Pull Request |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js](https://nextjs.org) (React) |
| **Styling** | CSS Modules / Tailwind CSS |
| **Hosting** | [Vercel](https://vercel.com) |
| **Database** | PostgreSQL (via Supabase) |
| **Authentication** | NextAuth.js |
| **Email** | Resend |
| **CMS** | Sanity |
| **Payments** *(Phase 2)* | Paystack (NG) · Stripe (International) |

---

## Pages & Features

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | ✅ Live |
| About | `/about` | ✅ Live |
| Team | `/about/team` | ✅ Live |
| Academy | `/academy` | 🔧 In Progress |
| Events | `/events` | 🔧 In Progress |
| Store | `/store` | 🔧 In Progress |
| Blog | `/blog` | 🔧 In Progress |
| Library | `/library` | 🔧 In Progress |
| Partnerships | `/partnerships` | 🔧 In Progress |
| Become a Member | `/become-a-member` | 🔧 In Progress |
| Contact | `/contact-us` | ✅ Live |
| Privacy Policy | `/privacy-policy` | ⏳ Planned |
| Terms of Service | `/terms-of-service` | ⏳ Planned |

**Legend:** ✅ Live · 🔧 In Progress · ⏳ Planned

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9+ or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Accept the contributor invite** sent to your GitHub email.

2. **Clone the repository:**
   ```bash
   git clone https://github.com/the-relevant-woman/website.git
   cd website
   ```

3. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your local values. See [Environment Variables](#environment-variables) for the full list.

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open in your browser:**
   ```
   http://localhost:3000
   ```

---

## Project Structure

```
/
├── public/
│   └── assets/
│       ├── images/          # All static images
│       └── fonts/           # Local fonts
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (home)/
│   │   ├── about/
│   │   ├── academy/
│   │   ├── events/
│   │   ├── store/
│   │   ├── blog/
│   │   ├── become-a-member/
│   │   └── contact-us/
│   ├── components/          # Reusable React components
│   │   ├── ui/              # Base UI elements (Button, Card, Input, etc.)
│   │   ├── layout/          # Navbar, Footer, Layout wrappers
│   │   └── sections/        # Page-level section components
│   ├── lib/                 # Utilities, helpers, constants
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles
│   └── api/                 # API route handlers
│       ├── members/
│       ├── events/
│       ├── products/
│       ├── contact/
│       └── newsletter/
├── docs/                    # Developer documentation
├── .env.example             # Environment variable template
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

---

## Contributing

All contributions go through a **branch → Pull Request → review → merge** workflow. **No one pushes directly to `main`.** Here's how to contribute:

### Step 1 — Accept Your Invite

You will receive a GitHub contributor invite via email. Accept it before you can push branches.

### Step 2 — Create Your Branch

Always branch off the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b fe1/your-feature-name   # use your assigned prefix
```

### Step 3 — Make Your Changes

Work on your assigned task. Commit frequently with clear messages (see [Commit Message Convention](#commit-message-convention) below).

### Step 4 — Push Your Branch

```bash
git push origin fe1/your-feature-name
```

### Step 5 — Open a Pull Request

Go to GitHub → open a Pull Request from your branch → targeting `main`. In the PR description, include:
- What was changed and why
- Screenshot or Vercel preview link (auto-generated by Vercel for every PR)
- Any related task/issue reference

### Step 6 — Wait for Review

The Project Manager will review your PR. You may be asked to make changes before it is merged. **Only the PM merges to `main`.**

---

## Branch Naming Convention

All branches must follow the format: `[role-prefix]/[short-description]`

| Role | Prefix | Example Branch |
|------|--------|---------------|
| Frontend Developer 1 | `fe1/` | `fe1/fix-hero-copy` |
| Frontend Developer 2 | `fe2/` | `fe2/store-product-grid` |
| Backend Developer 1 | `be1/` | `be1/member-registration-api` |
| Backend Developer 2 | `be2/` | `be2/events-api` |

**Rules:**
- Use lowercase and hyphens — no spaces, no underscores
- Be specific: `fe1/fix-stats-counter` ✅ · `fe1/fix` ❌
- One feature or fix per branch — do not bundle unrelated changes

---

## Commit Message Convention

Every commit must follow this structure:

```
[type]: short description in present tense (max 72 chars)
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | A new feature or piece of functionality |
| `fix` | A bug fix or broken behaviour corrected |
| `style` | CSS/visual changes only — no logic change |
| `refactor` | Code restructured, same behaviour |
| `chore` | Config, tooling, dependency updates |
| `docs` | Documentation or README changes |
| `test` | Adding or updating tests |

### Examples

```bash
feat: add animated stats counter to homepage hero section
fix: correct canonical URL from vercel.app to drelevantwoman.com
feat: build store product grid with category filter tabs
fix: countdown timer now displays "Event Ended" for past events
feat: POST /api/members endpoint with validation and database write
chore: install and configure Resend email SDK
style: update membership form layout for mobile responsiveness
fix: unify blog route — resolve /blog vs /media conflict
docs: add payment integration guide to /docs folder
feat: build cart drawer and checkout UI scaffold for Phase 2
```

---

## Pull Request Process

1. Ensure your branch is up to date with `main` before opening a PR:
   ```bash
   git checkout main && git pull
   git checkout your-branch
   git merge main
   ```
2. Resolve any conflicts before pushing
3. Include a Vercel preview link in your PR description (Vercel generates one automatically)
4. Tag the Project Manager as reviewer
5. Do not merge your own PR — wait for PM approval
6. After merging, delete your branch to keep the repo clean

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values below. **Never commit `.env.local` to the repository.**

```env
# App
NEXT_PUBLIC_SITE_URL=https://www.drelevantwoman.com

# Database
DATABASE_URL=

# Authentication (NextAuth.js)
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Email (Resend)
RESEND_API_KEY=
EMAIL_FROM=noreply@drelevantwoman.com
ADMIN_EMAIL=therelevantw@gmail.com

# CMS (Sanity)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Newsletter (Mailchimp / Brevo)
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=

# Payments — Phase 2
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_PUBLIC_KEY=
STRIPE_WEBHOOK_SECRET=
```

Contact the Project Manager to receive the values for shared environments.

---

## Deployment

The site is deployed on **Vercel** and connected to this GitHub repository.

| Trigger | Environment | URL |
|---------|-------------|-----|
| Push / merge to `main` | Production | https://www.drelevantwoman.com |
| Pull Request opened | Preview | Unique Vercel preview URL per PR |

**Vercel auto-deploys on every merge to `main`.** No manual deployment steps are needed. Ensure environment variables for production are set in the Vercel project dashboard under **Settings → Environment Variables**.

---

## Roadmap

### ✅ Phase 1 — Foundation (Current)
- [x] Homepage, About, Events, Blog, Contact pages
- [x] Membership application form
- [ ] Fix broken stats counters and hero placeholder content
- [ ] Fix canonical URL (SEO)
- [ ] Member registration API with email notifications
- [ ] Event registration and past/upcoming event separation
- [ ] Store and Academy product listings
- [ ] Privacy Policy and Terms of Service pages
- [ ] Newsletter subscription backend
- [ ] Admin CMS for content management

### ⏳ Phase 2 — Commerce & Accounts
- [ ] User authentication and member dashboard
- [ ] Paystack payment integration (Nigeria)
- [ ] Stripe payment integration (International)
- [ ] Store checkout and order management
- [ ] Paid event ticketing
- [ ] Academy course enrollment

### 🔮 Phase 3 — Growth
- [ ] Membership tiers (Free vs Premium)
- [ ] Recurring subscriptions
- [ ] Donation / giving page
- [ ] Mobile app (React Native)
- [ ] Mentor matching system

---

## Team

| Name | Role | Contact |
|------|------|---------|
| **Iveren Ann Lyam** | Founder | [LinkedIn](https://www.linkedin.com/in/iveren-lyam-9a1aa8244/) |
| **Victoria Wilson** | Project Manager | — |
| **FE Developer 1** | Frontend Developer | — |
| **FE Developer 2** | Frontend Developer | — |
| **BE Developer 1** | Backend Developer | — |
| **BE Developer 2** | Backend Developer | — |

---

## Contact

| Channel | Details |
|---------|---------|
| **Website** | [drelevantwoman.com](https://www.drelevantwoman.com) |
| **Email** | therelevantw@gmail.com |
| **Phone** | +234 812 355 3150 |
| **Instagram** | [@the_relevantwoman](https://www.instagram.com/the_relevantwoman) |
| **LinkedIn** | [The Relevant Woman](https://www.linkedin.com/company/the-relevant-woman/) |
| **Facebook** | [The Relevant Woman](https://www.facebook.com/share/188LaQRkQK/) |
| **YouTube** | [@therelevantwoman](https://youtube.com/@therelevantwoman) |
| **Telegram** | [TheRelevantWoman](https://t.me/TheRelevantWoman) |
| **TikTok** | [@the.relevant.woma](https://www.tiktok.com/@the.relevant.woma) |

---

<div align="center">

© 2026 The Relevant Woman. All rights reserved.

*Empowering young women forward — one connection at a time.*

</div>
