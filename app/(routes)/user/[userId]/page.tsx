import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  HiOutlineShoppingBag,
  HiOutlineMapPin,
  HiOutlineHeart,
  HiOutlineEnvelope,
  HiOutlineCalendarDays,
  HiOutlineCheckBadge,
  HiOutlineSparkles,
} from "react-icons/hi2";
import RecommendedProducts from "@/common/RecommendedProducts";
import AccountCTA from "./components/CTA";
import AccountSecurity from "./components/AccountSecurity";
import { getUserById } from "@/actions/getUser";
import { noindexRobots } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}): Promise<Metadata> {
  try {
    const user = await getUserById(params.userId);
    return {
      title: user ? `${user.username}'s Account | wondrMart` : "Your Account | wondrMart",
      description: `Manage orders, addresses, and wishlist for ${user?.username ?? "your"} wondrMart account.`,
      robots: noindexRobots,
    };
  } catch {
    return {
      title: "Your Account | wondrMart",
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

  let memberSince = "Member";
  if (user.createdAt) {
    const d = new Date(user.createdAt);
    if (!isNaN(d.getTime())) {
      memberSince = `Member since ${d.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })}`;
    }
  }

  return (
    <div className="w-full space-y-8 pb-12 pt-2">
      {/* Account Overview Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-default-100/70 via-default-50/40 to-default-100/20 dark:from-neutral-900/80 dark:via-neutral-900/40 dark:to-neutral-950/80 border border-default-200/60 dark:border-neutral-800/80 backdrop-blur-xl shadow-xl shadow-black/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-foreground">
                Welcome back, {user.username}
              </h2>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                <HiOutlineCheckBadge className="text-sm" />
                <span>Verified Customer</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-default-500 flex-wrap">
              {user.email && (
                <span className="flex items-center gap-1.5">
                  <HiOutlineEnvelope className="text-sm text-default-400" />
                  <span className="font-medium text-foreground">{user.email}</span>
                </span>
              )}
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <HiOutlineCalendarDays className="text-sm text-default-400" />
                <span>{memberSince}</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-default-100/60 dark:bg-neutral-800/50 border border-default-200/50 dark:border-neutral-700/50 text-xs font-semibold text-default-600">
            <HiOutlineSparkles className="text-primary text-base" />
            <span>WondrMart Member Access</span>
          </div>
        </div>
      </div>

      {/* Account Feature Hub (3-Column Navigation Grid) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
            Account Navigation
          </h3>
          <p className="text-xs text-default-400">
            Manage your purchases & preferences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AccountCTA
            userId={userId}
            navigateTo="orders"
            title="Your Orders"
            subtitle="Track live packages, download PDF invoices, and reorder past purchases."
            tag="Order History"
            icon={<HiOutlineShoppingBag className="text-primary" />}
            gradient="from-primary/15 via-primary/5 to-transparent"
          />

          <AccountCTA
            userId={userId}
            navigateTo="addresses"
            title="Saved Addresses"
            subtitle="Manage delivery locations, billing details, and set default shipping address."
            tag="Shipping"
            icon={<HiOutlineMapPin className="text-amber-400" />}
            gradient="from-amber-500/15 via-amber-500/5 to-transparent"
          />

          <AccountCTA
            userId={userId}
            navigateTo="wishlist"
            title="Your Wishlist"
            subtitle="Explore saved favorites, receive price drop alerts, and quickly add to cart."
            tag="Saved Items"
            icon={<HiOutlineHeart className="text-rose-400" />}
            gradient="from-rose-500/15 via-rose-500/5 to-transparent"
          />
        </div>
      </div>

      {/* Account & Session Security Panel */}
      <AccountSecurity />

      {/* Personalized Recommendations Section */}
      <div className="pt-4">
        <RecommendedProducts userId={userId} />
      </div>
    </div>
  );
};

export default User;
