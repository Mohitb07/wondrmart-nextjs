"use client";

import useGetCart from "@/hooks/useGetCart";
import { formatPrice, renderDescriptionToHtml } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import React from "react";
import CardCTA from "../CTA/Card";

type ProductInfo = {
  productName: string;
  price: string;
  description: string;
  productId: string;
};

const ProductInfo: React.FC<ProductInfo> = ({
  productName,
  price,
  description,
  productId,
}) => {
  const formattedDescription = renderDescriptionToHtml(description);
  const formattedPrice = formatPrice(Number(price));
  const {
    data: cart,
    isInitialLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
  } = useGetCart();

  let userCart = cart?.cart_items || [];
  let cartItemsIds: Record<string, string> = {};
  if (!isCartError && !!cart) {
    userCart.map((item) => {
      cartItemsIds[item.product_id] = item.quantity.toString();
    });
  }

  return (
    <>
      <h1 className="text-lg md:text-2xl font-bold">{productName}</h1>
      <Divider />
      <p className="text-2xl font-semibold">{formattedPrice}</p>
      <div className="lg:hidden space-y-3">
        <Divider />
        <CardCTA
          cartQty={cartItemsIds[productId] || "0"}
          productId={productId}
          price={price}
          cartId={cart?.cart_id}
        />
      </div>
      <Divider />
      <h2 className="text-lg font-bold">Features</h2>
      <div
        dangerouslySetInnerHTML={{ __html: formattedDescription }}
        className="text-slate-400 text-base leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:my-2 [&_li]:text-slate-300 [&_strong]:text-slate-100 [&_p]:mb-2.5"
      ></div>
    </>
  );
};

export default ProductInfo;
