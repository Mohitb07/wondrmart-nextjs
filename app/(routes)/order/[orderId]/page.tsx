import { serverFetchWithRefresh } from "@/lib/serverAuth";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  HiCheck,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineTruck,
  HiOutlineXCircle,
  HiOutlineShoppingBag,
  HiOutlineArrowPath,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { CartSync } from "./CartSync";
import { OrderNumberBox } from "./OrderNumberBox";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { Order } from "@/types";

type OrderVerificationPageProps = {
  params: { orderId: string };
};

export default async function OrderVerificationPage({
  params,
}: OrderVerificationPageProps) {
  const { orderId } = params;

  let order: (Order & { customer?: { email?: string; username?: string } }) | null =
    null;

  try {
    const result = await serverFetchWithRefresh<
      Order & { customer?: { email?: string; username?: string } }
    >(`/verify_order/${orderId}`);
    order = result.data;
  } catch (error: any) {
    // If the order does not exist (404) or the user is unauthorized (401/403), show 404 Not Found
    return notFound();
  }

  if (!order) {
    return notFound();
  }

  const isSuccess = order.status === "processing";
  const recipientEmail = order.customer?.email || "";
  const address = order.address;
  const customerName =
    address?.full_name || order.customer?.username || "Valued Customer";
  const orderDetailsUrl = order.customer_id
    ? `/user/${order.customer_id}/orders/${orderId}`
    : `/`;

  return (
    <div className="w-full max-w-lg mx-auto py-6 sm:py-8 px-2 sm:px-0 text-center">
      {/* Background Cart Query Cache Invalidation when order succeeds */}
      {isSuccess && <CartSync />}

      {isSuccess ? (
        /* ================= SUCCESS STATE (MATCHING DESIGN) ================= */
        <div className="space-y-6">
          {/* Top Green Round Checkmark Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
            <HiCheck className="text-2xl sm:text-3xl stroke-[2.5]" />
          </div>

          {/* Heading and Subtitle */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Thank you for your order!
            </h1>
            <p className="text-xs sm:text-sm text-default-500">
              Your order has been received and is being processed
            </p>
          </div>

          {/* Order Number Box with Copy Action */}
          <div className="flex justify-center">
            <OrderNumberBox orderId={orderId} />
          </div>

          {/* Email Confirmation Notice */}
          {recipientEmail && (
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-default-500">
              <HiOutlineEnvelope className="text-base text-default-400 shrink-0" />
              <span>
                Order confirmation sent to{" "}
                <span className="font-semibold text-foreground">
                  {recipientEmail}
                </span>
              </span>
            </div>
          )}

          {/* Order Summary Card */}
          <div className="pt-2">
            <OrderSummaryCard
              items={order.order_items || []}
              totalAmount={Number(order.order_amount || 0)}
            />
          </div>

          {/* Delivery Details Card */}
          {address && (
            <div className="w-full rounded-2xl bg-white dark:bg-neutral-900/80 border border-default-200/80 dark:border-neutral-800 shadow-sm p-4 sm:p-5 text-left space-y-4">
              <h2 className="font-bold text-sm sm:text-base text-foreground pb-2 border-b border-default-100 dark:border-neutral-800">
                Delivery Details
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Shipping to */}
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-default-100 dark:bg-neutral-800 text-default-600 dark:text-default-400 mt-0.5">
                    <HiOutlineMapPin className="text-base" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-foreground">Shipping to</p>
                    <p className="font-medium text-foreground">{customerName}</p>
                    <p className="text-default-500 leading-relaxed">
                      {address.flat_no && `${address.flat_no}, `}
                      {address.street}
                      <br />
                      {address.city}
                      {address.state && `, ${address.state}`}
                      {address.pincode && ` - ${address.pincode}`}
                      {address.country && (
                        <>
                          <br />
                          {address.country}
                        </>
                      )}
                    </p>
                    {address.phone && (
                      <p className="text-default-400 text-[11px] pt-0.5">
                        Ph: {address.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="flex items-start gap-3 pt-2 border-t border-default-100 dark:border-neutral-800/80">
                  <div className="p-1.5 rounded-lg bg-default-100 dark:bg-neutral-800 text-default-600 dark:text-default-400 mt-0.5">
                    <HiOutlineTruck className="text-base" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-foreground">Shipping method</p>
                    <p className="text-default-500">Standard Delivery (Free)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href={orderDetailsUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-semibold text-xs sm:text-sm bg-primary text-primary-foreground shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <span>View Full Order Details</span>
              <HiOutlineArrowRight className="text-base" />
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-medium text-xs sm:text-sm border border-default-300 dark:border-neutral-700 bg-transparent text-foreground hover:bg-default-100 dark:hover:bg-neutral-800/60 transition-all"
            >
              <HiOutlineShoppingBag className="text-base" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        /* ================= FAILURE / CANCELLED STATE ================= */
        <div className="space-y-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center mx-auto shadow-sm">
            <HiOutlineXCircle className="text-3xl" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Payment Unsuccessful
            </h1>
            <p className="text-xs sm:text-sm text-default-500 max-w-sm mx-auto">
              We couldn&apos;t complete your transaction. Your cart items have been saved.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-left space-y-1.5 text-xs">
            <p className="font-semibold text-rose-700 dark:text-rose-400">
              What happens next?
            </p>
            <p className="text-default-500 leading-relaxed">
              If money was deducted from your bank or card, it will be refunded
              automatically within 3–5 business days.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/cart"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-semibold text-xs sm:text-sm bg-primary text-primary-foreground shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <HiOutlineArrowPath className="text-base" />
              <span>Return to Cart & Retry</span>
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-medium text-xs sm:text-sm border border-default-300 dark:border-neutral-700 bg-transparent text-foreground hover:bg-default-100 dark:hover:bg-neutral-800/60 transition-all"
            >
              <HiOutlineShoppingBag className="text-base" />
              <span>Continue Browsing</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}