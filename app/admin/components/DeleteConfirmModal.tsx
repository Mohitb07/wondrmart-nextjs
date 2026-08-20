"use client";

import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { useAdminAuth } from "@/context/AdminAuthContext";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  productName?: string;
  isDeleting?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  const { theme } = useAdminAuth();
  const isDark = theme === "dark";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl transition-all duration-200 ${
          isDark
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-xl font-bold mb-4">
            <FiAlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className={`p-2 rounded-xl transition-colors ${
              isDark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500"
            }`}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-extrabold tracking-tight">Delete Product</h3>
        <p className="text-sm opacity-70 mt-2 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-rose-400 font-mono">
            &quot;{productName || "this product"}&quot;
          </span>
          ? This action cannot be undone.
        </p>

        <div className="pt-6 flex items-center justify-end gap-3 border-t border-inherit mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              isDark
                ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-500/25 transition-all duration-200 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
