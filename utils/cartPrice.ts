import { CartItem } from "@/types";

export const calculateCartPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (acc: number, currentCartItem: CartItem) =>
      acc +
      Number(currentCartItem.quantity) * Number(currentCartItem.product.price),
    0
  );
};
