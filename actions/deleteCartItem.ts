import axios from "axios";
import { axiosInstance } from "../api";

export const deleteCartItem = async (cartId: string, cartItemId: string) => {
  try {
    const res = await axiosInstance.delete("/carts", {
      data: {
        cart_id: cartId,
        cart_item_id: cartItemId,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      throw error;
    }
    throw error;
  }
};
