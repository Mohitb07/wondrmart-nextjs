import Container from "@/common/Container";
import { noindexRobots } from "@/lib/seo";

export const metadata = {
  title: "Your Wishlist",
  description: "View and manage your saved wishlist items on wondrMart.",
  robots: noindexRobots,
};

export default async function WishlistPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center ">Coming Soon...</h1>
    </div>
  );
}
