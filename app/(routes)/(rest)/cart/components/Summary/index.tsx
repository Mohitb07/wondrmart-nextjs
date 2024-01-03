"use client";

import { Card, CardBody, Divider } from "@nextui-org/react";
import React from "react";

type OrderSummaryProps = {};

const OrderSummary: React.FC<OrderSummaryProps> = () => {
  return (
    <Card>
      <CardBody>
        <div className="space-y-3 leading-6">
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
            <Divider/>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Amount</span>
            <span>₹ 2700</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default OrderSummary;
