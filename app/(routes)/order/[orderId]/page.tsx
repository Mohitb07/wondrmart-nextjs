"use client";

import { getOrderStatus } from "@/actions/getOrderStatus";
import axios from "axios";
import { notFound } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";

type OrderVerificationRootProps = {
  params: { orderId: string };
};

export default function OrderVerificationRoot({
  params,
}: OrderVerificationRootProps) {
  const { orderId } = params;
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const orderDetail = await getOrderStatus(orderId);
        setStatus(orderDetail.status);
        if (orderDetail.status === "processing") {
          queryClient.invalidateQueries({ queryKey: ["cartCount"] });
          queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        }
      } catch (error) {
        const errorCodeList = [400, 401, 403];
        if (axios.isAxiosError(error)) {
          if (errorCodeList.includes(error.response?.status as number)) {
            return notFound();
          }
          setStatus("cancelled");
        }
      }
    };
    fetchOrderStatus();
  }, [orderId, queryClient]);

  return (
    <>
      <Suspense>
        {status === "processing" && (
          <>
            <BsFillCartCheckFill className="text-6xl lg:text-7xl text-primary" />
            <h1 className="text-xl">Order Placed</h1>
            <p className="text-center text-xs text-slate-400 lg:text-sm">
              You will receive an email confirmation shortly.
            </p>
          </>
        )}

        {(status === "pending" || status === "cancelled") && (
          <>
            <BsFillCartXFill className="text-6xl lg:text-7xl text-red-500" />
            <h1 className="text-xl">Order Failed</h1>
            <p className="text-center text-xs text-slate-600 lg:text-sm">
              If the money has been deducted from your account, it will be
              refunded shortly.
            </p>
          </>
        )}
      </Suspense>
    </>
  );
}
