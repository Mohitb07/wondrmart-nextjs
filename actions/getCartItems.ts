import { axiosInstance } from "@/api";
import { CartType } from "@/types";

export const getCartItems = async (): Promise<CartType> => {
  try {
    const res = await axiosInstance.get<CartType>("/cart");
    return res.data;
  } catch (error) {
    console.error("Error fetching cart items", error);
    throw error;
  }
};


