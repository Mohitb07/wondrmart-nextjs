import Addresses from "./Addresses";
import { noindexRobots } from "@/lib/seo";

export const metadata = {
  title: "Your Addresses",
  description: "Manage your saved delivery addresses on wondrMart.",
  robots: noindexRobots,
};

export default async function AddressPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  return <Addresses userId={userId} />;
}
