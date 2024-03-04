"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

import Link from "next/link";
import React from "react";

type CardProps = {
  userId?: string;
  isDefault?: boolean;
  children?: React.ReactNode;
  isHeaderVisible?: boolean;
  isFooterVisible?: boolean;
};

const StyledCard: React.FC<CardProps> = ({
  userId,
  isDefault = false,
  children,
  isHeaderVisible = true,
  isFooterVisible = true,
}) => {
  return (
    <Card
      className={`w-full md:min-w-[300px] md:max-w-[380px] min-h-[240px] border-2 ${
        isDefault ? "border-primary" : "border-transparent"
      }`}
    >
      {isHeaderVisible && isDefault && (
        <>
          <CardHeader className="flex gap-3 text-xs p-3 px-6">
            <p>Default: </p>
            <span>wondrMart</span>
          </CardHeader>
          <Divider />
        </>
      )}
      <CardBody className="text-sm p-3 px-6 flex justify-center">
        {children || (
          <div className="leading-8 flex flex-col">
            <span>Testing </span>
            <span>T-T TTT TTT</span>
            <span>Testing Location</span>
            <span>Testing, Testing 1100123</span>
            <span>India</span>
            <span>Phone number: 123456789</span>
          </div>
        )}
      </CardBody>
      <CardFooter className="flex text-sm gap-3 px-6">
        {isFooterVisible &&!children && (
          <>
            <div>
              <Link
                href="/user/[userId]/addresses/[mode]"
                as={`/user/${userId}/addresses/edit`}
              >
                Edit
              </Link>
            </div>
            <Divider orientation="vertical" />
            <div>Remove</div>
            {!isDefault && (
              <>
                <Divider orientation="vertical" />
                <div>Set as Default</div>
              </>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};
export default StyledCard;
