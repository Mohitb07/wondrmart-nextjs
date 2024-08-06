import { CartType } from "@/types";
import axios from "axios";

export const getCartItems = async (): Promise<CartType> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/cart/api`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching cart items", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }
    throw error;
  }
};
