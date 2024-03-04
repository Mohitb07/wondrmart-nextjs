import OrderCard from "./components/OrderCard";

export const metadata = {
  title: "Your Orders",
  description: "Track, return, or buy things again",
};

export default function OrdersPage() {
  return (
    <div className="space-y-3">
      <OrderCard orderId="123"/>
      <OrderCard orderId="421"/>
      <OrderCard orderId="414"/>
      <OrderCard orderId="622"/>
    </div>
  );
}
