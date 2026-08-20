"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminVerifyEmailApi, adminResendVerificationApi } from "@/api/adminApi";
import {
  FiShield,
  FiMail,
  FiSun,
  FiMoon,
  FiArrowLeft,
  FiAlertCircle,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";

function AdminVerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const initialEmail = searchParams.get("email") || "";

  const { theme, toggleTheme } = useAdminAuth();
  const isDark = theme === "dark";

  const [verifying, setVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Resend state
  const [resendEmail, setResendEmail] = useState(initialEmail);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function verify() {
      if (!token || !initialEmail) {
        setErrorMessage(
          "Verification token or email is missing from the link. Please request a new verification email."
        );
        return;
      }

      try {
        setVerifying(true);
        setErrorMessage(null);
        await adminVerifyEmailApi(token, initialEmail);
        if (isMounted) {
          setIsVerified(true);
        }
      } catch (err: any) {
        if (isMounted) {
          setErrorMessage(
            err?.response?.data?.errors?.[0]?.message ||
              err?.response?.data?.message ||
              "Invalid or expired verification link. Please request a new verification email."
          );
        }
      } finally {
        if (isMounted) {
          setVerifying(false);
        }
      }
    }

    verify();

    return () => {
      isMounted = false;
    };
  }, [token, initialEmail]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendError(null);
    setResendSuccess(null);

    if (!resendEmail.trim()) {
      setResendError("Please enter your admin email address.");
      return;
    }

    try {
      setResending(true);
      const res = await adminResendVerificationApi(resendEmail.trim());
      setResendSuccess(
        res.message ||
          "If an unverified account exists, a new verification link has been sent."
      );
    } catch (err: any) {
      setResendError(
        err?.response?.data?.errors?.[0]?.message ||
          err?.response?.data?.message ||
          "Failed to resend verification email. Please try again."
      );
    } finally {
      setResending(false);
    }
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
            Admin Email Verification
          </h1>
          <p className="text-xs mt-1 opacity-60">
            Account activation & security verification
          </p>
        </div>

        {verifying ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto" />
            <p className="text-xs font-medium opacity-80">
              Verifying your administrator credentials...
            </p>
          </div>
        ) : isVerified ? (
          <div className="space-y-5">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-3">
              <FiCheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-emerald-300">
                  Email Verified Successfully!
                </p>
                <p className="mt-1 text-emerald-400/90 leading-relaxed">
                  Your administrator account is now activated. You can sign in to access the WONDRMART admin workspace.
                </p>
              </div>
            </div>

            <Link
              href="/admin/login"
              className="w-full py-2.5 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-600 text-black text-center transition-colors flex items-center justify-center gap-2"
            >
              Sign In to Admin Workspace
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {errorMessage && (
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-3">
                <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-rose-300">
                    Verification Failed
                  </p>
                  <p className="mt-1 text-rose-400/90 leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Resend verification section */}
            <div className={`p-4 rounded-lg border space-y-3 ${
              isDark ? "bg-black/40 border-neutral-800" : "bg-neutral-50 border-neutral-200"
            }`}>
              <h2 className="text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-2">
                <FiRefreshCw className="w-3.5 h-3.5 text-amber-500" />
                Resend Activation Email
              </h2>

              {resendSuccess && (
                <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs leading-snug">
                  {resendSuccess}
                </div>
              )}

              {resendError && (
                <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs leading-snug">
                  {resendError}
                </div>
              )}

              <form onSubmit={handleResend} className="space-y-3">
                <div className="relative">
                  <FiMail className="absolute left-3 top-2.5 text-neutral-400 w-4 h-4" />
                  <input
                    type="email"
                    required
                    placeholder="admin@wondrmart.com"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    className={`w-full pl-9 pr-4 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${
                      isDark
                        ? "bg-neutral-800 border-neutral-700 text-neutral-100 placeholder-neutral-500"
                        : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={resending}
                  className="w-full py-2 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-600 text-black transition-colors disabled:opacity-50"
                >
                  {resending ? "Sending New Link..." : "Send New Verification Link"}
                </button>
              </form>
            </div>

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
                Return to Admin Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminVerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500 border-r-2" />
        </div>
      }
    >
      <AdminVerifyEmailContent />
    </Suspense>
  );
}
