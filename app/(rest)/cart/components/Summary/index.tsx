"use client";

import { formatPrice } from "@/utils/formatPrice";
import { Card, CardBody, Divider } from "@nextui-org/react";
import React from "react";

export const DISCOUNT_VALUE = 0;

type OrderSummaryProps = {
  textSize?: "sm" | "base" | "lg";
  amountSize?: "sm" | "base" | "lg";
  totalAmount: string;
  quantity: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  textSize = "base",
  amountSize = "lg",
  totalAmount = 0,
  quantity = 0,
}) => {
  const formattedAmount = formatPrice(Number(totalAmount));
  const formattedTotalAmount = formatPrice(Number(totalAmount) - DISCOUNT_VALUE);
  return (
    <Card className="w-full md:min-w-[300px] border border-transparent h-full">
      <CardBody>
        <div className="space-y-4">
          <div className={`flex flex-col gap-3 text-${textSize}`}>
            <div className="flex justify-between">
              <span>Price ({quantity} items)</span>
              <span>{formattedAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-40">Discount</span>
              <span className="text-primary">-₹ {DISCOUNT_VALUE}</span>
            </div>
            <div className="flex justify-between ">
              <span className="opacity-40">Delivery Charges</span>
              <span>₹ 0</span>
            </div>
          </div>
          <Divider />
          <div
            className={`flex justify-between text-${amountSize} font-semibold`}
          >
            <span>Total Amount</span>
            <span>{formattedTotalAmount}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default OrderSummary;
