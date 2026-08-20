"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminResendVerificationApi } from "@/api/adminApi";
import {
  FiLock,
  FiMail,
  FiUser,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiCheckCircle,
  FiRefreshCw,
  FiArrowLeft,
} from "react-icons/fi";

const registerValidationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  role: yup.string().required("Role is required"),
});

interface AdminRegisterFormProps {
  onSuccessProceedToLogin?: () => void;
}

export default function AdminRegisterForm({
  onSuccessProceedToLogin,
}: AdminRegisterFormProps) {
  const { register, theme } = useAdminAuth();
  const isDark = theme === "dark";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Verification sent screen state
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendFeedback, setResendFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "ADMIN",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setAuthError(null);
      setResendFeedback(null);

      try {
        await register(
          values.username.trim(),
          values.email.trim(),
          values.password,
          values.role
        );
        setRegisteredEmail(values.email.trim());
      } catch (err: any) {
        const errMsg =
          err?.response?.data?.errors?.[0]?.message ||
          err?.response?.data?.message ||
          "Registration failed. Please check your information.";
        setAuthError(errMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    formik.handleChange(e);
    if (authError) setAuthError(null);
  };

  const handleResend = async () => {
    if (!registeredEmail) return;
    setResending(true);
    setResendFeedback(null);
    try {
      const res = await adminResendVerificationApi(registeredEmail);
      setResendFeedback({
        type: "success",
        message:
          res.message ||
          "A new verification link has been sent to your email.",
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

  // Server error matching
  const lowerError = authError ? authError.toLowerCase() : "";
  const isServerEmailError =
    Boolean(authError) &&
    (lowerError.includes("email") ||
      lowerError.includes("exist") ||
      lowerError.includes("already"));
  const isServerPasswordError =
    Boolean(authError) && lowerError.includes("password");
  const isServerUsernameError =
    Boolean(authError) && lowerError.includes("username");

  // Field status
  const isUsernameError =
    (formik.touched.username && Boolean(formik.errors.username)) ||
    isServerUsernameError;
  const isEmailError =
    (formik.touched.email && Boolean(formik.errors.email)) ||
    isServerEmailError;
  const isPasswordError =
    (formik.touched.password && Boolean(formik.errors.password)) ||
    isServerPasswordError;
  const isConfirmPasswordError =
    (formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)) ||
    isServerPasswordError;

  // If registration is complete, show the verification pending screen
  if (registeredEmail) {
    return (
      <div className="space-y-5">
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-3">
          <FiCheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-emerald-300">
              Registration Successful!
            </p>
            <p className="mt-1 text-emerald-400/90 leading-relaxed">
              We have sent a verification link to{" "}
              <span className="font-semibold text-emerald-200">
                {registeredEmail}
              </span>
              . Please check your inbox and click the link to activate your administrator account.
            </p>
          </div>
        </div>

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

        <div className="pt-2 flex flex-col gap-3">
          <button
            type="button"
            disabled={resending}
            onClick={handleResend}
            className={`w-full py-2.5 rounded-lg font-bold text-xs border transition-colors flex items-center justify-center gap-2 ${
              isDark
                ? "border-neutral-700 hover:bg-neutral-800 text-neutral-300"
                : "border-neutral-300 hover:bg-neutral-100 text-neutral-700"
            } disabled:opacity-50`}
          >
            <FiRefreshCw
              className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`}
            />
            {resending ? "Resending Link..." : "Resend Verification Email"}
          </button>

          {onSuccessProceedToLogin ? (
            <button
              type="button"
              onClick={onSuccessProceedToLogin}
              className="w-full py-2.5 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-600 text-black text-center transition-colors flex items-center justify-center gap-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              Proceed to Sign In
            </button>
          ) : (
            <Link
              href="/admin/login"
              className="w-full py-2.5 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-600 text-black text-center transition-colors flex items-center justify-center gap-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              Proceed to Sign In
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Server Error Alert */}
      {authError && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2.5">
          <FiAlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
          <span className="font-medium leading-snug">{authError}</span>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        {/* Username */}
        <div>
          <label
            className={`block text-xs font-semibold uppercase tracking-wider mb-1 transition-colors ${
              isUsernameError ? "text-rose-400 opacity-90" : "opacity-70"
            }`}
          >
            Username <span className="text-amber-500 ml-0.5">*</span>
          </label>
          <div className="relative">
            <FiUser
              className={`absolute left-3 top-2.5 w-4 h-4 transition-colors ${
                isUsernameError ? "text-rose-400" : "text-neutral-400"
              }`}
            />
            <input
              type="text"
              name="username"
              placeholder="admin_username"
              value={formik.values.username}
              onChange={handleFieldChange}
              onBlur={formik.handleBlur}
              className={`w-full pl-9 pr-4 py-2 rounded-lg border text-xs focus:outline-none transition-colors ${
                isUsernameError
                  ? "bg-rose-500/5 border-rose-500 text-rose-200 placeholder-rose-400/50 focus:ring-1 focus:ring-rose-500"
                  : isDark
                  ? "bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:ring-1 focus:ring-amber-500"
                  : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:ring-1 focus:ring-amber-500"
              }`}
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <p className="mt-1 text-[11px] text-rose-400 font-medium">
              {formik.errors.username}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label
            className={`block text-xs font-semibold uppercase tracking-wider mb-1 transition-colors ${
              isEmailError ? "text-rose-400 opacity-90" : "opacity-70"
            }`}
          >
            Email Address <span className="text-amber-500 ml-0.5">*</span>
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
          <label
            className={`block text-xs font-semibold uppercase tracking-wider mb-1 transition-colors ${
              isPasswordError ? "text-rose-400 opacity-90" : "opacity-70"
            }`}
          >
            Password (min 8 characters) <span className="text-amber-500 ml-0.5">*</span>
          </label>
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

        {/* Confirm Password */}
        <div>
          <label
            className={`block text-xs font-semibold uppercase tracking-wider mb-1 transition-colors ${
              isConfirmPasswordError ? "text-rose-400 opacity-90" : "opacity-70"
            }`}
          >
            Confirm Password <span className="text-amber-500 ml-0.5">*</span>
          </label>
          <div className="relative">
            <FiLock
              className={`absolute left-3 top-2.5 w-4 h-4 transition-colors ${
                isConfirmPasswordError ? "text-rose-400" : "text-neutral-400"
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
                isConfirmPasswordError
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
                isConfirmPasswordError
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

        {/* Role Select */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">
            Admin Role <span className="text-amber-500 ml-0.5">*</span>
          </label>
          <select
            name="role"
            value={formik.values.role}
            onChange={handleFieldChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${
              isDark
                ? "bg-neutral-800 border-neutral-700 text-neutral-100"
                : "bg-neutral-50 border-neutral-300 text-neutral-900"
            }`}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="SUPERADMIN">SUPERADMIN</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-2.5 mt-2 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-600 text-black transition-colors disabled:opacity-50"
        >
          {formik.isSubmitting ? "Creating Account..." : "Create Admin Account"}
        </button>
      </form>
    </div>
  );
}
