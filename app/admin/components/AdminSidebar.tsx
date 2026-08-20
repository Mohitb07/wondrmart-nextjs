"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiBox,
  FiShoppingBag,
  FiLogOut,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { admin, logout, theme } = useAdminAuth();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: FiGrid },
    { label: "Products", href: "/admin/products", icon: FiBox },
    { label: "Customers", href: "/admin/users", icon: FiUsers },
  ];

  const isDark = theme === "dark";

  return (
    <aside
      className={`w-64 flex-shrink-0 flex flex-col border-r transition-colors duration-200 ${
        isDark
          ? "bg-black border-neutral-800 text-neutral-200"
          : "bg-white border-neutral-200 text-neutral-800"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-inherit">
        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-black font-bold shadow-sm">
          <FiShield className="w-4 h-4" />
        </div>
        <div>
          <h1 className="font-bold text-base tracking-tight text-amber-500">
            WONDRMART
          </h1>
          <span className="text-[10px] font-semibold tracking-wider uppercase opacity-60">
            Admin Portal
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider opacity-40">
          Main Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 ${
                isActive
                  ? isDark
                    ? "bg-neutral-800 text-white font-semibold border border-neutral-700"
                    : "bg-neutral-100 text-neutral-900 font-semibold border border-neutral-200"
                  : isDark
                  ? "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive
                    ? "text-amber-500"
                    : ""
                }`}
              />
              {item.label}
            </Link>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[11px] font-bold uppercase tracking-wider opacity-40">
          Quick Links
        </div>
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 ${
            isDark
              ? "text-neutral-400 hover:text-white hover:bg-neutral-900"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
          }`}
        >
          <FiShoppingBag className="w-4 h-4" />
          View Storefront
        </Link>
      </nav>

      {/* User Profile & Logout */}
      {admin && (
        <div className="p-4 border-t border-inherit">
          <div
            className={`p-3 rounded-lg flex items-center justify-between border ${
              isDark
                ? "bg-neutral-900 border-neutral-800"
                : "bg-neutral-50 border-neutral-200"
            }`}
          >
            <div className="min-w-0 pr-2">
              <p className="text-sm font-semibold truncate">{admin.username}</p>
              <p className="text-xs opacity-50 truncate">{admin.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold tracking-wider rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                {admin.role}
              </span>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className={`p-2 rounded-md transition-colors ${
                isDark
                  ? "text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10"
                  : "text-neutral-500 hover:text-rose-600 hover:bg-rose-50"
              }`}
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
