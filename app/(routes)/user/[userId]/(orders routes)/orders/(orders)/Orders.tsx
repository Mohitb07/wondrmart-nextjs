"use client";

import useGetUserOrders from "@/hooks/useGetUserOrders";
import Image from "next/image";
import OrderCard from "./components/OrderCard";
import Loading from "./loading";

type Props = {
  userId: string;
};

function UserOrders({ userId }: Props) {
  const { data: orders, isLoading, isError, error } = useGetUserOrders(userId);

  if (isError) throw new Error("Failed to load orders", { cause: error });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {orders.length > 0 && (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard
              key={order.order_id}
              orderId={order.order_id}
              orderAmount={order.order_amount}
              orderDate={order.createdAt}
              productImage={order.order_items[0].product.image_url}
              productName={order.order_items[0].product.name}
              productId={order.order_items[0].product.product_id}
              username={order.address.customer.username}
            />
          ))}
        </div>
      )}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <Image alt="" height={300} width={300} src="/cart.svg" priority />
          <p className="text-lg text-center text-slate-400">
            You have no orders yet.
          </p>
        </div>
      )}
    </>
  );
}

export default UserOrders;
