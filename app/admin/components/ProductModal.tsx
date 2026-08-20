"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiPackage } from "react-icons/fi";
import { AdminProduct, CreateProductPayload } from "@/types/admin";
import { useAdminAuth } from "@/context/AdminAuthContext";
import toast from "react-hot-toast";
import MarkdownEditor from "./MarkdownEditor";
import AdminProductImage from "./AdminProductImage";
import { convertHtmlToMarkdown } from "@/lib/utils";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateProductPayload) => Promise<void>;
  initialData?: AdminProduct | null;
  title: string;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: ProductModalProps) {
  const { theme } = useAdminAuth();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState<CreateProductPayload>({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: convertHtmlToMarkdown(initialData.description || ""),
        price: initialData.price || "",
        image_url: initialData.image_url || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        image_url: "",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.image_url
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        ...formData,
        price: Number(formData.price),
      });
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-3xl max-h-[92vh] flex flex-col rounded-xl border shadow-2xl overflow-hidden transition-all duration-200 ${
          isDark
            ? "bg-neutral-900 border-neutral-800 text-neutral-100"
            : "bg-white border-neutral-200 text-neutral-900"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-inherit flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <FiPackage className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-neutral-800 text-neutral-400"
                : "hover:bg-neutral-100 text-neutral-500"
            }`}
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 flex-1 overflow-y-auto"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">
              Product Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Wireless Noise-Canceling Headphones"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-3.5 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${
                isDark
                  ? "bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500"
                  : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">
              Price (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="e.g. 143990"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className={`w-full px-3.5 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${
                isDark
                  ? "bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500"
                  : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">
              Image URL / Cloudinary ID *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="e.g. https://example.com/product.jpg or Cloudinary ID"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                className={`w-full px-3.5 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${
                  isDark
                    ? "bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500"
                    : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"
                }`}
              />
            </div>

            {formData.image_url && (
              <div className="mt-2.5 relative h-28 rounded-lg overflow-hidden border border-inherit bg-neutral-800/40 flex items-center justify-center">
                <AdminProductImage
                  imageUrl={formData.image_url}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">
              Description (Markdown Supported) *
            </label>
            <MarkdownEditor
              value={formData.description}
              onChange={(val) => setFormData({ ...formData, description: val })}
              isDark={isDark}
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-inherit">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                isDark
                  ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-lg font-semibold text-xs bg-amber-500 hover:bg-amber-600 text-black transition-colors disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : initialData
                  ? "Update Product"
                  : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
