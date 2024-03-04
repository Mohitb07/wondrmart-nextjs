import OrderSummary from "@/app/(rest)/cart/components/Summary";
import StyledCard from "../../addresses/components/Card";
import OrderCard from "../components/OrderCard";

export const metadata = {
  title: "Order Detail",
  description: "Order Detail",
};

type OrderDetailProps = {
  params: {
    orderId: string;
  };
};

export default function OrderDetail({ params }: OrderDetailProps) {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10 w-full ">
        <div className="space-y-3  h-full">
          <h2 className="text-xl font-bold">Shipped To</h2>
          <StyledCard isFooterVisible={false} isHeaderVisible={false} />
        </div>
        <div className="space-y-3 h-full">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <OrderSummary textSize="sm" amountSize="base" totalAmount={0}/>
        </div>
      </div>
      <div className="mt-5 space-y-5">
        <OrderCard orderId="313" isOrderDetail />
        <OrderCard orderId="313312" isOrderDetail />
        <OrderCard orderId="31351" isOrderDetail />
        <OrderCard orderId="31351" isOrderDetail />
        <OrderCard orderId="31351" isOrderDetail />
        <OrderCard orderId="31351" isOrderDetail />
        <OrderCard orderId="31351" isOrderDetail />
        <OrderCard orderId="31351" isOrderDetail />
        <OrderCard orderId="31351" isOrderDetail />
      </div>
    </div>
  );
}
