"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminResetPasswordApi } from "@/api/adminApi";
import {
  FiShield,
  FiLock,
  FiMail,
  FiSun,
  FiMoon,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const resetPasswordValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function AdminResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const initialEmail = searchParams.get("email") || "";

  const { theme, toggleTheme } = useAdminAuth();
  const isDark = theme === "dark";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: initialEmail,
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setErrorMessage(null);

      if (!token) {
        setErrorMessage(
          "Reset token is missing from the link. Please request a new password reset link."
        );
        return;
      }

      try {
        await adminResetPasswordApi(
          token,
          values.email.trim(),
          values.password
        );
        setIsSuccess(true);
      } catch (err: any) {
        setErrorMessage(
          err?.response?.data?.errors?.[0]?.message ||
            err?.response?.data?.message ||
            "Failed to reset password. The link may have expired or is invalid."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (errorMessage) setErrorMessage(null);
  };

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
            Reset Admin Password
          </h1>
          <p className="text-xs mt-1 opacity-60">
            Set a new secure password for your administrator account
          </p>
        </div>

        {/* Server Error Alert */}
        {errorMessage && (
          <div className="flex items-center gap-2.5 p-3 mb-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            <FiAlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
            <span className="font-medium leading-snug">{errorMessage}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="space-y-5">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-3">
              <FiCheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-emerald-300">
                  Password Updated Successfully
                </p>
                <p className="mt-1 text-emerald-400/90 leading-relaxed">
                  Your administrator password has been updated. You can now log in with your new password.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/admin/login"
                className="w-full py-2.5 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-600 text-black text-center transition-colors flex items-center justify-center gap-2"
              >
                Sign In to Admin Workspace
              </Link>
            </div>
          </div>
        ) : !token ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs text-left flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-amber-300">
                  Invalid Reset Link
                </p>
                <p className="mt-1 text-amber-400/90 leading-relaxed">
                  The password reset link is missing a security token or is invalid. Please request a new reset link.
                </p>
              </div>
            </div>

            <Link
              href="/admin/forgot-password"
              className="w-full py-2.5 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-600 text-black text-center transition-colors block"
            >
              Request New Reset Link
            </Link>

            <div>
              <Link
                href="/admin/login"
                className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  isDark
                    ? "text-neutral-400 hover:text-neutral-200"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <FiArrowLeft className="w-3.5 h-3.5" />
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="space-y-4"
          >
            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1 transition-colors ${
                  formik.touched.email && formik.errors.email
                    ? "text-rose-400 opacity-90"
                    : "opacity-70"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <FiMail
                  className={`absolute left-3 top-2.5 w-4 h-4 transition-colors ${
                    formik.touched.email && formik.errors.email
                      ? "text-rose-400"
                      : "text-neutral-400"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@wondrmart.com"
                  value={formik.values.email}
                  onChange={handleFieldChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-9 pr-4 py-2 rounded-lg border text-xs focus:outline-none transition-colors ${
                    formik.touched.email && formik.errors.email
                      ? "bg-rose-500/5 border-rose-500 text-rose-200 placeholder-rose-400/50 focus:ring-1 focus:ring-rose-500"
                      : isDark
                      ? "bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:ring-1 focus:ring-amber-500"
                      : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:ring-1 focus:ring-amber-500"
                  }`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-[11px] text-rose-400 font-medium">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1 transition-colors ${
                  formik.touched.password && formik.errors.password
                    ? "text-rose-400 opacity-90"
                    : "opacity-70"
                }`}
              >
                New Password (min 8 chars)
              </label>
              <div className="relative">
                <FiLock
                  className={`absolute left-3 top-2.5 w-4 h-4 transition-colors ${
                    formik.touched.password && formik.errors.password
                      ? "text-rose-400"
                      : "text-neutral-400"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={handleFieldChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-9 pr-10 py-2 rounded-lg border text-xs focus:outline-none transition-colors ${
                    formik.touched.password && formik.errors.password
                      ? "bg-rose-500/5 border-rose-500 text-rose-200 placeholder-rose-400/50 focus:ring-1 focus:ring-rose-500"
                      : isDark
                      ? "bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:ring-1 focus:ring-amber-500"
                      : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:ring-1 focus:ring-amber-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`absolute right-3 top-2.5 transition-colors focus:outline-none ${
                    formik.touched.password && formik.errors.password
                      ? "text-rose-400 hover:text-rose-300"
                      : isDark
                      ? "text-neutral-400 hover:text-neutral-200"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-[11px] text-rose-400 font-medium">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1 transition-colors ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? "text-rose-400 opacity-90"
                    : "opacity-70"
                }`}
              >
                Confirm New Password
              </label>
              <div className="relative">
                <FiLock
                  className={`absolute left-3 top-2.5 w-4 h-4 transition-colors ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? "text-rose-400"
                      : "text-neutral-400"
                  }`}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formik.values.confirmPassword}
                  onChange={handleFieldChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-9 pr-10 py-2 rounded-lg border text-xs focus:outline-none transition-colors ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? "bg-rose-500/5 border-rose-500 text-rose-200 placeholder-rose-400/50 focus:ring-1 focus:ring-rose-500"
                      : isDark
                      ? "bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:ring-1 focus:ring-amber-500"
                      : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:ring-1 focus:ring-amber-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className={`absolute right-3 top-2.5 transition-colors focus:outline-none ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? "text-rose-400 hover:text-rose-300"
                      : isDark
                      ? "text-neutral-400 hover:text-neutral-200"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="mt-1 text-[11px] text-rose-400 font-medium">
                  {formik.errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full py-2.5 mt-2 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-600 text-black transition-colors disabled:opacity-50"
            >
              {formik.isSubmitting
                ? "Resetting Password..."
                : "Reset Password"}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/admin/login"
                className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  isDark
                    ? "text-neutral-400 hover:text-neutral-200"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <FiArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function AdminResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500 border-r-2" />
        </div>
      }
    >
      <AdminResetPasswordForm />
    </Suspense>
  );
}
