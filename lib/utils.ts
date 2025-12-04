import { CartItem } from "@/types";

export const calculateCartPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (acc: number, currentCartItem: CartItem) =>
      acc +
      Number(currentCartItem.quantity) * Number(currentCartItem.product.price),
    0
  );
};

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
};

export const debounce = (func: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const isPinCodeValid = (pinCode: string): boolean => {
  const pinCodeRegex = /^[0-9]{1,6}$/;
  return pinCodeRegex.test(pinCode);
};

export const isMobileNumberValid = (mobileNumber: string): boolean => {
  const mobileNumberRegex = /^[0-9]{1,10}$/;
  return mobileNumberRegex.test(mobileNumber);
};
