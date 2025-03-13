import { getUserOrders } from "@/actions/getOrders";
import OrderCard from "./components/OrderCard";
import { Order } from "@/types";
import { isAxiosError } from "axios";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import Image from "next/image";

export const metadata = {
  title: "Your Orders",
  description: "Track, return, or buy things again",
};

type OrdersPageProps = {
  params: {
    userId: string;
  };
};

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { userId } = params;
  let orders = [] as Order[];
  try {
    orders = (await getUserOrders(userId)) || [];
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        notFound();
      }
    }
    throw error;
  }

  return (
    <Suspense fallback={<Loading />}>
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
          <Image
            alt=""
            height={300}
            width={300}
            src="/cart.svg"

          />
          <p className="text-lg text-center text-slate-400">
            You have no orders yet.
          </p>
        </div>
      )}
    </Suspense>
  );
}
