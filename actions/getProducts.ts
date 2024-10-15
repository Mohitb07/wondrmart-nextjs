import { BASE_URL } from "@/api";
import { Product } from "@/types";
import axios from "axios";

export const getAllProducts = async (
  filters: string,
  page: string
): Promise<Product[]> => {
  try {
    const res = await axios.post(BASE_URL + "/products", {
      query: filters,
      page,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
