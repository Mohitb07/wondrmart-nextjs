import { getProduct } from "@/actions/getProduct";
import Container from "@/common/Container";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import React from "react";
import getQueryClient from "../../components/getQueryClient";
import ProductDetail from "./components/ProductDetail";
import type { Metadata } from "next";
import { siteConfig, noindexRobots } from "@/lib/seo";

type ProductDetailProps = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { productId } = params;
  try {
    const product = await getProduct(productId);
    const title = product.name;
    const description = product.description
      ? product.description.slice(0, 155).trim() + "…"
      : `Buy ${product.name} at the best price on wondrMart.`;
    const productUrl = `${siteConfig.url}/product/${productId}`;

    return {
      title,
      description,
      alternates: { canonical: productUrl },
      openGraph: {
        title: `${product.name} | wondrMart`,
        description,
        url: productUrl,
        siteName: siteConfig.name,
        images: product.image_url
          ? [
              {
                url: product.image_url,
                width: 800,
                height: 800,
                alt: product.name,
              },
            ]
          : [
              {
                url: `${siteConfig.url}/images/og-image.png`,
                width: 1200,
                height: 630,
                alt: `${product.name} | wondrMart`,
              },
            ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | wondrMart`,
        description,
        images: product.image_url
          ? [product.image_url]
          : [`${siteConfig.url}/images/og-image.png`],
      },
    };
  } catch {
    return {
      title: "Product Not Found",
      description: "The product you are looking for could not be found.",
      robots: noindexRobots,
    };
  }
}

const ProductDetailPage: React.FC<ProductDetailProps> = async ({ params }) => {
  const { productId } = params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });
  const dehydrateState = dehydrate(queryClient);

  // Build JSON-LD for the product (use cached data if available)
  const product = queryClient.getQueryData<Awaited<ReturnType<typeof getProduct>>>(["product", productId]);
  const productUrl = `${siteConfig.url}/product/${productId}`;

  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image_url,
        url: productUrl,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: product.price,
          availability: "https://schema.org/InStock",
          url: productUrl,
          seller: {
            "@type": "Organization",
            name: siteConfig.name,
          },
        },
      }
    : null;

  return (
    <Hydrate state={dehydrateState}>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Container>
        <main className="p-3 space-y-5 min-h-full">
          <ProductDetail id={productId} />
        </main>
      </Container>
    </Hydrate>
  );
};
export default ProductDetailPage;
