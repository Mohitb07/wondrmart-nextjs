import { BASE_URL } from "@/api";
import { Product } from "@/types";
import axios from "axios";

export const getProduct = async (productId: string): Promise<Product> => {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL
        : BASE_URL;
    const res = await axios.get(`${baseUrl}/products/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
