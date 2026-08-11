import { Suspense } from "react";
import Loading from "./loading";
import UserOrders from "./Orders";

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
  return <UserOrders userId={userId} />;
}
