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

import TurndownService from "turndown";

const turndownService = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

export const convertHtmlToMarkdown = (htmlOrMarkdown: string): string => {
  if (!htmlOrMarkdown) return "";
  // If string contains HTML tags like <ul, <li, <div, <p, <strong, etc.
  if (/<[a-z][\s\S]*>/i.test(htmlOrMarkdown)) {
    try {
      return turndownService.turndown(htmlOrMarkdown);
    } catch {
      return htmlOrMarkdown;
    }
  }
  return htmlOrMarkdown;
};


import { marked } from "marked";
import { sanitize } from "isomorphic-dompurify";

export const renderDescriptionToHtml = (description: string): string => {
  if (!description) return "";
  try {
    let htmlContent = description;
    // If it's pure Markdown (no HTML tags), convert Markdown to HTML
    if (!/<[a-z][\s\S]*>/i.test(description)) {
      htmlContent = marked.parse(description, { async: false }) as string;
    }
    return sanitize(htmlContent);
  } catch {
    return sanitize(description);
  }
};



