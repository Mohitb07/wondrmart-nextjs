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
import { RemoveCartItemMutationData } from "@/hooks/useDeleteCartItem";

type UpdateQuantityData = {
  product_id: string;
  unit_amount: string;
  quantity: string;
  cart_id: string;
};

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
  cart_id: string;
  cart_item_id?: string;
  onUpdateQuantity?: (data: UpdateQuantityData) => void;
  onRemoveCartItem: (data: RemoveCartItemMutationData) => void;
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
  onUpdateQuantity,
  onRemoveCartItem,
}) => {
  const formattedPrice = formatPrice(Number(unit_amount));
  const formattedQuantity = Number(quantity);
  const productImage = cloudinaryImage({
    imageUrl: image_url,
    height: 120,
    width: 120,
  });

  const handleQuantityChange = (qty: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity({
        product_id,
        unit_amount,
        quantity: qty.toString(),
        cart_id,
      });
    }
  };

  const onQuantityAdd = () => {
    if (formattedQuantity === 4) {
      // toast({
      //   title: "Stock Limit",
      //   description: "You cannot add more of this item",
      //   status: "warning",
      //   position: "bottom",
      //   isClosable: true,
      // });
      return;
    }
    handleQuantityChange(formattedQuantity + 1);
  };

  const onQuantityRemove = () => {
    if (formattedQuantity > 0) {
      handleQuantityChange(formattedQuantity - 1);
    }
  };

  const onRemoveCartItemHandler = () => {
    if (cart_id && cart_item_id) {
      onRemoveCartItem({ cartId: cart_id, cartItemId: cart_item_id });
    }
  };

  return (
    <>
      <Card
        className="w-full p-2 shadow-2xl shadow-gray-900 border border-gray-800"
        isBlurred
      >
        <div className="flex gap-3 items-center">
          <div className="flex items-center justify-center h-24 w-24 md:h-28 md:w-28 bg-white rounded-lg overflow-hidden">
            <div className="">
              <AdvancedImage
                cldImg={productImage}
                plugins={[lazyload(), responsive()]}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col py-2 gap-3">
            <div className="flex justify-between">
              <h1 className="text-sm md:text-lg line-clamp-3">
                {title.length > 150 ? title.slice(0, 20) + "..." : title}
                {/* {title} */}
              </h1>
              <span
                onClick={onRemoveCartItemHandler}
                className="cursor-pointer"
              >
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
                  onClick={onQuantityRemove}
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
                  onClick={onQuantityAdd}
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
