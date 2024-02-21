import { axiosInstance } from "../api";

export const getCartCount = async (): Promise<number> => {
  try {
    const res = await axiosInstance.get("/cart_items_count");
    return res.data;
  } catch (error) {
    throw error;
  }
};
