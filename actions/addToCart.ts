import { axiosInstance } from "../api";

export const addToCart = async (productId: string) => {
  try {
    const res = await axiosInstance.post(`/carts`, {
      product_id: productId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
