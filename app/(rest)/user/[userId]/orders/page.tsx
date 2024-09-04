import { getUserOrders } from "@/actions/getOrders";
import OrderCard from "./components/OrderCard";

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
  const orders = (await getUserOrders(userId)) || [];

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard
          key={order.order_id}
          orderId={order.order_id}
          orderAmount={order.order_amount}
          orderDate={order.createdAt}
          productImage={order.order_items[0].product.image_url}
          productName={order.order_items[0].product.name}
          username={order.address.customer.username}
        />
      ))}
    </div>
  );
}
