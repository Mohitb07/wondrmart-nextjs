import { axiosInstance } from "@/api";
import { Order } from "@/types";

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const res = await axiosInstance.get(`/orders/${userId}`);
    return res.data as Order[];
  } catch (error) {
    throw error;
  }
};


