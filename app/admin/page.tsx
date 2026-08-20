"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  useGetAdminProducts,
  useCreateAdminProduct,
} from "@/hooks/useAdminProducts";
import { useGetAdminUsers } from "@/hooks/useAdminUsers";
import ProductModal from "./components/ProductModal";
import AdminProductImage from "./components/AdminProductImage";
import { formatPrice } from "@/lib/utils";
import {
  FiBox,
  FiShield,
  FiPlus,
  FiExternalLink,
  FiActivity,
  FiLayers,
  FiUsers,
} from "react-icons/fi";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { admin, loading, theme } = useAdminAuth();
  const isDark = theme === "dark";

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !admin) {
      router.push("/admin/login");
    }
  }, [admin, loading, router]);

  // Fetch recent products using React Query
  const { data, isLoading: isProductsLoading } = useGetAdminProducts({
    limit: 5,
  });

  // Fetch customer count using React Query
  const { data: usersData, isLoading: isUsersLoading } = useGetAdminUsers({
    limit: 1,
  });

  const createMutation = useCreateAdminProduct();

  const recentProducts = data?.products || [];
  const productsCount = data?.pagination?.totalCount ?? 0;
  const customersCount = usersData?.pagination?.totalCount ?? 0;

  const handleCreateProduct = async (payload: any) => {
    await createMutation.mutateAsync(payload);
    setIsModalOpen(false);
  };

  if (loading || !admin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header Card */}
      <div
        className={`p-6 rounded-xl border transition-colors ${
          isDark
            ? "bg-neutral-900 border-neutral-800 text-white"
            : "bg-white border-neutral-200 text-neutral-900 shadow-sm"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] font-bold uppercase tracking-wider rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {admin.role} ACCOUNT
            </span>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome, {admin.username}
            </h1>
            <p className="mt-1 text-xs opacity-60">
              Manage inventory, customer accounts, and store operations.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs bg-amber-500 hover:bg-amber-600 text-black transition-colors"
            >
              <FiPlus className="w-3.5 h-3.5" />
              Add Product
            </button>
            <Link
              href="/admin/products"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs border transition-colors ${
                isDark
                  ? "bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                  : "bg-neutral-100 border-neutral-200 text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              <FiBox className="w-3.5 h-3.5" />
              Manage Products
            </Link>
            <Link
              href="/admin/users"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs border transition-colors ${
                isDark
                  ? "bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                  : "bg-neutral-100 border-neutral-200 text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              <FiUsers className="w-3.5 h-3.5 text-amber-500" />
              Manage Customers
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div
          className={`p-5 rounded-xl border transition-colors ${
            isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-50">
              Total Products
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <FiBox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">
              {isProductsLoading ? "..." : productsCount}
            </p>
            <p className="text-xs opacity-40 mt-0.5">Active catalog items</p>
          </div>
        </div>

        {/* Total Customers */}
        <Link
          href="/admin/users"
          className={`p-5 rounded-xl border block transition-colors group ${
            isDark
              ? "bg-neutral-900 border-neutral-800 hover:border-amber-500/50"
              : "bg-white border-neutral-200 hover:border-amber-500/50 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-50">
              Total Customers
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
              <FiUsers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-amber-500">
              {isUsersLoading ? "..." : customersCount}
            </p>
            <p className="text-xs opacity-40 mt-0.5 group-hover:text-amber-400 transition-colors">
              Registered storefront users →
            </p>
          </div>
        </Link>

        {/* Admin Session */}
        <div
          className={`p-5 rounded-xl border transition-colors ${
            isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-50">
              Admin Session
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <FiShield className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-emerald-500">Active</p>
            <p className="text-xs opacity-40 mt-0.5 truncate">{admin.email}</p>
          </div>
        </div>

        {/* API Status */}
        <div
          className={`p-5 rounded-xl border transition-colors ${
            isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-50">
              API Status
            </span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <FiActivity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-blue-500">Connected</p>
            <p className="text-xs opacity-40 mt-0.5">OMS Backend Service</p>
          </div>
        </div>
      </div>

      {/* Recent Products Overview */}
      <div
        className={`p-5 rounded-xl border transition-colors ${
          isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiLayers className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-bold">Recent Products</h2>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1"
          >
            View All <FiExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {isProductsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recentProducts.length === 0 ? (
          <div className="text-center py-8 text-neutral-400 text-xs">
            No products found. Click &quot;Add Product&quot; to create your first product.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr
                  className={`border-b font-bold uppercase tracking-wider opacity-50 ${
                    isDark ? "border-neutral-800" : "border-neutral-200"
                  }`}
                >
                  <th className="pb-2 px-2">Image</th>
                  <th className="pb-2 px-2">Product Name</th>
                  <th className="pb-2 px-2">Price</th>
                  <th className="pb-2 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit">
                {recentProducts.map((p) => (
                  <tr key={p.product_id} className="group">
                    <td className="py-2.5 px-2">
                      <div className="w-9 h-9 rounded overflow-hidden border border-inherit bg-neutral-800 flex items-center justify-center">
                        <AdminProductImage
                          imageUrl={p.image_url}
                          alt={p.name}
                          width={100}
                          height={100}
                        />
                      </div>
                    </td>

                    <td className="py-2.5 px-2 font-semibold truncate max-w-xs">{p.name}</td>
                    <td className="py-2.5 px-2 font-bold text-amber-500">
                      {formatPrice(Number(p.price))}
                    </td>

                    <td className="py-2.5 px-2 text-right">
                      <Link
                        href="/admin/products"
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded border transition-colors ${
                          isDark
                            ? "bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-200"
                            : "bg-neutral-100 border-neutral-200 hover:bg-neutral-200 text-neutral-800"
                        }`}
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProduct}
        title="Create New Product"
      />
    </div>
  );
}
