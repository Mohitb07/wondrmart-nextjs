"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type CardProps = {};

const StyledCard: React.FC<CardProps> = () => {
  return (
    <Card className="w-full md:min-w-[300px] md:max-w-[380px]">
      <CardHeader className="flex gap-3 text-xs p-3 px-6">
        <p>Default: </p>
        <span>wondrMart</span>
      </CardHeader>
      <Divider />
      <CardBody className="text-sm p-3 px-6">
        <span>Testing </span>
        <span>T-T TTT TTT</span>
        <span>Testing Location</span>
        <span>Testing, Testing 1100123</span>
        <span>India</span>
        <span>Phone number: 123456789</span>
      </CardBody>
      <CardFooter className="flex text-sm gap-3 px-6">
        <div>Edit</div>
        <Divider orientation="vertical" />
        <div>Remove</div>
      </CardFooter>
    </Card>
  );
};
export default StyledCard;
