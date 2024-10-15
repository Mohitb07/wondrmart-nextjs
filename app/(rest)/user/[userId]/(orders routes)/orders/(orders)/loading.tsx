"use client";

import { Card, Skeleton } from "@nextui-org/react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex flex-col gap-10">
      <Card className="w-full space-y-5 p-4" radius="lg">
        <div className="flex items-center w-full justify-between text-slate-400">
          <div className="flex items-center justify-between md:justify-center w-full md:w-auto text-xs gap-10 text-left overflow-hidden">
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[5rem] md:w-[6rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg w-10 h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[3rem] md:w-[6rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg w-10 h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[3rem] md:w-[6rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg w-10 h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </div>
          <div className="text-left text-xs hidden md:block">
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[10rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full gap-4">
          <Skeleton className="rounded-lg w-[100px] md:w-[90px] h-[90px] my-2">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="w-full flex-col space-y-2">
            <Skeleton className="w-3/4 md:w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-2/6 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      </Card>

      <Card className="w-full space-y-5 p-4" radius="lg">
        <div className="flex items-center w-full justify-between text-slate-400">
          <div className="flex items-center justify-between md:justify-center w-full md:w-auto text-xs gap-10 text-left overflow-hidden">
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[5rem] md:w-[6rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg w-10 h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[3rem] md:w-[6rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg w-10 h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[3rem] md:w-[6rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg w-10 h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </div>
          <div className="text-left text-xs hidden md:block">
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[10rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full gap-4">
          <Skeleton className="rounded-lg w-[100px] md:w-[90px] h-[90px]">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="w-full flex-col space-y-2">
            <Skeleton className="w-3/4 md:w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-2/6 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      </Card>
      <Card className="w-full space-y-5 p-4" radius="lg">
        <div className="flex items-center w-full justify-between text-slate-400">
          <div className="flex items-center justify-between md:justify-center w-full md:w-auto text-xs gap-10 text-left overflow-hidden">
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[5rem] md:w-[6rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg w-10 h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[3rem] md:w-[6rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg w-10 h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[3rem] md:w-[6rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg w-10 h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </div>
          <div className="text-left text-xs hidden md:block">
            <div className="flex flex-col gap-2">
              <Skeleton className="rounded-lg w-[10rem] h-3">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full gap-4">
          <Skeleton className="rounded-lg w-[100px] md:w-[90px] h-[90px]">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="w-full flex-col space-y-2">
            <Skeleton className="w-3/4 md:w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-2/6 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      </Card>
    </div>
  );
}
