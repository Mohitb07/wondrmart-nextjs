"use client";

import { useState, useEffect } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import {
  HiOutlinePencilAlt,
  HiOutlineCheck,
  HiOutlineClock,
  HiOutlineExclamationCircle,
} from "react-icons/hi";

import OtpInput from "@/common/OtpInput";
import useVerifyOtp from "@/hooks/useVerifyOtp";
import useResendOtp from "@/hooks/useResendOtp";
import useCountdown from "@/hooks/useCountdown";

interface VerifyOtpBodyProps {
  initialEmail?: string;
}

export default function VerifyOtpBody({ initialEmail }: VerifyOtpBodyProps) {
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email") || initialEmail || "";

  const [email, setEmail] = useState<string>(queryEmail);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(!queryEmail);
  const [editedEmail, setEditedEmail] = useState<string>(queryEmail);
  const [otp, setOtp] = useState<string>("");

  const {
    mutate: verifyMutate,
    isLoading: isVerifying,
    isError: isVerifyError,
    error: verifyError,
    reset: resetVerify,
  } = useVerifyOtp();

  const {
    secondsLeft,
    formattedTime,
    isRunning,
    start: startCountdown,
    reset: resetCountdown,
  } = useCountdown(60);

  const {
    mutate: resendMutate,
    isLoading: isResending,
    isError: isResendError,
    error: resendError,
    reset: resetResend,
  } = useResendOtp(() => {
    resetCountdown();
    resetVerify();
    setOtp("");
  });

  const isVerifyRateLimited = verifyError?.response?.status === 429;
  const isResendRateLimited = resendError?.response?.status === 429;

  const verifyErrorMessage =
    verifyError?.response?.data?.errors?.[0]?.message ||
    verifyError?.response?.data?.message ||
    "The code entered is invalid or has expired.";

  const resendErrorMessage =
    resendError?.response?.data?.errors?.[0]?.message ||
    resendError?.response?.data?.message ||
    "Failed to resend verification code. Please try again.";

  useEffect(() => {
    if (email && !isRunning && secondsLeft === 60) {
      startCountdown();
    }
  }, [email, isRunning, secondsLeft, startCountdown]);

  useEffect(() => {
    if (queryEmail && !email) {
      setEmail(queryEmail);
      setEditedEmail(queryEmail);
      setIsEditingEmail(false);
    }
  }, [queryEmail, email]);

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
    // Clear ordinary error messages on edit, but preserve the rate-limit lockout warning
    if (isVerifyError && !isVerifyRateLimited) {
      resetVerify();
    }
  };

  const handleVerify = (otpToSubmit?: string) => {
    if (isVerifyRateLimited) return;
    const code = otpToSubmit || otp;
    if (!email.trim()) {
      setIsEditingEmail(true);
      return;
    }
    if (code.length === 6) {
      verifyMutate({ email: email.trim(), otp: code });
    }
  };

  const handleResend = () => {
    if (!email.trim()) {
      setIsEditingEmail(true);
      return;
    }
    if (isResendError) {
      resetResend();
    }
    resendMutate({ email: email.trim() });
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedEmail.trim() && editedEmail.includes("@")) {
      setEmail(editedEmail.trim());
      setIsEditingEmail(false);
      resetCountdown();
      resetVerify();
      if (isResendError) resetResend();
      setOtp("");
    }
  };

  return (
    <div className="space-y-5 md:space-y-4">
      {/* Subtitle & Email */}
      <div className="text-center space-y-1">
        <p className="text-slate-400 text-sm">
          We&apos;ve sent a 6-digit verification code to
        </p>

        {isEditingEmail ? (
          <form
            onSubmit={handleSaveEmail}
            className="flex items-center gap-2 max-w-xs mx-auto pt-1"
          >
            <Input
              size="sm"
              variant="bordered"
              type="email"
              placeholder="Enter your email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              autoFocus
            />
            <Button
              size="sm"
              color="primary"
              variant="flat"
              type="submit"
              isIconOnly
              aria-label="Confirm email"
            >
              <HiOutlineCheck className="text-base" />
            </Button>
          </form>
        ) : (
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>{email || "No email provided"}</span>
            <button
              type="button"
              onClick={() => setIsEditingEmail(true)}
              className="text-slate-400 hover:text-foreground transition-colors"
              title="Change email"
              aria-label="Change email"
            >
              <HiOutlinePencilAlt className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* OTP Pin Input */}
      <div className="space-y-4">
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          isDisabled={isVerifying}
          isInvalid={isVerifyError}
          onComplete={(completedOtp) => handleVerify(completedOtp)}
        />

        {/* Rate limit lockout warning banner */}
        {isVerifyError && isVerifyRateLimited && (
          <div className="p-4 rounded-xl bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 text-warning-900 dark:text-warning-200 space-y-2 text-sm text-left">
            <div className="flex items-start gap-2.5">
              <HiOutlineClock className="w-5 h-5 text-warning-600 dark:text-warning-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Too Many Failed Attempts</p>
                <p className="text-xs text-default-600 dark:text-default-400 mt-0.5">
                  {verifyErrorMessage}
                </p>
              </div>
            </div>
            {(!isRunning || secondsLeft === 0) && (
              <div className="flex justify-end pt-1">
                <Button
                  size="sm"
                  color="warning"
                  variant="flat"
                  isDisabled={isResending || !email}
                  onClick={handleResend}
                  className="font-semibold text-xs"
                >
                  {isResending ? "Sending New Code..." : "Request Fresh Code"}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Standard verification error message */}
        {isVerifyError && !isVerifyRateLimited && (
          <div className="text-center">
            <p className="text-xs text-danger font-medium">
              {verifyErrorMessage}
            </p>
          </div>
        )}

        {/* Resend error alert */}
        {isResendError && (
          <div className="p-3.5 rounded-xl bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 text-danger text-xs font-medium flex items-start gap-2.5 text-left">
            <HiOutlineExclamationCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">
                {isResendRateLimited ? "Too Many Resend Requests" : "Resend Failed"}
              </p>
              <p className="text-default-600 dark:text-default-400 mt-0.5 font-normal">
                {resendErrorMessage}
              </p>
            </div>
          </div>
        )}

        <Button
          isLoading={isVerifying}
          isDisabled={otp.length !== 6 || !email || isVerifyRateLimited}
          onClick={() => handleVerify()}
          className="w-full font-bold"
          color="primary"
          variant="shadow"
        >
          {isVerifyRateLimited ? "Attempts Exceeded" : "Verify & Continue"}
        </Button>
      </div>

      {/* Resend Cooldown Section */}
      <span className="flex items-center gap-1.5 justify-center text-slate-400 max-sm:text-sm">
        Didn&apos;t receive the code?{" "}
        {isRunning && secondsLeft > 0 ? (
          <span className="text-foreground font-medium">
            Resend in {formattedTime}
          </span>
        ) : (
          <Link
            as="button"
            type="button"
            isDisabled={isResending || !email}
            onClick={handleResend}
            className="max-sm:text-sm font-medium"
          >
            {isResending ? "Sending..." : "Resend Code"}
          </Link>
        )}
      </span>

      {/* Footer Navigation */}
      <span className="flex items-center gap-2 justify-center text-slate-400 max-sm:text-sm pt-1">
        Already verified?{" "}
        <Link href="/auth/signin" as={NextLink} className="max-sm:text-sm">
          Sign In
        </Link>
      </span>
    </div>
  );
}
