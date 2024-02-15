import { axiosInstance } from "@/api";
import { Product } from "@/types";

export const getAllProducts = async (filters: string): Promise<Product[]> => {
  try {
    const res = await axiosInstance.post("/products", {
      query: filters,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
