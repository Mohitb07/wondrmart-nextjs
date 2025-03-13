"use client";

import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 p-3 mx-auto w-full max-w-8xl">
      <div className="flex items-center justify-center">
        <Skeleton className="h-[400px] w-[350px] rounded-md" />
      </div>
      <div className="space-y-3 flex-1 lg:col-span-2">
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-10 w-1/4 rounded-md" />
        <Skeleton className="h-5 w-1/5 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-2 w-1/2 rounded-md" />
        <Skeleton className="h-2 w-1/3 rounded-md" />
        <Skeleton className="h-2 w-3/4 rounded-md" />
        <Skeleton className="h-2 w-3/6 rounded-md" />
        <Skeleton className="h-2 w-1/4 rounded-md" />
      </div>
      <div className="hidden lg:block">
        <Skeleton className="h-[150px] w-full rounded-md" />
      </div>
    </div>
  );
} 
