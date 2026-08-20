"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import AdminRegisterForm from "../components/auth/AdminRegisterForm";
import { FiShield, FiSun, FiMoon } from "react-icons/fi";

export default function AdminRegisterPage() {
  const router = useRouter();
  const { admin, theme, toggleTheme } = useAdminAuth();
  const isDark = theme === "dark";

  useEffect(() => {
    if (admin) {
      router.push("/admin");
    }
  }, [admin, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Theme toggle button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all ${
            isDark
              ? "bg-neutral-900 border-neutral-800 text-amber-400 hover:bg-neutral-800"
              : "bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-100 shadow-sm"
          }`}
        >
          {isDark ? (
            <FiSun className="w-3.5 h-3.5" />
          ) : (
            <FiMoon className="w-3.5 h-3.5" />
          )}
          <span className="uppercase font-bold tracking-wider">
            {isDark ? "Light" : "Dark"}
          </span>
        </button>
      </div>

      {/* Main Card */}
      <div
        className={`w-full max-w-md p-8 rounded-xl border shadow-xl relative z-10 transition-colors duration-200 ${
          isDark
            ? "bg-neutral-900 border-neutral-800 text-neutral-100"
            : "bg-white border-neutral-200 text-neutral-900"
        }`}
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-amber-500 text-black flex items-center justify-center text-xl font-bold shadow-sm">
            <FiShield className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Create Admin Account
          </h1>
          <p className="text-xs mt-1 opacity-60">
            Register credentials for administrator access
          </p>
        </div>

        {/* Tab switch */}
        <div
          className={`flex rounded-lg p-1 mb-6 border ${
            isDark
              ? "bg-black border-neutral-800"
              : "bg-neutral-100 border-neutral-200"
          }`}
        >
          <Link
            href="/admin/login"
            className={`flex-1 py-1.5 text-xs font-bold rounded text-center transition-all ${
              isDark
                ? "text-neutral-400 hover:text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            SIGN IN
          </Link>
          <span className="flex-1 py-1.5 text-xs font-bold rounded text-center bg-amber-500 text-black shadow-sm">
            REGISTER
          </span>
        </div>

        {/* Dedicated Register Form */}
        <AdminRegisterForm
          onSuccessProceedToLogin={() => router.push("/admin/login")}
        />
      </div>
    </div>
  );
}
