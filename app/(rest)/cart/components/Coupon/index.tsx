"use client";

import { Input } from "@nextui-org/react";
import React from "react";
import { IoMdPricetag } from "react-icons/io";

type CouponInputProps = {};

const CouponInput: React.FC<CouponInputProps> = () => {
  return (
    <Input
      minLength={6}
      maxLength={6}
      defaultValue="FREE20"
      className="text-primary text-opacity-80"
      isClearable
      radius="lg"
      size="lg"
      placeholder="Enter Coupon Code"
      isInvalid={false}
      variant="bordered"
        // errorMessage="Enter a valid coupon code"
      startContent={
        <IoMdPricetag className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
  );
};
export default CouponInput;
