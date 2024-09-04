import OrderSummary from "@/app/(rest)/cart/components/Summary";
import StyledCard from "../../addresses/components/Card";
import OrderCard from "../components/OrderCard";
import { getUserOrder } from "@/actions/getOrder";

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
  const orderDetail = (await getUserOrder(userId, orderId)) || {};

  console.log("orderDetail", orderDetail);
  const orderItems = orderDetail.order_items || [];
  return (
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
            orderId="313"
            isOrderDetail
            orderAmount={orderItem.total_amount}
            orderDate={orderItem.createdAt}
            productImage={orderItem.product.image_url}
            productName={orderItem.product.name}
            username={orderDetail.address.customer.username}
          />
        ))}
      </div>
    </div>
  );
}
