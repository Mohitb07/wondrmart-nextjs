"use client";

import React from "react";
import {
  HiOutlineShoppingBag,
  HiOutlineCube,
  HiOutlineTruck,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { FiAlertCircle, FiCheck } from "react-icons/fi";

type OrderTimelineStepperProps = {
  status: string;
  orderDate?: string;
};

const STEPS = [
  {
    id: "placed",
    title: "Order Placed",
    description: "Order confirmed & received",
    icon: HiOutlineShoppingBag,
  },
  {
    id: "processing",
    title: "Processing",
    description: "Preparing items for dispatch",
    icon: HiOutlineCube,
  },
  {
    id: "shipped",
    title: "Shipped",
    description: "Package is in transit",
    icon: HiOutlineTruck,
  },
  {
    id: "delivered",
    title: "Delivered",
    description: "Delivered to your address",
    icon: HiOutlineCheckCircle,
  },
];

const getActiveStepIndex = (status: string): number => {
  switch (status.toLowerCase()) {
    case "pending":
      return 0;
    case "processing":
      return 1;
    case "shipped":
      return 2;
    case "delivered":
      return 3;
    default:
      return 1;
  }
};

const OrderTimelineStepper: React.FC<OrderTimelineStepperProps> = ({
  status = "processing",
  orderDate,
}) => {
  const isCancelled = status.toLowerCase() === "cancelled";
  const activeIndex = getActiveStepIndex(status);

  if (isCancelled) {
    return (
      <div className="w-full p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
          <FiAlertCircle className="text-2xl" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-rose-400">Order Cancelled</h3>
          <p className="text-xs sm:text-sm text-rose-200/80">
            This order has been cancelled. If payment was deducted from your
            account, a full refund will be processed back to your original
            payment method within 3–5 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-5 sm:p-6 rounded-2xl bg-default-50/50 border border-default-200/50 dark:border-default-100/20 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight">
            Order Progress
          </h3>
          <p className="text-xs text-default-500">
            {status.toLowerCase() === "delivered"
              ? "Your package has been safely delivered"
              : "Track the real-time fulfillment status of your shipment"}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {status}
        </div>
      </div>

      <div className="relative">
        {/* Horizontal Stepper for Tablet / Desktop */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 relative">
          {/* Background connecting line */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-default-200 dark:bg-default-100/30 -z-0" />

          {/* Active progress connecting line */}
          <div
            className="absolute top-5 left-8 h-1 bg-primary transition-all duration-700 ease-out -z-0"
            style={{
              width: `${(activeIndex / (STEPS.length - 1)) * 100}%`,
            }}
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < activeIndex;
            const isCurrent = index === activeIndex;
            const isUpcoming = index > activeIndex;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? "bg-primary text-black font-bold shadow-lg shadow-primary/25"
                      : isCurrent
                      ? "bg-primary/20 text-primary border-2 border-primary ring-4 ring-primary/20 shadow-md"
                      : "bg-default-100 dark:bg-neutral-800 text-default-400 border border-default-200 dark:border-neutral-700"
                  }`}
                >
                  {isCompleted ? (
                    <FiCheck className="text-xl stroke-[3]" />
                  ) : (
                    <Icon className="text-xl" />
                  )}
                </div>

                <div className="mt-3 space-y-0.5">
                  <p
                    className={`text-xs font-bold ${
                      isCurrent || isCompleted
                        ? "text-foreground"
                        : "text-default-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-[11px] text-default-400 line-clamp-2 max-w-[130px]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vertical Stepper for Mobile View */}
        <div className="md:hidden space-y-6 relative pl-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-default-200 dark:before:bg-neutral-800">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <div key={step.id} className="relative flex items-start gap-4">
                <div
                  className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                    isCompleted
                      ? "bg-primary text-black"
                      : isCurrent
                      ? "bg-primary text-black ring-4 ring-primary/20"
                      : "bg-default-200 dark:bg-neutral-800 text-default-400"
                  }`}
                >
                  {isCompleted ? <FiCheck className="text-xs stroke-[3]" /> : <Icon className="text-xs" />}
                </div>

                <div className="space-y-0.5 pt-0.5">
                  <p
                    className={`text-sm font-bold ${
                      isCurrent || isCompleted
                        ? "text-foreground"
                        : "text-default-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-default-500">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTimelineStepper;
