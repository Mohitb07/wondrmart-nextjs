"use client";

import { cloudinaryImage } from "@/utils/cloudinaryImage";
import { formatPrice } from "@/utils/formatPrice";
import { AdvancedImage } from "@cloudinary/react";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";

type OrderCardProps = {
  orderId: string;
  isOrderDetail?: boolean;
  orderDate: string;
  orderAmount: string;
  productImage: string;
  productName: string;
  username: string;
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderId = "",
  isOrderDetail = false,
  orderDate,
  orderAmount,
  username,
  productImage,
  productName,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const orderPlacedOn = new Date(orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  console.log(orderPlacedOn); // Output: Aug 28, 2024

  const totalAmount = formatPrice(Number(orderAmount));
  const productShowCaseImage = cloudinaryImage({
    imageUrl: productImage,
    height: 100,
    width: 100,
  });

  const handleNavigate = () => {
    router.push(`${pathname}/${orderId}`);
  };

  return (
    <Card
      className="shadow-2xl shadow-gray-900 w-full border border-gray-800 py-2 md:py-0"
      isBlurred
    >
      <CardHeader className="block">
        <div className="flex items-center justify-between w-full text-slate-400">
          <div className="flex items-center justify-center text-xs gap-10 text-left">
            <div>
              <h1 className="uppercase">Order Placed</h1>
              <h1>{orderPlacedOn}</h1>
            </div>
            <div>
              <h1 className="uppercase">Total</h1>
              <h1>{totalAmount}</h1>
            </div>
            {!isOrderDetail && (
              <div>
                <h1 className="uppercase">Ship To</h1>
                <h1>{username}</h1>
              </div>
            )}
          </div>
          <div className="text-left text-xs">
            <h1 className="uppercase">Order #{orderId}</h1>
          </div>
        </div>
      </CardHeader>
      <Divider className="my-1" />
      <CardBody className="p-1 md:p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <AdvancedImage
              cldImg={productShowCaseImage}
              // plugins={[placeholder({ mode: "blur" })]}
            />
            <div className="p-4 text-left space-y-2">
              <h1 className="text-base font-bold line-clamp-2">
                {productName}
              </h1>
              {/* <p className="text-slate-400 text-xs block md:hidden">
                Ordered on {orderPlacedOn}
              </p> */}
            </div>
          </div>
          {!isOrderDetail && (
            <div className="md:hidden">
              <FaChevronRight className="text-slate-400" />
            </div>
          )}
          {!isOrderDetail && (
            <div className="md:block hidden">
              <Button variant="solid" color="primary" onClick={handleNavigate}>
                Order Detail
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
export default OrderCard;
