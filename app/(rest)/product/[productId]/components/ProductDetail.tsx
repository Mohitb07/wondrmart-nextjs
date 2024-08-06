"use client";

import { getProduct } from "@/actions/getProduct";
import useGetCart from "@/hooks/useGetCart";
import { cloudinaryImage } from "@/utils/cloudinaryImage";
import { formatPrice } from "@/utils/formatPrice";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";
import CardCTA from "./CTA/Card";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";

type ProductDetailProps = {
  id: string;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
  const {
    data: cart,
    isInitialLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
  } = useGetCart();

  if (!product) {
    notFound();
  }
  // if (isProductLoading || isCartLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-[500px] ">
  //       <Spinner color="primary" />
  //     </div>
  //   );
  // }
  // Need to handle error
  if (isProductError || isCartError) {
    return <div>Error: {JSON.stringify(productError || cartError)}</div>;
  }
  let userCart = cart?.cart_items || [];
  let cartItemsIds: Record<string, string> = {};
  if (!isCartError && !!cart) {
    userCart.map((item) => {
      cartItemsIds[item.product_id] = item.quantity.toString();
    });
  }

  const { name, description, price, image_url, product_id } = product;
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
          cartQty={cartItemsIds[product_id] || "0"}
          productId={product_id}
          price={price}
          cartId={cart?.cart_id}
        />
      </section>
    </div>
  );
};
export default ProductDetail;
