"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";

type OrderCardProps = {
  orderId: string;
  isOrderDetail?: boolean;
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderId = "",
  isOrderDetail = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = () => {
    router.push(`${pathname}/${orderId}`);
  };

  return (
    <>
      <Card
        className="shadow-2xl shadow-gray-900 w-full md:border border-gray-800"
        isBlurred
      >
        <CardHeader className="hidden md:block">
          <div className="flex items-center justify-between w-full text-slate-400">
            <div className="flex items-center justify-center text-xs gap-10 text-left">
              <div>
                <h1 className="uppercase">Order Placed</h1>
                <h1>29 August 2019</h1>
              </div>
              <div>
                <h1 className="uppercase">Total</h1>
                <h1>21000.00</h1>
              </div>
              {!isOrderDetail && (
                <div>
                  <h1 className="uppercase">Ship To</h1>
                  <h1>John Doe</h1>
                </div>
              )}
            </div>
            <div className="text-left text-xs">
              <h1 className="uppercase">Order #1234331232</h1>
            </div>
          </div>
        </CardHeader>
        <Divider className="hidden md:block" />
        <CardBody className="p-1 md:p-3">
          <div className="flex items-center justify-around md:justify-between">
            <div className="flex items-center justify-between">
              <Image
                className="rounded-lg"
                src="https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg"
                alt="product image"
                width={100}
                height={100}
                priority
              />
              <div className="p-4 text-left">
                <h1 className="text-lg font-bold line-clamp-2">
                  Apple AirPods Pro (2nd Generation)
                </h1>
                <p className="text-slate-400 text-sm">Ordered on 12/12/2021</p>
              </div>
            </div>
            {!isOrderDetail && (
              <div className="md:hidden">
                <FaChevronRight className="text-slate-400" />
              </div>
            )}
            {!isOrderDetail && (
              <div className="md:block hidden">
                <Button
                  variant="solid"
                  color="primary"
                  onClick={handleNavigate}
                >
                  Order Detail
                </Button>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};
export default OrderCard;
