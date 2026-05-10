import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/shared/CartProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://drelevantwoman.vercel.app";
const siteName = "The Relevant Woman";
const defaultTitle = "The Relevant Woman - Mentorship, Leadership & Community";
const defaultDescription =
  "Empowering young women through mentorship, leadership development, and community building. Join us to unlock your potential and build meaningful connections.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "women empowerment",
    "women mentorship",
    "leadership development",
    "women community",
    "young women network",
    "women career development",
    "women professional growth",
    "women leadership",
    "women entrepreneurship",
    "women networking",
    "female mentorship",
    "women support network",
    "women personal development",
    "women business",
    "women success",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Relevant Woman - Empowering Young Women Forward",
      },
      {
        url: "/assets/images/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "The Relevant Woman Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/assets/images/og-image.jpg"],
    creator: "@therelevantwoman",
    site: "@therelevantwoman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3a225c",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  category: "Women Empowerment",
  classification: "Non-profit Organization",
  other: {
    "theme-color": "#3a225c",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": siteName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/assets/images/logo/rellogo.png`,
    description: defaultDescription,
    sameAs: [
      "https://www.facebook.com/share/188LaQRkQK/?mibextid=wwXIfr",
      "https://www.linkedin.com/company/the-relevant-woman/",
      "https://www.instagram.com/the_relevantwoman",
      "https://youtube.com/@therelevantwoman",
      "https://www.tiktok.com/@the.relevant.woma",
      "https://t.me/TheRelevantWoman",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "therelevantw@gmail.com",
      telephone: "+2347041409742",
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Women Empowerment",
      "Mentorship",
      "Leadership Development",
      "Community Building",
      "Professional Development",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <NextTopLoader
          color="#f9f871"
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #f9f871,0 0 5px #f9f871"
        />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
