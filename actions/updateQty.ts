import { axiosInstance } from "../api";

export const addQuantity = async (
  productId: string,
  quantity: string,
  cartId: string
) => {
  try {
    const res = await axiosInstance.patch("/carts", {
      product_id: productId,
      quantity,
      cart_id: cartId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
