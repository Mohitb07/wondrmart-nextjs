export const siteConfig = {
  name: "wondrMart",
  description:
    "wondrMart — your one-stop online marketplace for top deals on electronics, fashion, home essentials, and more. Shop smarter, save bigger.",
  url: "https://wondrmart.vercel.app",
  ogImage: "https://wondrmart.vercel.app/images/og-image.png",
  keywords: [
    "wondrmart",
    "online shopping",
    "e-commerce",
    "top deals",
    "electronics",
    "fashion",
    "home essentials",
    "buy online",
    "best prices",
  ],
};

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "wondrMart Team" }],
  creator: "wondrMart",
  publisher: "wondrMart",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website" as const,
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Top Deals Online`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

/** Convenience: produce noindex metadata for private/auth pages */
export const noindexRobots = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};
