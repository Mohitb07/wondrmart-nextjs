"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useGetAdminUsers } from "@/hooks/useAdminUsers";
import UserDetailModal from "./components/UserDetailModal";
import {
  FiUsers,
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiShoppingBag,
  FiMapPin,
  FiCalendar,
  FiRefreshCw,
} from "react-icons/fi";

export default function AdminUsersPage() {
  const router = useRouter();
  const { admin, loading, theme } = useAdminAuth();
  const isDark = theme === "dark";

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"desc" | "oldest">("desc");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !admin) {
      router.push("/admin/login");
    }
  }, [admin, loading, router]);

  // Debounce search query by 350ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setCurrentPage(1); // Reset to page 1 on new search
    }, 350);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const { data, isLoading, isFetching, refetch } = useGetAdminUsers({
    search: debouncedSearch || undefined,
    page: currentPage,
    limit: 10,
    sortby: sortBy,
  });

  const users = data?.users || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;
  const totalCount = pagination?.totalCount || 0;

  if (loading || !admin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div
        className={`p-6 rounded-xl border transition-colors ${
          isDark
            ? "bg-neutral-900 border-neutral-800 text-white"
            : "bg-white border-neutral-200 text-neutral-900 shadow-sm"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center text-lg font-bold shadow-sm">
              <FiUsers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Customer Management
              </h1>
              <p className="mt-0.5 text-xs opacity-60">
                View storefront customers, registered accounts, addresses, and order history
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              title="Refresh Customers"
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isDark
                  ? "bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-200"
                  : "bg-neutral-100 border-neutral-200 hover:bg-neutral-200 text-neutral-800"
              }`}
            >
              <FiRefreshCw
                className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 rounded-xl border flex flex-col sm:flex-row gap-3 items-center justify-between transition-colors ${
          isDark
            ? "bg-neutral-900 border-neutral-800"
            : "bg-white border-neutral-200 shadow-sm"
        }`}
      >
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <FiSearch className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={`w-full pl-10 pr-9 py-2 rounded-lg border text-xs focus:outline-none transition-colors ${
              isDark
                ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:ring-1 focus:ring-amber-500"
                : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:ring-1 focus:ring-amber-500"
            }`}
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Stats */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs opacity-50 font-medium">
            {totalCount} {totalCount === 1 ? "Customer" : "Customers"}
          </span>

          <div className="flex items-center gap-2">
            <label className="text-xs opacity-60 font-semibold hidden md:inline">
              Sort:
            </label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as "desc" | "oldest");
                setCurrentPage(1);
              }}
              className={`px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${
                isDark
                  ? "bg-neutral-800 border-neutral-700 text-neutral-200"
                  : "bg-neutral-50 border-neutral-300 text-neutral-800"
              }`}
            >
              <option value="desc">Newest Joined</option>
              <option value="oldest">Oldest Joined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div
        className={`rounded-xl border overflow-hidden transition-colors ${
          isDark
            ? "bg-neutral-900 border-neutral-800"
            : "bg-white border-neutral-200 shadow-sm"
        }`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs opacity-50">Loading customer list...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
              <FiUsers className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold">No customers found</p>
            <p className="text-xs opacity-50 mt-1">
              {debouncedSearch
                ? `No customers matched "${debouncedSearch}". Try a different keyword.`
                : "No storefront customer accounts have registered yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr
                  className={`border-b font-bold uppercase tracking-wider opacity-50 ${
                    isDark
                      ? "bg-black/30 border-neutral-800"
                      : "bg-neutral-100/70 border-neutral-200"
                  }`}
                >
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                  <th className="py-3.5 px-4 text-center">Orders</th>
                  <th className="py-3.5 px-4 text-center">Addresses</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit">
                {users.map((user) => (
                  <tr
                    key={user.customer_id}
                    className={`transition-colors ${
                      isDark
                        ? "hover:bg-neutral-800/40"
                        : "hover:bg-neutral-50/80"
                    }`}
                  >
                    {/* Customer Avatar & Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {user.username?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-tight">
                            {user.username}
                          </p>
                          <span className="text-[10px] font-mono opacity-40">
                            #{user.customer_id?.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3 px-4 font-medium opacity-80">
                      {user.email}
                    </td>

                    {/* Joined Date */}
                    <td className="py-3 px-4 opacity-70">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="w-3.5 h-3.5 opacity-50" />
                        <span>
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
                    </td>

                    {/* Orders Count */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        <FiShoppingBag className="w-3 h-3" />
                        {user._count?.orders ?? 0}
                      </span>
                    </td>

                    {/* Addresses Count */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <FiMapPin className="w-3 h-3" />
                        {user._count?.addresses ?? 0}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedUserId(user.customer_id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors ${
                          isDark
                            ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700"
                            : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200"
                        }`}
                      >
                        <FiEye className="w-3.5 h-3.5 text-amber-500" />
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div
            className={`p-4 border-t flex items-center justify-between text-xs ${
              isDark ? "border-neutral-800" : "border-neutral-200"
            }`}
          >
            <span className="opacity-50">
              Page {currentPage} of {totalPages} ({totalCount} total)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isFetching}
                className={`p-1.5 rounded-lg border transition-colors disabled:opacity-30 ${
                  isDark
                    ? "border-neutral-700 hover:bg-neutral-800"
                    : "border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-2 font-bold text-amber-500">
                {currentPage}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage >= totalPages || isFetching}
                className={`p-1.5 rounded-lg border transition-colors disabled:opacity-30 ${
                  isDark
                    ? "border-neutral-700 hover:bg-neutral-800"
                    : "border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Customer Detail Modal */}
      <UserDetailModal
        userId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />
    </div>
  );
}
