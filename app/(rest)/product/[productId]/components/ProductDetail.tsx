"use client";

import React from "react";
import ImageGallery from "./ImageGallery";
import CardCTA from "./CTA/Card";
import ProductInfo from "./ProductInfo";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/actions/getProduct";
import { Spinner } from "@nextui-org/react";
import { cloudinaryImage } from "@/utils/cloudinaryImage";
import { formatPrice } from "@/utils/formatPrice";
import { notFound } from "next/navigation";
import { getCartItems } from "@/actions/getCartItems";
import Cookies from "js-cookie";

type ProductDetailProps = {
  id: string;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
  const {
    data: cartItems,
    isInitialLoading: isCartItemsLoading,
    isError: cartItemsError,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    enabled: Cookies.get("accessToken") ? true : false,
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error("Error fetching cart items", err);
    },
  });

  if (!data) {
    notFound();
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] ">
        <Spinner color="primary" />
      </div>
    );
  }
  if (isError) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  let cartItemsIds: Record<string, string> = {};
  if (!isError && cartItems && cartItems.cart.length) {
    cartItems.cart[0].cart_items.map((item) => {
      cartItemsIds[item.product_id] = item.quantity.toString();
    });
  }

  const { name, description, price, image_url, product_id } = data;
  const productImage = cloudinaryImage({
    imageUrl: image_url,
    height: 500,
    width: 500,
  });
  const formattedPrice = formatPrice(Number(price));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
      {/* white overlay background applied to hide the empty space because of the grid */}
      {/* <section className="shadow-gray-300 shadow-2xl bg-white rounded-lg"> */}
      <div className="flex justify-center items-center md:block">
        <ImageGallery src={productImage} />
      </div>
      {/* </section> */}
      <section className="space-y-3 flex-1 lg:col-span-2">
        <ProductInfo
          description={description}
          price={formattedPrice}
          productName={name}
        />
      </section>
      <section className="hidden lg:block">
        <CardCTA
          cartQty={cartItemsIds[data.product_id] || "0"}
          productId={data.product_id}
          price={data.price}
          cartId={cartItems?.cart[0]?.cart_id}
        />
      </section>
    </div>
  );
};
export default ProductDetail;
