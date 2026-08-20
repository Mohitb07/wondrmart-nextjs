"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme } = useAdminAuth();
  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/register" ||
    pathname?.startsWith("/admin/register") ||
    pathname?.startsWith("/admin/forgot-password") ||
    pathname?.startsWith("/admin/reset-password") ||
    pathname?.startsWith("/admin/verify-email");
  const isDark = theme === "dark";

  if (isAuthPage) {
    return (
      <div
        className={`min-h-screen transition-colors duration-200 ${
          isDark ? "bg-black text-neutral-100" : "bg-neutral-50 text-neutral-900"
        }`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex transition-colors duration-200 ${
        isDark ? "bg-black text-neutral-100" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
