import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import axios from "axios";
import { Product } from "@/types";

async function getAllProductIds(): Promise<string[]> {
  try {
    const baseUrl =
      process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
    const res = await axios.post(`${baseUrl}/products`, {
      query: "",
      page: "1",
      sortby: "",
    });
    const products: Product[] = res.data;
    return products.map((p) => p.product_id);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productIds = await getAllProductIds();

  const productUrls: MetadataRoute.Sitemap = productIds.map((id) => ({
    url: `${siteConfig.url}/product/${id}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...productUrls,
  ];
}
