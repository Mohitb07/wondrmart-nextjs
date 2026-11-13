import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import { getUserOrder } from "@/actions/getOrder";
import { formatPrice } from "@/lib/utils";
import { REGIONS_COUNTRIES } from "@/constants";
import { Order } from "@/types";
import {
  HiOutlineMapPin,
  HiOutlineReceiptPercent,
  HiOutlineCreditCard,
  HiOutlineShoppingBag,
  HiOutlineShieldCheck,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import Loading from "./loading";
import DownloadInvoiceButton from "../components/DownloadInvoiceButton";
import OrderTimelineStepper from "../components/OrderTimelineStepper";
import OrderItemRow from "../components/OrderItemRow";

export const metadata = {
  title: "Order Details | wondrMart",
  description: "View comprehensive details, track fulfillment progress, and download invoices for your order.",
};

type OrderDetailProps = {
  params: {
    userId: string;
    orderId: string;
  };
};

const getFormattedLocation = (countryCode?: string, stateCode?: string) => {
  if (!countryCode) return { countryName: "", stateName: stateCode || "" };
  const regionObj = REGIONS_COUNTRIES.find(
    (rc) => rc.countryShortCode === countryCode || rc.countryName === countryCode
  );
  if (!regionObj) return { countryName: countryCode, stateName: stateCode || "" };
  const stateObj = regionObj.regions.find(
    (r) => r.shortCode === stateCode || r.name === stateCode
  );
  return {
    countryName: regionObj.countryName,
    stateName: stateObj ? stateObj.name : stateCode || "",
  };
};

export default async function OrderDetail({ params }: OrderDetailProps) {
  const { userId, orderId } = params;
  let orderDetail = {} as Order;

  try {
    orderDetail = (await getUserOrder(userId, orderId)) || {};
  } catch (error: any) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    if (error?.message?.includes("404")) {
      notFound();
    }
    throw error;
  }

  const orderItems = orderDetail.order_items || [];
  const address = orderDetail.address;
  const { countryName, stateName } = getFormattedLocation(
    address?.country,
    address?.state
  );

  const totalAmount = formatPrice(Number(orderDetail.order_amount) || 0);

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full space-y-6 pb-12 pt-2">
        {/* Fulfillment Stepper */}
        <OrderTimelineStepper
          status={orderDetail.status || "processing"}
          orderDate={orderDetail.createdAt}
        />

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left 2 Columns: Items List & Shipping Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Purchased Items Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-default-50/50 dark:bg-neutral-900/50 border border-default-200/60 dark:border-neutral-800/80 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-default-200/60 dark:border-neutral-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <HiOutlineShoppingBag className="text-lg" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold">
                      Purchased Items
                    </h2>
                    <p className="text-xs text-default-400">
                      {orderItems.length} products included in this order
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-default-100 dark:divide-neutral-800/60">
                {orderItems.map((item, index) => (
                  <OrderItemRow
                    key={item.order_item_id || index}
                    item={item}
                    isLast={index === orderItems.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Shipping & Delivery Address Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-default-50/50 dark:bg-neutral-900/50 border border-default-200/60 dark:border-neutral-800/80 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-default-200/60 dark:border-neutral-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <HiOutlineMapPin className="text-lg" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold">
                      Delivery Address
                    </h2>
                    <p className="text-xs text-default-400">
                      Shipped to the specified recipient location
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-default-100 dark:bg-neutral-800 text-default-600">
                  Standard Delivery
                </span>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5 text-sm">
                  <p className="text-xs uppercase font-bold tracking-wider text-default-400">
                    Recipient
                  </p>
                  <p className="font-bold text-base text-foreground">
                    {address?.full_name ||
                      address?.customer?.username ||
                      "Valued Customer"}
                  </p>
                  {address?.phone && (
                    <p className="text-xs text-default-500">
                      Ph: <span className="font-medium text-foreground">{address.phone}</span>
                    </p>
                  )}
                  {address?.customer?.email && (
                    <p className="text-xs text-default-500">
                      Email: <span className="font-medium text-foreground">{address.customer.email}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 text-sm">
                  <p className="text-xs uppercase font-bold tracking-wider text-default-400">
                    Shipping Address
                  </p>
                  <p className="text-foreground leading-relaxed text-sm">
                    {address?.flat_no && <span>{address.flat_no}, </span>}
                    {address?.street && <span>{address.street}, </span>}
                    <br />
                    {address?.city && <span>{address.city}, </span>}
                    {stateName || address?.state ? (
                      <span>{stateName || address?.state} </span>
                    ) : null}
                    {address?.pincode && <span>- {address.pincode}</span>}
                    <br />
                    {countryName || address?.country ? (
                      <span className="font-semibold">{countryName || address?.country}</span>
                    ) : null}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-default-200/50 dark:border-neutral-800/60 flex items-center gap-2 text-xs text-default-500">
                <HiOutlineShieldCheck className="text-lg text-primary shrink-0" />
                <span>
                  All shipments are insured and handled under Wondrmart SafeDelivery Guarantee.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Actions */}
          <div className="space-y-6">
            {/* Payment & Total Breakdown */}
            <div className="p-5 sm:p-6 rounded-2xl bg-default-50/50 dark:bg-neutral-900/50 border border-default-200/60 dark:border-neutral-800/80 backdrop-blur-md space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-default-200/60 dark:border-neutral-800/80">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <HiOutlineReceiptPercent className="text-lg" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold">
                    Order Summary
                  </h2>
                  <p className="text-xs text-default-400">
                    Complete price breakdown
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-default-500">
                  <span>Items Subtotal ({orderItems.length})</span>
                  <span className="font-semibold text-foreground">{totalAmount}</span>
                </div>

                <div className="flex justify-between items-center text-default-500">
                  <span>Discount</span>
                  <span className="text-emerald-500 font-semibold">-₹ 0.00</span>
                </div>

                <div className="flex justify-between items-center text-default-500">
                  <span>Shipping & Handling</span>
                  <span className="text-emerald-500 font-semibold uppercase text-xs px-2 py-0.5 rounded bg-emerald-500/10">
                    FREE
                  </span>
                </div>

                <div className="h-px w-full bg-default-200/60 dark:border-neutral-800/80 my-2" />

                <div className="flex justify-between items-center text-base sm:text-lg font-black">
                  <span>Total Amount</span>
                  <span className="text-primary text-xl font-bold">{totalAmount}</span>
                </div>
              </div>

              {/* Payment Method Details */}
              <div className="p-3.5 rounded-xl bg-default-100/70 dark:bg-neutral-800/60 border border-default-200/50 dark:border-neutral-700/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <HiOutlineCreditCard className="text-lg text-primary" />
                  <div>
                    <p className="font-bold text-foreground">Payment Method</p>
                    <p className="text-default-400">Online Card / Electronic</p>
                  </div>
                </div>
                <span className="font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Verified
                </span>
              </div>
            </div>

            {/* Quick Actions Hub */}
            <div className="p-5 sm:p-6 rounded-2xl bg-default-50/50 dark:bg-neutral-900/50 border border-default-200/60 dark:border-neutral-800/80 backdrop-blur-md space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-default-400 mb-2">
                Order Actions
              </h3>

              <DownloadInvoiceButton
                orderId={orderId}
                variant="bordered"
                className="w-full justify-center border-default-300 dark:border-neutral-700 font-semibold hover:border-primary hover:text-primary transition-all"
              />

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-semibold text-default-500 hover:text-foreground hover:bg-default-100 dark:hover:bg-neutral-800/60 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Help / Support Card */}
            <div className="p-4 rounded-2xl bg-default-100/40 dark:bg-neutral-900/30 border border-default-200/40 dark:border-neutral-800/40 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <HiOutlineChatBubbleLeftRight className="text-base text-primary" />
                <span>Need help with this order?</span>
              </div>
              <p className="text-default-400 leading-relaxed">
                Have questions about your order or need to request a replacement?
                Our 24/7 customer support team is here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
