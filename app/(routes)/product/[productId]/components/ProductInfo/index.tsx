"use client";

import useGetCart from "@/hooks/useGetCart";
import { formatPrice } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import { sanitize } from "isomorphic-dompurify";
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
  const formattedDescription = sanitize(description);
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
        {/* <div className="flex items-center justify-center gap-7">
          <ProductServices />
        </div> */}
        <CardCTA
          cartQty={cartItemsIds[productId] || "0"}
          productId={productId}
          price={price}
          cartId={cart?.cart_id}
        />
      </div>
      <Divider />
      <h2 className="text-lg font-bold">Features</h2>
      {/* <ul className="text-sm list-disc ml-3 leading-6">
        <li>
          <p>
            Adaptive Transparency lets outside sounds in while reducing loud
            environmental noise
          </p>
        </li>
        <li>
          <p>Active Noise Cancellation reduces unwanted background noise</p>
        </li>
        <li>
          <p>
            Personalised Spatial Audio with dynamic head tracking places sound
            all around you
          </p>
        </li>
      </ul> */}
      <div
        dangerouslySetInnerHTML={{ __html: formattedDescription }}
        className="text-slate-400 text-base ml-4 leading-relaxed"
      ></div>
    </>
  );
};
export default ProductInfo;
