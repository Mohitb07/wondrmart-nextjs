import { Suspense } from "react";
import Loading from "./loading";
import UserOrders from "./Orders";
import { noindexRobots } from "@/lib/seo";

export const metadata = {
  title: "Your Orders",
  description: "Track, return, or buy things again on wondrMart.",
  robots: noindexRobots,
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
