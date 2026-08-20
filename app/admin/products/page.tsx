"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  useGetAdminProducts,
  useCreateAdminProduct,
  useUpdateAdminProduct,
  useDeleteAdminProduct,
} from "@/hooks/useAdminProducts";
import { AdminProduct, CreateProductPayload } from "@/types/admin";
import ProductModal from "../components/ProductModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import AdminProductImage from "../components/AdminProductImage";
import { formatPrice } from "@/lib/utils";
import {
  FiBox,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
} from "react-icons/fi";

export default function AdminProductsPage() {
  const router = useRouter();
  const { admin, loading, theme } = useAdminAuth();
  const isDark = theme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [page, setPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Delete Modal State
  const [deletingProduct, setDeletingProduct] = useState<AdminProduct | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !admin) {
      router.push("/admin/login");
    }
  }, [admin, loading, router]);

  // React Query Hook for products data
  const {
    data,
    isLoading: isProductsLoading,
    isFetching,
    refetch,
  } = useGetAdminProducts({
    query: activeQuery,
    page,
    limit: 10,
  });

  // React Query Mutations
  const createMutation = useCreateAdminProduct();
  const updateMutation = useUpdateAdminProduct();
  const deleteMutation = useDeleteAdminProduct();

  const products = data?.products || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const totalCount = data?.pagination?.totalCount || 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setActiveQuery(searchQuery);
  };

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (payload: CreateProductPayload) => {
    if (editingProduct) {
      await updateMutation.mutateAsync({
        productId: editingProduct.product_id,
        payload,
      });
    } else {
      await createMutation.mutateAsync(payload);
    }
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = (product: AdminProduct) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    await deleteMutation.mutateAsync(deletingProduct.product_id);
    setIsDeleteModalOpen(false);
    setDeletingProduct(null);
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
      {/* Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FiBox className="w-5 h-5 text-amber-500" /> Product Inventory
          </h1>
          <p className="text-xs opacity-60 mt-1">
            Total {totalCount} product{totalCount === 1 ? "" : "s"} found
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            className={`p-2 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-colors ${
              isDark
                ? "bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-300"
                : "bg-white border-neutral-200 hover:bg-neutral-100 text-neutral-700 shadow-sm"
            }`}
            title="Refresh list"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs bg-amber-500 hover:bg-amber-600 text-black transition-colors"
          >
            <FiPlus className="w-3.5 h-3.5" /> Add Product
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div
        className={`p-4 rounded-xl border transition-colors ${
          isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"
        }`}
      >
        <form onSubmit={handleSearchSubmit} className="flex gap-2.5">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-2.5 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${
                isDark
                  ? "bg-neutral-800/80 border-neutral-700 text-neutral-100 placeholder-neutral-500"
                  : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
              }`}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-semibold text-xs bg-amber-500 hover:bg-amber-600 text-black transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Products Table Card */}
      <div
        className={`rounded-xl border overflow-hidden transition-colors ${
          isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"
        }`}
      >
        {isProductsLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FiBox className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold">No Products Found</h3>
            <p className="text-xs opacity-50 mt-1 max-w-sm mx-auto">
              {activeQuery
                ? `No products matched "${activeQuery}". Try a different query.`
                : "Your inventory is currently empty. Click 'Add Product' to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b font-bold uppercase tracking-wider opacity-50 ${
                  isDark ? "bg-neutral-900 border-neutral-800" : "bg-neutral-50 border-neutral-200"
                }`}
              >
                <tr>
                  <th className="py-3 px-5">Image</th>
                  <th className="py-3 px-5">Product Details</th>
                  <th className="py-3 px-5">Price</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit">
                {products.map((product) => (
                  <tr
                    key={product.product_id}
                    className={`transition-colors ${
                      isDark ? "hover:bg-neutral-800/50" : "hover:bg-neutral-50"
                    }`}
                  >
                    <td className="py-3 px-5">
                      <div className="w-12 h-12 rounded overflow-hidden border border-inherit bg-neutral-800 flex items-center justify-center">
                        <AdminProductImage
                          imageUrl={product.image_url}
                          alt={product.name}
                          width={150}
                          height={150}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-5 max-w-md">
                      <p className="font-bold text-sm">{product.name}</p>
                      <p className="text-xs opacity-60 line-clamp-2 mt-0.5">
                        {product.description}
                      </p>
                    </td>
                    <td className="py-3 px-5 font-bold text-sm text-amber-500">
                      {formatPrice(Number(product.price))}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className={`p-1.5 rounded border transition-colors ${
                            isDark
                              ? "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
                              : "bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200"
                          }`}
                          title="Edit product"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(product)}
                          disabled={deleteMutation.isLoading}
                          className={`p-1.5 rounded border transition-colors disabled:opacity-40 ${
                            isDark
                              ? "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                              : "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100"
                          }`}
                          title="Delete product"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div
            className={`px-5 py-3 border-t flex items-center justify-between text-xs font-semibold ${
              isDark ? "border-neutral-800 text-neutral-400" : "border-neutral-200 text-neutral-600"
            }`}
          >
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className={`p-1.5 rounded border transition-colors disabled:opacity-30 ${
                  isDark ? "bg-neutral-800 border-neutral-700" : "bg-neutral-100 border-neutral-200"
                }`}
              >
                <FiChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className={`p-1.5 rounded border transition-colors disabled:opacity-30 ${
                  isDark ? "bg-neutral-800 border-neutral-700" : "bg-neutral-100 border-neutral-200"
                }`}
              >
                <FiChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Create / Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveProduct}
        initialData={editingProduct}
        title={editingProduct ? "Edit Product" : "Create New Product"}
      />

      {/* Product Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingProduct(null);
        }}
        onConfirm={handleConfirmDelete}
        productName={deletingProduct?.name}
        isDeleting={deleteMutation.isLoading}
      />
    </div>
  );
}
