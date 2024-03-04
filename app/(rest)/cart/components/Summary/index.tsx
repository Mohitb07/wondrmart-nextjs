"use client";

import { formatPrice } from "@/utils/formatPrice";
import { Card, CardBody, Divider } from "@nextui-org/react";
import React from "react";

type OrderSummaryProps = {
  textSize?: "sm" | "base" | "lg";
  amountSize?: "sm" | "base" | "lg";
  totalAmount: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  textSize = "base",
  amountSize = "lg",
  totalAmount = 0,
}) => {
  const formattedTotalAmount = formatPrice(totalAmount);

  return (
    <Card className="w-full md:min-w-[300px] min-h-[240px] border-2 border-transparent">
      <CardBody>
        <div className="space-y-3 leading-6">
          <div className={`flex flex-col gap-3 text-${textSize}`}>
            <div className="flex justify-between">
              <span>Price (3 items)</span>
              <span>₹ 3000</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-40">Discount</span>
              <span className="text-primary">-₹ 300</span>
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
