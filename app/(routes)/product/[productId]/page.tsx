import { getProduct } from "@/actions/getProduct";
import Container from "@/common/Container";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import React from "react";
import getQueryClient from "../../components/getQueryClient";
import ProductDetail from "./components/ProductDetail";
import type { Metadata } from "next";
import { siteConfig, noindexRobots } from "@/lib/seo";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fit } from "@cloudinary/url-gen/actions/resize";

type ProductDetailProps = {
  params: {
    productId: string;
  };
};

/**
 * Converts a Cloudinary public ID (what the API stores as image_url)
 * into a real https://res.cloudinary.com/... URL suitable for OG/Twitter
 * meta tags and JSON-LD.  Falls back to the default OG image if the
 * public ID is empty.
 */
function buildCloudinaryUrl(publicId: string, width = 800, height = 800): string {
  if (!publicId) return `${siteConfig.url}/images/og-image.png`;
  return new CloudinaryImage(publicId, {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  })
    .resize(fit().width(width).height(height))
    .format("jpg")
    .toURL();
}

/**
 * Strips HTML tags and normalizes whitespace to produce plain text
 * suitable for meta tags (description, OG, Twitter) and JSON-LD.
 */
function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { productId } = params;
  try {
    const product = await getProduct(productId);
    const title = product.name;
    const plainDescription = stripHtml(product.description);
    const description = plainDescription
      ? plainDescription.slice(0, 155).trim() + "…"
      : `Buy ${product.name} at the best price on wondrMart.`;
    const productUrl = `${siteConfig.url}/product/${productId}`;

    // Build a real Cloudinary https URL from the public ID stored in image_url
    const ogImageUrl = buildCloudinaryUrl(product.image_url, 800, 800);

    return {
      title,
      description,
      alternates: { canonical: productUrl },
      openGraph: {
        title: `${product.name} | wondrMart`,
        description,
        url: productUrl,
        siteName: siteConfig.name,
        images: [
          {
            url: ogImageUrl,
            width: 800,
            height: 800,
            alt: product.name,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | wondrMart`,
        description,
        images: [ogImageUrl],
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

  // Build a real Cloudinary URL for the JSON-LD image field too
  const jsonLdImageUrl = product?.image_url
    ? buildCloudinaryUrl(product.image_url, 800, 800)
    : null;

  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: stripHtml(product.description),
        image: jsonLdImageUrl,
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
