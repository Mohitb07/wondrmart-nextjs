"use client";

import { REGIONS_COUNTRIES } from "@/constants";
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
  street?: string;
  country?: string;
  mobile?: string;
  addressId?: string;
  pincode?: string;
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
  street = "",
  country = "",
  mobile = "",
  pincode = "",
  addressId,
}) => {
  const region = REGIONS_COUNTRIES.map((region) => {
    if (region.countryShortCode === country) {
      let countryName = region.countryName;
      let stateName = null;
      region.regions.map(
        (reg) => reg.shortCode === state && (stateName = reg.name)
      );
      return {
        country: countryName,
        state: stateName,
      };
    }
  });
  const result = region.filter((reg) => Boolean(reg));
  const { country: countryName, state: stateName } = result[0] || {};
  return (
    <Card
      className={`w-full md:min-w-[300px] md:max-w-[380px] h-full border ${
        isDefault ? "border-primary" : "border-transparent"
      } ${className}`}
    >
      {isHeaderVisible && isDefault && (
        <>
          <CardHeader className="flex gap-3 text-xs p-3">
            <p>Default: </p>
            <span>wondrMart</span>
          </CardHeader>
          <Divider />
        </>
      )}
      {children || (
        <CardBody className="p-3 text-sm flex justify-center">
          <div className="flex flex-col">
            <span>{apartment}</span>
            <span>{street}</span>
            <span>{area}</span>
            <span>{city}</span>
            <span>{pincode}</span>
            <span>Ph: {mobile}</span>
            <span>{stateName}</span>
            <span>{countryName}</span>
          </div>
        </CardBody>
      )}
      {isFooterVisible && !children && (
        <CardFooter className="flex text-sm gap-3 px-6">
          <>
            <div>
              <Link
                href={{
                  pathname: `/user/${userId}/addresses/edit`,
                  query: { id: addressId },
                }}
                // as={`/user/${userId}/addresses/edit`}
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
        </CardFooter>
      )}
    </Card>
  );
};
export default StyledCard;
