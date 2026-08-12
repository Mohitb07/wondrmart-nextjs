"use client";

import useGetUserOrders from "@/hooks/useGetUserOrders";
import Image from "next/image";
import OrderCard from "./components/OrderCard";
import Loading from "./loading";

type Props = {
  userId: string;
};

function UserOrders({ userId }: Props) {
  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useGetUserOrders(userId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <p className="text-lg text-slate-400">Failed to load orders.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary text-black font-semibold rounded-md hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    );
  }

  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <>
      {safeOrders.length > 0 ? (
        <div className="space-y-3">
          {safeOrders.map((order) => {
            const firstItem = order.order_items?.[0];
            const product = firstItem?.product;
            const username =
              order.address?.customer?.username ||
              order.address?.customer_id ||
              "Customer";

            return (
              <OrderCard
                key={order.order_id}
                orderId={order.order_id}
                orderAmount={order.order_amount}
                orderDate={order.createdAt}
                productImage={product?.image_url || ""}
                productName={product?.name || "Product"}
                productId={product?.product_id || ""}
                username={username}
              />
            );
          })}
        </div>
      ) : (
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
