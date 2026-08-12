import { FaBoxOpen } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";

import RecommendedProducts from "@/common/RecommendedProducts";
import AccountCTA from "./components/CTA";
import AccountSecurity from "./components/AccountSecurity";
import { getUserById } from "@/actions/getUser";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { noindexRobots } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}): Promise<Metadata> {
  try {
    const user = await getUserById(params.userId);
    return {
      title: user ? `${user.username}'s Account` : "Your Account",
      description: `Manage orders, addresses, and wishlist for ${user?.username ?? "your"} wondrMart account.`,
      robots: noindexRobots,
    };
  } catch {
    return {
      title: "Your Account",
      description: "Manage your wondrMart account.",
      robots: noindexRobots,
    };
  }
}

const User = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await getUserById(userId);
  if (!user) {
    notFound();
  }
  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 lg:gap-10">
        <AccountCTA
          userId={userId}
          navigateTo="orders"
          title="Your Orders"
          subtitle="Track, return, or buy things again"
          Logo={<FaBoxOpen className="text-[#EACEB3] text-7xl" />}
        />
        <AccountCTA
          userId={userId}
          navigateTo="addresses"
          title="Your Addresses"
          subtitle="Edit addresses for orders"
          Logo={<HiLocationMarker className="text-[#e6834e] text-7xl" />}
        />
        <AccountCTA
          userId={userId}
          navigateTo="wishlist"
          title="Your Wishlist"
          subtitle="Edit, remove or add to cart"
          Logo={<FaHeart className="text-[#d24646] text-7xl" />}
        />
      </div>
      <AccountSecurity />
      <div>
        <RecommendedProducts userId={userId} />
      </div>
    </>
  );
};
export default User;
