import { axiosInstance } from "@/api";

export const getCartCount = async (): Promise<number> => {
  try {
    const res = await axiosInstance.get("/cart_items_count");
    return Number(res.data) || 0;
  } catch (error) {
    throw error;
  }
};


