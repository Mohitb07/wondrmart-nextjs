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

type ProductDetailProps = {
  id: string;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  console.log("data", data, isLoading, error);

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

  const { name, description, price, image_url, product_id } = data;
  //   const clean = sanitize(description);
  const productImage = cloudinaryImage({
    imageUrl: image_url,
    height: 500,
    width: 500,
  });
  const formattedPrice = formatPrice(Number(price));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* white overlay background applied to hide the empty space because of the grid */}
      {/* <section className="shadow-gray-300 shadow-2xl bg-white rounded-lg"> */}
      <div className="flex justify-center items-center md:block">
        <ImageGallery src={productImage} />
      </div>
      {/* </section> */}
      <section className="mt-5 space-y-3 flex-1 lg:col-span-2">
        <ProductInfo
          description={data.description}
          price={formattedPrice}
          productName={data.name}
        />
      </section>
      <section className="hidden lg:block">
        <CardCTA />
      </section>
    </div>
  );
};
export default ProductDetail;
