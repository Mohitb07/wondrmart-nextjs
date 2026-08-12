import { BASE_URL } from "@/api";
import axios from "axios";

type ProductCount = {
  count: number;
};

export const getProductsCount = async (
  filters: string,
): Promise<ProductCount> => {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL
        : BASE_URL;

    const res = await axios.post(`${baseUrl}/products-count`, {
      query: filters,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
