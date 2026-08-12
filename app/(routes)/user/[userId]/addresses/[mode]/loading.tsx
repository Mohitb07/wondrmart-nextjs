"use client";

import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-w-[20rem] md:min-w-[60rem] w-full">
      <div className="w-[500px] space-y-5 md:space-y-4">
        {/* Country Select Skeleton */}
        <Skeleton className="w-full h-14 rounded-xl">
          <div className="h-14 w-full rounded-xl bg-default-300"></div>
        </Skeleton>

        {/* Full Name Input Skeleton */}
        <Skeleton className="w-full h-14 rounded-xl">
          <div className="h-14 w-full rounded-xl bg-default-300"></div>
        </Skeleton>

        {/* Mobile Input Skeleton */}
        <Skeleton className="w-full h-14 rounded-xl">
          <div className="h-14 w-full rounded-xl bg-default-300"></div>
        </Skeleton>

        {/* Pincode Input Skeleton */}
        <Skeleton className="w-full h-14 rounded-xl">
          <div className="h-14 w-full rounded-xl bg-default-300"></div>
        </Skeleton>

        {/* Apartment Input Skeleton */}
        <Skeleton className="w-full h-14 rounded-xl">
          <div className="h-14 w-full rounded-xl bg-default-300"></div>
        </Skeleton>

        {/* Area Input Skeleton */}
        <Skeleton className="w-full h-14 rounded-xl">
          <div className="h-14 w-full rounded-xl bg-default-300"></div>
        </Skeleton>

        {/* City Input Skeleton */}
        <Skeleton className="w-full h-14 rounded-xl">
          <div className="h-14 w-full rounded-xl bg-default-300"></div>
        </Skeleton>

        {/* State Select Skeleton */}
        <Skeleton className="w-full h-14 rounded-xl">
          <div className="h-14 w-full rounded-xl bg-default-300"></div>
        </Skeleton>

        {/* Checkbox Skeleton */}
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="w-5 h-5 rounded-md">
            <div className="h-5 w-5 rounded-md bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-48 h-4 rounded-lg">
            <div className="h-4 w-48 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>

        {/* Submit Button Skeleton */}
        <Skeleton className="w-full h-10 rounded-xl">
          <div className="h-10 w-full rounded-xl bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
}
