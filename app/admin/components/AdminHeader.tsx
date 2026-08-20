"use client";

import React from "react";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminHeader() {
  const { admin, theme, toggleTheme } = useAdminAuth();
  const isDark = theme === "dark";

  return (
    <header
      className={`h-16 px-6 flex items-center justify-between border-b transition-colors duration-200 ${
        isDark
          ? "bg-black border-neutral-800 text-neutral-100"
          : "bg-white border-neutral-200 text-neutral-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <h2 className="text-base font-bold tracking-tight">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all ${
            isDark
              ? "bg-neutral-900 border-neutral-800 text-amber-400 hover:bg-neutral-800"
              : "bg-neutral-100 border-neutral-200 text-neutral-800 hover:bg-neutral-200"
          }`}
          title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
        >
          {isDark ? (
            <>
              <FiSun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <FiMoon className="w-3.5 h-3.5 text-neutral-700" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </button>

        {/* User Info pill */}
        {admin && (
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              isDark
                ? "bg-neutral-900 border-neutral-800 text-neutral-200"
                : "bg-neutral-100 border-neutral-200 text-neutral-800"
            }`}
          >
            <div className="w-5 h-5 rounded bg-amber-500 text-black flex items-center justify-center font-bold text-[10px]">
              <FiUser className="w-3 h-3" />
            </div>
            <span className="hidden md:inline">{admin.username}</span>
          </div>
        )}
      </div>
    </header>
  );
}
