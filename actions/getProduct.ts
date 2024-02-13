import { axiosInstance } from "@/api";
import { Product } from "@/types";

export const getProduct = async (productId: string): Promise<Product> => {
  const res = await axiosInstance.get(`/products/${productId}`);
  return res.data;
};
