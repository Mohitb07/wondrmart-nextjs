"use client";

import { useState } from "react";
import { HiChevronUp, HiChevronDown } from "react-icons/hi2";
import { formatPrice } from "@/lib/utils";
import { cloudinaryImage } from "@/services/cloudinary";
import { AdvancedImage } from "@cloudinary/react";
import { OrderItem } from "@/types";

type OrderSummaryCardProps = {
  items: OrderItem[];
  totalAmount: number;
};

export function OrderSummaryCard({ items = [], totalAmount }: OrderSummaryCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Subtotal calculated from items
  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      (Number(item.total_amount) ||
        Number(item.product?.price || 0) * Number(item.quantity || 1)),
    0
  );

  const displayTotal = totalAmount > 0 ? totalAmount : subtotal;

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-neutral-900/80 border border-default-200/80 dark:border-neutral-800 shadow-sm overflow-hidden text-left transition-all">
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between font-bold text-sm sm:text-base text-foreground hover:bg-default-50/50 dark:hover:bg-neutral-800/30 transition-colors focus:outline-none"
      >
        <span>Order Summary</span>
        <span className="text-default-400 p-1">
          {isOpen ? (
            <HiChevronUp className="text-lg" />
          ) : (
            <HiChevronDown className="text-lg" />
          )}
        </span>
      </button>

      {/* Expandable Content */}
      {isOpen && (
        <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4">
          <div className="h-px w-full bg-default-100 dark:bg-neutral-800/80" />

          {/* Product Items List */}
          <div className="divide-y divide-default-100 dark:divide-neutral-800/60">
            {items.map((item, idx) => {
              const itemPrice =
                Number(item.total_amount) ||
                Number(item.product?.price || 0) * Number(item.quantity || 1);
              const imgUrl = item.product?.image_url;

              const cldImg = imgUrl
                ? cloudinaryImage({
                    imageUrl: imgUrl,
                    height: 120,
                    width: 120,
                  })
                : null;

              return (
                <div
                  key={item.order_item_id || item.product_id || idx}
                  className="py-3.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Consistent White Thumbnail Container */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border border-neutral-200 dark:border-neutral-700/60 shrink-0 overflow-hidden flex items-center justify-center p-1.5 shadow-sm">
                      {cldImg ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <AdvancedImage
                            cldImg={cldImg}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      ) : (
                        <span className="text-[10px] text-neutral-400">No Image</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-xs sm:text-sm text-foreground truncate max-w-[220px] sm:max-w-xs">
                        {item.product?.name || "Product"}
                      </p>
                      <p className="text-[11px] text-default-400 mt-0.5">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold text-xs sm:text-sm text-foreground shrink-0 pl-2">
                    {formatPrice(itemPrice)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="h-px w-full bg-default-200/70 dark:bg-neutral-800" />

          {/* Breakdown Rows */}
          <div className="space-y-2 text-xs sm:text-sm pt-1">
            <div className="flex justify-between items-center text-default-500">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between items-center text-default-500">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-500">Free</span>
            </div>

            <div className="flex justify-between items-center text-default-500">
              <span>Tax</span>
              <span className="font-medium text-foreground">₹0.00</span>
            </div>
          </div>

          <div className="h-px w-full bg-default-200/70 dark:bg-neutral-800" />

          {/* Total */}
          <div className="flex justify-between items-center pt-1">
            <span className="font-bold text-sm sm:text-base text-foreground">Total</span>
            <span className="font-black text-base sm:text-lg text-foreground">
              {formatPrice(displayTotal)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}