import { axiosInstance } from "../api";

export const addQuantity = async (
  productId: string,
  productPrice: string,
  quantity: string,
  cartId: string,
) => {
  const res = await axiosInstance.patch("/carts", {
    product_id: productId,
    product_price: productPrice,
    quantity,
    cart_id: cartId,
  });
  return res.data;
};