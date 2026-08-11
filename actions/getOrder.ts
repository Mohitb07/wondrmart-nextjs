import { serverFetchWithRefresh } from "@/lib/serverAuth";
import { Order } from "@/types";

export const getUserOrder = async (
  userId: string,
  orderId: string
): Promise<Order> => {
  try {
    const { data } = await serverFetchWithRefresh<Order>(`/order/${orderId}`);
    return data;
  } catch (error) {
    throw error;
  }
};


