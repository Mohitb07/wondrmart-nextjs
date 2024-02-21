import { CartItemData } from "@/types";
import { axiosInstance } from "../api";

export const getCartItems = async (): Promise<CartItemData> => {
  try {
    const res = await axiosInstance.get("/cart");
    return res.data;
  } catch (error) {
    console.error("Error fetching cart items", error);
    throw error;
  }
};
