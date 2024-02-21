import { axiosInstance } from "../api";

export const addToCart = async (productId: string, productPrice: string) => {
  try {
    const res = await axiosInstance.post(`/carts`, {
      product_id: productId,
      product_price: productPrice,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
