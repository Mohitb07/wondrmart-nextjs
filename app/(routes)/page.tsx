import Container from "@/common/Container";
import Search from "@/common/Search";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { getProductsCount } from "@/actions/getProductsCount";
import getQueryClient from "./components/getQueryClient";
import ProductsList from "./components/ProductsList";
import Banner from "./components/Banner";
import SortProducts from "./components/Sort";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Top Deals Online | wondrMart",
  description:
    "Shop the best deals on electronics, fashion, home essentials, and more at wondrMart. Fast shipping, easy returns, and unbeatable prices every day.",
  keywords: [
    "online shopping",
    "top deals",
    "electronics",
    "fashion deals",
    "home essentials",
    "wondrmart",
    "best prices online",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "wondrMart — Top Deals Online",
    description:
      "Discover unbeatable deals on electronics, fashion, and more at wondrMart. Shop smarter, save bigger.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "wondrMart — Top Deals Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "wondrMart — Top Deals Online",
    description:
      "Shop the best deals on electronics, fashion, and home essentials at wondrMart.",
    images: [`${siteConfig.url}/images/og-image.png`],
  },
};

type HomeProps = {
  searchParams: {
    q: string;
    page: string;
    sort: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { q = "", page, sort } = searchParams;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["productsCount", q],
    queryFn: () => getProductsCount(q),
  });

  const dehydratedState = dehydrate(queryClient);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/logo.png`,
        },
      },
    ],
  };

  return (
    <Hydrate state={dehydratedState}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="wrapper">
        <Banner />
        <Container styles="search-container">
          <Search />
        </Container>
      </div>
      <div>
        <Container>
          <main className="p-3 space-y-5 py-8">
            <div className="flex items-baseline">
              <h1 className="text-3xl lg:text-4xl font-bold mr-auto">Top Deals</h1>
              <SortProducts sortby={sort} />
            </div>
            <ProductsList />
          </main>
        </Container>
      </div>
    </Hydrate>
  );
}
