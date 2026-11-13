"use client";

import { useState, useEffect } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { HiOutlinePencilAlt, HiOutlineCheck } from "react-icons/hi";

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

  const { mutate: resendMutate, isLoading: isResending } = useResendOtp(() => {
    resetCountdown();
  });

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
    if (isVerifyError) {
      resetVerify();
    }
  };

  const handleVerify = (otpToSubmit?: string) => {
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
    resendMutate({ email: email.trim() });
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedEmail.trim() && editedEmail.includes("@")) {
      setEmail(editedEmail.trim());
      setIsEditingEmail(false);
      resetCountdown();
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

        {isVerifyError && (
          <div className="text-center">
            <p className="text-xs text-danger font-medium">
              {verifyError?.response?.data?.errors?.[0]?.message ||
                verifyError?.response?.data?.message ||
                "The code entered is invalid or has expired."}
            </p>
          </div>
        )}

        <Button
          isLoading={isVerifying}
          isDisabled={otp.length !== 6 || !email}
          onClick={() => handleVerify()}
          className="w-full font-bold"
          color="primary"
          variant="shadow"
        >
          Verify &amp; Continue
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
