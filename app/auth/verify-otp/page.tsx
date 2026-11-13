import { Suspense } from "react";
import VerifyOtpBody from "../components/VerifyOtpBody";

export const metadata = {
  title: "Verify Email",
  description:
    "Enter your 6-digit verification code to verify your email address and access your wondrMart account.",
};

export default function VerifyOtpPage() {
  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="px-4 py-16 sm:px-6 lg:px-8 space-y-5 min-w-[20rem] md:min-w-[30rem] w-full md:w-fit">
        <h1 className="text-4xl font-bold text-center">Verify Email</h1>
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center p-8 space-y-3">
              <div className="w-7 h-7 border-2 border-default-400 border-t-foreground rounded-full animate-spin" />
              <p className="text-sm text-slate-400">Loading...</p>
            </div>
          }
        >
          <VerifyOtpBody />
        </Suspense>
      </div>
    </div>
  );
}
