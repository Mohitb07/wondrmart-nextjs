import { BASE_URL, axiosInstance } from "@/api";
import { Product } from "@/types";
import axios from "axios";

export const getAllProducts = async (filters: string): Promise<Product[]> => {
  try {
    const res = await axios.post(BASE_URL + "/products", {
      query: filters,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
