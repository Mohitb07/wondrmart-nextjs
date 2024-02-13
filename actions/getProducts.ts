import { axiosInstance } from "@/api";
import { Product } from "@/types";

// export const getProducts = async (query: string) => {};

type Filters = string;
export const getAllProducts = async (filters: Filters): Promise<Product[]> => {
  const res = await axiosInstance.post("/products", {
    query: filters,
  });
  return res.data;
};
