"use client";

import { cloudinaryImage } from "@/utils/cloudinaryImage";
import { formatPrice } from "@/utils/formatPrice";
import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from "@cloudinary/react";
import { Button, Card, Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import ImageGallery from "../../../product/[productId]/components/ImageGallery";

type CartItemProps = {
  isLast?: boolean;
  quantity: string;
  title: string;
  unit_amount: string;
  total_amount: string;
  image_url: string;
  product_id?: string;
  order_item_id?: string;
  isDisabled?: boolean;
  cart_id?: string;
  cart_item_id?: string;
};

const CartItem: React.FC<CartItemProps> = ({
  isLast,
  quantity,
  title,
  unit_amount,
  total_amount,
  image_url,
  product_id = "",
  cart_id,
  cart_item_id,
  isDisabled = false,
}) => {
  const formattedPrice = formatPrice(Number(total_amount));
  const productImage = cloudinaryImage({
    imageUrl: image_url,
    height: 120,
    width: 120,
  });

  console.log('productImage', productImage)
  
  
  return (
    <>
      <Card
        className="w-full p-2 shadow-2xl shadow-gray-900 border border-gray-800"
        isBlurred
      >
        <div className="flex gap-3">
          <div>
            {/* <Image
              className="rounded-lg"
              src="https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg"
              width={120}
              height={120}
              alt="product image"
              priority
            /> */}
            <ImageGallery src={productImage} />
          </div>
          <div className="flex flex-1 flex-col justify-between py-2">
            <div className="flex justify-between">
              <h1 className="text-base md:text-lg">
                {/* {title.length > 20 ? title.slice(0, 20) + "..." : title} */}
                {title}
              </h1>
              <span>
                <MdDeleteOutline className="text-2xl text-slate-500" />
              </span>
            </div>
            <div className="flex items-center justify-between flex-row-reverse flex-nowrap md:flex-row">
              <span className="text-base md:text-lg">{formattedPrice}</span>
              <div className="space-x-3 flex items-center">
                <Button
                  color="primary"
                  variant="faded"
                  size="sm"
                  isIconOnly
                  aria-label="decrease quantity"
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  variant="faded"
                  aria-label="increase quantity"
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* {!isLast && <Divider className="w-[calc(100%-2rem)] mx-auto hidden md:flex"/>} */}
    </>
  );
};
export default CartItem;
