"use client";

import React from "react";
import Link from "next/link";
import { AdvancedImage } from "@cloudinary/react";
import { Button } from "@nextui-org/react";
import { cloudinaryImage } from "@/services/cloudinary";
import { formatPrice } from "@/lib/utils";
import { OrderItem } from "@/types";
import { FiExternalLink } from "react-icons/fi";

type OrderItemRowProps = {
  item: OrderItem;
  isLast?: boolean;
};

const OrderItemRow: React.FC<OrderItemRowProps> = ({ item, isLast = false }) => {
  const product = item.product;
  const unitPrice = formatPrice(Number(product?.price) || 0);
  const totalAmount = formatPrice(
    Number(item.total_amount) || (Number(product?.price || 0) * Number(item.quantity || 1))
  );

  const productShowCaseImage = product?.image_url
    ? cloudinaryImage({
        imageUrl: product.image_url,
        height: 160,
        width: 160,
      })
    : null;

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 ${
        !isLast ? "border-b border-default-200/60 dark:border-neutral-800/80" : ""
      }`}
    >
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Product Image Thumbnail with solid white container */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-center shrink-0 overflow-hidden shadow-sm group">
          {productShowCaseImage ? (
            <div className="w-full h-full flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105">
              <AdvancedImage
                cldImg={productShowCaseImage}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <span className="text-xs text-neutral-400">No Image</span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1 text-left flex-1 min-w-0">
          <Link
            href={`/product/${product?.product_id || ""}`}
            className="hover:text-primary transition-colors block"
          >
            <h4 className="text-sm sm:text-base font-bold line-clamp-2 leading-snug text-foreground">
              {product?.name || "Ordered Product"}
            </h4>
          </Link>

          <div className="flex items-center gap-3 text-xs text-default-500 flex-wrap">
            <span>
              Unit Price:{" "}
              <span className="font-medium text-foreground">{unitPrice}</span>
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-md bg-default-100 dark:bg-neutral-800 font-semibold text-foreground">
              Qty: {item.quantity || 1}
            </span>
          </div>

          <div className="sm:hidden pt-1 font-bold text-sm text-primary">
            Subtotal: {totalAmount}
          </div>
        </div>
      </div>

      {/* Right Column: Total Price and Action */}
      <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
        <span className="text-base font-bold text-foreground">
          {totalAmount}
        </span>
        <Button
          as={Link}
          href={`/product/${product?.product_id || ""}`}
          size="sm"
          variant="light"
          className="text-xs text-default-500 hover:text-foreground h-8 px-2.5 gap-1.5"
          endContent={<FiExternalLink className="text-xs" />}
        >
          View Product
        </Button>
      </div>
    </div>
  );
};

export default OrderItemRow;