import { axiosInstance } from "@/api";
import { Order } from "@/types";

export const getOrderStatus = async (orderId: string): Promise<Order> => {
  try {
    const res = await axiosInstance.get(`/verify_order/${orderId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

