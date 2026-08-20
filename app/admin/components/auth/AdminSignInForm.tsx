"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminResendVerificationApi } from "@/api/adminApi";
import {
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import toast from "react-hot-toast";

const signInValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required"),
});

export default function AdminSignInForm() {
  const router = useRouter();
  const { login, theme } = useAdminAuth();
  const isDark = theme === "dark";

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isUnverifiedError, setIsUnverifiedError] = useState(false);

  // Resend verification states for unverified account attempts
  const [resending, setResending] = useState(false);
  const [resendFeedback, setResendFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setAuthError(null);
      setIsUnverifiedError(false);
      setResendFeedback(null);

      try {
        await login(values.email.trim(), values.password);
        toast.success("Admin logged in successfully!");
        router.push("/admin");
      } catch (err: any) {
        const errMsg =
          err?.response?.data?.errors?.[0]?.message ||
          err?.response?.data?.message ||
          "Invalid email or password";
        const isForbidden =
          err?.response?.status === 403 ||
          errMsg.toLowerCase().includes("verify your email");

        if (isForbidden) {
          setIsUnverifiedError(true);
        }
        setAuthError(errMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (authError) {
      setAuthError(null);
      setIsUnverifiedError(false);
    }
  };

  const handleResend = async () => {
    const targetEmail = formik.values.email.trim();
    if (!targetEmail) return;
    setResending(true);
    setResendFeedback(null);
    try {
      const res = await adminResendVerificationApi(targetEmail);
      setResendFeedback({
        type: "success",
        message:
          res.message ||
          "A fresh verification email has been sent. Please check your inbox.",
      });
    } catch (err: any) {
      setResendFeedback({
        type: "error",
        message:
          err?.response?.data?.errors?.[0]?.message ||
          err?.response?.data?.message ||
          "Failed to resend verification email. Please try again.",
      });
    } finally {
      setResending(false);
    }
  };

  const isEmailError =
    (formik.touched.email && Boolean(formik.errors.email)) || Boolean(authError);
  const isPasswordError =
    (formik.touched.password && Boolean(formik.errors.password)) || Boolean(authError);

  return (
    <div className="space-y-4">
      {/* Error Banner */}
      {authError && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs space-y-2">
          <div className="flex items-center gap-2.5">
            <FiAlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
            <span className="font-medium leading-snug">{authError}</span>
          </div>

          {/* Unverified prompt with inline resend action */}
          {isUnverifiedError && formik.values.email && (
            <div className="pt-1 flex items-center justify-between border-t border-rose-500/20">
              <span className="text-[11px] opacity-80">
                Didn't get the email?
              </span>
              <button
                type="button"
                disabled={resending}
                onClick={handleResend}
                className="text-[11px] font-bold text-amber-500 hover:text-amber-400 hover:underline flex items-center gap-1"
              >
                <FiRefreshCw
                  className={`w-3 h-3 ${resending ? "animate-spin" : ""}`}
                />
                Resend Link
              </button>
            </div>
          )}
        </div>
      )}

      {/* Resend Status Feedback */}
      {resendFeedback && (
        <div
          className={`p-3 rounded-lg text-xs leading-snug ${
            resendFeedback.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
          }`}
        >
          {resendFeedback.message}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        {/* Email Address */}
        <div>
          <label
            className={`block text-xs font-semibold uppercase tracking-wider mb-1 transition-colors ${
              isEmailError ? "text-rose-400 opacity-90" : "opacity-70"
            }`}
          >
            Email Address
          </label>
          <div className="relative">
            <FiMail
              className={`absolute left-3 top-2.5 w-4 h-4 transition-colors ${
                isEmailError ? "text-rose-400" : "text-neutral-400"
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
                isEmailError
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

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              className={`block text-xs font-semibold uppercase tracking-wider transition-colors ${
                isPasswordError ? "text-rose-400 opacity-90" : "opacity-70"
              }`}
            >
              Password
            </label>
            <Link
              href="/admin/forgot-password"
              className="text-[11px] font-semibold text-amber-500 hover:text-amber-400 hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <FiLock
              className={`absolute left-3 top-2.5 w-4 h-4 transition-colors ${
                isPasswordError ? "text-rose-400" : "text-neutral-400"
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
                isPasswordError
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
                isPasswordError
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

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-2.5 mt-2 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-600 text-black transition-colors disabled:opacity-50"
        >
          {formik.isSubmitting ? "Signing in..." : "Sign In to Admin Workspace"}
        </button>
      </form>
    </div>
  );
}
