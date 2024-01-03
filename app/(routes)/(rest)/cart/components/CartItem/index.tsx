"use client";

import { Button, Card, Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";

type CartItemProps = {
  isLast?: boolean;
};

const CartItem: React.FC<CartItemProps> = ({ isLast }) => {
  return (
    <>
      <Card className="w-full p-2 shadow-2xl shadow-gray-900" isBlurred>
        <div className="flex gap-3">
          <div>
            <Image
              className="rounded-lg"
              src="https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg"
              width={120}
              height={120}
              alt="product image"
              priority
            />
          </div>
          <div className="flex flex-1 flex-col justify-between py-2">
            <div className="flex justify-between">
              <h1 className="text-base md:text-lg">
                Apple AirPods Pro (2nd Generation)
              </h1>
              <span>
                <MdDeleteOutline className="text-2xl text-slate-500" />
              </span>
            </div>
            <div className="flex items-center justify-between flex-row-reverse flex-nowrap md:flex-row">
              <span className="text-base md:text-lg">19999</span>
              <div className="space-x-3 flex items-center">
                <Button
                  color="primary"
                  variant="faded"
                  size="sm"
                  isIconOnly
                  aria-label="decrease quantity"
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  -
                </Button>
                <span>1</span>
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  variant="faded"
                  aria-label="increase quantity"
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* {!isLast && <Divider className="w-[calc(100%-2rem)] mx-auto hidden md:flex"/>} */}
    </>
  );
};
export default CartItem;
