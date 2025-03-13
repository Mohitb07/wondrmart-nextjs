import OrderSummary from "@/app/(rest)/cart/components/Summary";
import { getUserOrder } from "@/actions/getOrder";
import { Order } from "@/types";
import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import StyledCard from "../../../../addresses/components/Card";
import { Suspense } from "react";
import Loading from "./loading";
import OrderCard from "../../(orders)/components/OrderCard";

export const metadata = {
  title: "Order Detail",
  description: "Order Detail",
};

type OrderDetailProps = {
  params: {
    userId: string;
    orderId: string;
  };
};

export default async function OrderDetail({ params }: OrderDetailProps) {
  const { userId, orderId } = params;
  let orderDetail = {} as Order;
  try {
    orderDetail = (await getUserOrder(userId, orderId)) || {};
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        notFound();
      }
    }
    throw error;
  }

  const orderItems = orderDetail.order_items || [];
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10 w-full items-stretch py-2">
          <div className="space-y-3 h-full">
            <h2 className="text-xl font-bold">Shipped To</h2>
            <StyledCard
              userId={orderDetail.customer_id}
              apartment={orderDetail.address.flat_no}
              street={orderDetail.address.street}
              country={orderDetail.address.country}
              city={orderDetail.address.city}
              state={orderDetail.address.state}
              mobile={orderDetail.address.phone}
              pincode={orderDetail.address.pincode}
              isFooterVisible={false}
              isHeaderVisible={false}
            />
          </div>
          <div className="space-y-3 h-full">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <OrderSummary
              textSize="sm"
              amountSize="base"
              totalAmount={orderDetail.order_amount}
              quantity={orderDetail.order_items.length}
            />
          </div>
        </div>
        <div className="mt-5 space-y-5">
          {/* NEED TO IMPLEMENT THIS */}
          {orderItems.map((orderItem) => (
            <OrderCard
              key={orderItem.order_item_id}
              isOrderDetail
              orderAmount={orderItem.total_amount}
              orderDate={orderItem.createdAt}
              productImage={orderItem.product.image_url}
              productName={orderItem.product.name}
              username={orderDetail.address.customer.username}
              productId={orderItem.product.product_id}
            />
          ))}
        </div>
      </div>
    </Suspense>
  );
}
