"use client";

import { Card, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={index}
          className="w-full md:min-w-[300px] md:max-w-[380px] h-[220px] md:h-[262px] p-4 flex flex-col justify-between border border-transparent"
          radius="lg"
        >
          <div className="space-y-2">
            <Skeleton className="w-3/4 h-3.5 rounded-lg">
              <div className="h-3.5 w-3/4 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-full h-3.5 rounded-lg">
              <div className="h-3.5 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-2/3 h-3.5 rounded-lg">
              <div className="h-3.5 w-2/3 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-1/2 h-3.5 rounded-lg">
              <div className="h-3.5 w-1/2 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-3/5 h-3.5 rounded-lg">
              <div className="h-3.5 w-3/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="flex items-center gap-3 pt-3 px-2 border-t border-default-100">
            <Skeleton className="w-10 h-6 rounded-md">
              <div className="h-6 w-10 rounded-md bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-14 h-6 rounded-md">
              <div className="h-6 w-14 rounded-md bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-24 h-6 rounded-md">
              <div className="h-6 w-24 rounded-md bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  );
}
