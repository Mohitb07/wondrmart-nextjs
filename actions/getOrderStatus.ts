import { axiosInstance, BASE_URL } from "@/api";
import { Order } from "@/types";

export const getOrderStatus = async (orderId: string): Promise<Order> => {
  try {
    const res = await axiosInstance.get(BASE_URL + `/verify_order/${orderId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
