import { BASE_URL } from "@/api";
import { Product } from "@/types";
import axios from "axios";

export const getProduct = async (productId: string): Promise<Product> => {
  try {
    const res = await axios.get(BASE_URL + `/products/${productId}`)
    return res.data;
  } catch (error) {
    throw error;
  }
};
