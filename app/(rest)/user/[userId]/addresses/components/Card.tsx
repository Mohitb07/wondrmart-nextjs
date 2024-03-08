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
  className?: string;
  apartment?: string;
  area?: string;
  city?: string;
  state?: string;
  country?: string;
  mobile?: string;
};

const StyledCard: React.FC<CardProps> = ({
  userId,
  isDefault = false,
  children,
  isHeaderVisible = true,
  isFooterVisible = true,
  className = "",
  apartment = "",
  area = "",
  city = "",
  state = "",
  country = "",
  mobile = "",
}) => {
  return (
    <Card
      className={`w-full md:min-w-[300px] md:max-w-[380px] min-h-[240px] border ${
        isDefault ? "border-primary" : "border-transparent"
      } ${className}`}
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
          <div className="leading-5 flex flex-col">
            <span>{apartment}</span>
            <span>{area}</span>
            <span>{city}</span>
            <span>{state}</span>
            <span>Phone number: {mobile}</span>
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
