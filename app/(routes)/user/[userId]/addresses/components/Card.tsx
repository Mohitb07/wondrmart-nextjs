"use client";

import { REGIONS_COUNTRIES } from "@/constants";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

import Link from "next/link";
import React from "react";

type CardProps = {
  removeAddress?: (addressId: string) => void;
  setAddressIdToRemove?: (addressId: string) => void;
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
  isRemoving?: boolean;
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
  removeAddress = () => {},
  setAddressIdToRemove = () => {},
  isRemoving = false,
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

  const onAddressRemove = (addressId: string) => {
    setAddressIdToRemove(addressId);
    removeAddress(addressId);
  };

  return (
    <Card
      className={`w-full md:min-w-[300px] md:max-w-[380px] h-full border ${
        isDefault ? "border-primary border-2" : "border-transparent"
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
            <Button variant="light" size="sm">
              <Link
                href={{
                  pathname: `/user/${userId}/addresses/edit`,
                  query: { id: addressId },
                }}
                // as={`/user/${userId}/addresses/edit`}
              >
                Edit
              </Link>
            </Button>

            <Divider orientation="vertical" />
            <Button
              size="sm"
              variant="light"
              isLoading={isRemoving}
              onClick={() => onAddressRemove(addressId || "")}
            >
              Remove
            </Button>
            {!isDefault && (
              <>
                <Divider orientation="vertical" />
                <Button
                  variant="light"
                  size="sm"
                  className="text-gray-500"
                  // isLoading={isRemoving}
                  // onClick={() => onAddressRemove(addressId || "")}
                >
                  Set as Default
                </Button>
              </>
            )}
          </>
        </CardFooter>
      )}
    </Card>
  );
};
export default StyledCard;
