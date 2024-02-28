import { BASE_URL } from "@/api";
import { Product } from "@/types";
import axios from "axios";

type ProductCount = {
  count: number;
};

export const getProductsCount = async (
  filters: string
): Promise<ProductCount> => {
  try {
    const res = await axios.post(BASE_URL + "/products-count", {
      query: filters,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
