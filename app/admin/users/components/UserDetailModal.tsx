"use client";

import React from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useGetAdminUserById } from "@/hooks/useAdminUsers";
import { formatPrice } from "@/lib/utils";
import {
  FiX,
  FiUser,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiCopy,
} from "react-icons/fi";
import toast from "react-hot-toast";

interface UserDetailModalProps {
  userId: string | null;
  onClose: () => void;
}

export default function UserDetailModal({
  userId,
  onClose,
}: UserDetailModalProps) {
  const { theme } = useAdminAuth();
  const isDark = theme === "dark";

  const { data, isLoading, isError } = useGetAdminUserById(
    userId || "",
    Boolean(userId)
  );

  if (!userId) return null;

  const user = data?.user;

  const handleCopyId = () => {
    if (user?.customer_id) {
      navigator.clipboard.writeText(user.customer_id);
      toast.success("Customer ID copied to clipboard!");
    }
  };

  const getStatusColor = (status: string) => {
    const s = (status || "").toUpperCase();
    if (s.includes("DELIVERED") || s.includes("COMPLETED")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    }
    if (s.includes("PENDING") || s.includes("PROCESSING")) {
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
    if (s.includes("SHIPPED") || s.includes("DISPATCHED")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
    if (s.includes("CANCELLED") || s.includes("FAILED")) {
      return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    }
    return "bg-neutral-500/10 text-neutral-400 border-neutral-500/30";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
          isDark
            ? "bg-neutral-900 border-neutral-800 text-neutral-100"
            : "bg-white border-neutral-200 text-neutral-900"
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-inherit">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-base border border-amber-500/20">
              <FiUser className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Customer Details</h2>
              <p className="text-xs opacity-50">
                Detailed profile, addresses, and order history
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-neutral-800 text-neutral-400 hover:text-white"
                : "hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs opacity-60">Loading customer profile...</p>
            </div>
          ) : isError || !user ? (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-3">
              <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Failed to load customer details. Please try again.</span>
            </div>
          ) : (
            <>
              {/* Profile Card */}
              <div
                className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDark
                    ? "bg-black/50 border-neutral-800"
                    : "bg-neutral-50 border-neutral-200"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-extrabold text-xl flex items-center justify-center shadow-md flex-shrink-0">
                    {user.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">
                      {user.username}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-xs opacity-70">
                      <FiMail className="w-3.5 h-3.5" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={handleCopyId}
                        className="inline-flex items-center gap-1 text-[10px] font-mono opacity-50 hover:opacity-100 hover:text-amber-500 transition-colors"
                        title="Click to copy ID"
                      >
                        <FiCopy className="w-3 h-3" />
                        {user.customer_id}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-inherit">
                  <div
                    className={`px-3.5 py-2 rounded-lg border text-center ${
                      isDark
                        ? "bg-neutral-900 border-neutral-800"
                        : "bg-white border-neutral-200"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">
                      Orders
                    </p>
                    <p className="text-base font-bold text-amber-500 mt-0.5">
                      {user._count?.orders ?? 0}
                    </p>
                  </div>
                  <div
                    className={`px-3.5 py-2 rounded-lg border text-center ${
                      isDark
                        ? "bg-neutral-900 border-neutral-800"
                        : "bg-white border-neutral-200"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">
                      Addresses
                    </p>
                    <p className="text-base font-bold text-emerald-400 mt-0.5">
                      {user._count?.addresses ?? 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  className={`p-3 rounded-lg border flex items-center gap-2.5 ${
                    isDark
                      ? "bg-neutral-900/60 border-neutral-800"
                      : "bg-neutral-50 border-neutral-200"
                  }`}
                >
                  <FiCalendar className="w-4 h-4 text-amber-500 opacity-80" />
                  <div>
                    <span className="opacity-50 block text-[10px] uppercase font-semibold">
                      Member Since
                    </span>
                    <span className="font-medium">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg border flex items-center gap-2.5 ${
                    isDark
                      ? "bg-neutral-900/60 border-neutral-800"
                      : "bg-neutral-50 border-neutral-200"
                  }`}
                >
                  <FiClock className="w-4 h-4 text-amber-500 opacity-80" />
                  <div>
                    <span className="opacity-50 block text-[10px] uppercase font-semibold">
                      Last Updated
                    </span>
                    <span className="font-medium">
                      {user.updatedAt
                        ? new Date(user.updatedAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Addresses Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Saved Addresses ({user.addresses?.length || 0})
                  </h4>
                </div>

                {(!user.addresses || user.addresses.length === 0) ? (
                  <div
                    className={`p-4 rounded-xl border text-center text-xs opacity-50 ${
                      isDark
                        ? "bg-neutral-900/40 border-neutral-800"
                        : "bg-neutral-50 border-neutral-200"
                    }`}
                  >
                    No saved addresses for this customer.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.address_id}
                        className={`p-3.5 rounded-xl border text-xs relative ${
                          isDark
                            ? "bg-neutral-900/60 border-neutral-800"
                            : "bg-white border-neutral-200 shadow-sm"
                        }`}
                      >
                        {addr.is_default && (
                          <span className="inline-block mb-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Default Address
                          </span>
                        )}
                        <p className="font-semibold text-sm leading-snug">
                          {addr.street || "Street address not provided"}
                        </p>
                        <p className="opacity-70 mt-1">
                          {[addr.city, addr.state, addr.postal_code]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                        {addr.country && (
                          <p className="opacity-50 text-[11px] mt-0.5">
                            {addr.country}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Orders Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiShoppingBag className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Recent Orders ({user.orders?.length || 0})
                    </h4>
                  </div>
                </div>

                {(!user.orders || user.orders.length === 0) ? (
                  <div
                    className={`p-4 rounded-xl border text-center text-xs opacity-50 ${
                      isDark
                        ? "bg-neutral-900/40 border-neutral-800"
                        : "bg-neutral-50 border-neutral-200"
                    }`}
                  >
                    No orders placed yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-inherit">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr
                          className={`border-b font-bold uppercase tracking-wider opacity-50 ${
                            isDark ? "bg-black/40 border-neutral-800" : "bg-neutral-100 border-neutral-200"
                          }`}
                        >
                          <th className="py-2.5 px-3">Order ID</th>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Payment</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-inherit">
                        {user.orders.map((ord) => (
                          <tr
                            key={ord.order_id}
                            className={`transition-colors ${
                              isDark ? "hover:bg-neutral-800/50" : "hover:bg-neutral-50"
                            }`}
                          >
                            <td className="py-2.5 px-3 font-mono font-semibold">
                              #{ord.order_id?.slice(-8) || ord.order_id}
                            </td>
                            <td className="py-2.5 px-3 opacity-70">
                              {ord.createdAt
                                ? new Date(ord.createdAt).toLocaleDateString(
                                    undefined,
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )
                                : "N/A"}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-500/10 border border-neutral-500/20">
                                {ord.payment_method || "N/A"}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(
                                  ord.status
                                )}`}
                              >
                                {ord.status || "PENDING"}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right font-bold text-amber-500">
                              {formatPrice(Number(ord.order_amount) || 0)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-inherit flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-600 text-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
