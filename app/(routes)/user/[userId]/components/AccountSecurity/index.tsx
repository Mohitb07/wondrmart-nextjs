"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import {
  HiOutlineShieldCheck,
  HiOutlineArrowRightOnRectangle,
  HiOutlineShieldExclamation,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function AccountSecurity() {
  const { logout, logoutAll } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingOutAll, setIsLoggingOutAll] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogoutAll = async () => {
    try {
      setIsLoggingOutAll(true);
      await logoutAll();
      toast.success("Logged out of all sessions");
    } catch {
      toast.error("Failed to log out all sessions. Please try again.");
    } finally {
      setIsLoggingOutAll(false);
    }
  };

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-default-50/50 dark:bg-neutral-900/50 border border-default-200/60 dark:border-neutral-800/80 backdrop-blur-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-default-200/60 dark:border-neutral-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <HiOutlineShieldCheck className="text-2xl" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Account & Session Security
            </h2>
            <p className="text-xs sm:text-sm text-default-500">
              Manage your active login sessions and device access
            </p>
          </div>
        </div>

        <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Session Protected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Log Out Current Session */}
        <div className="flex flex-col justify-between gap-4 p-5 rounded-2xl bg-default-100/50 dark:bg-neutral-800/40 border border-default-200/50 dark:border-neutral-700/40 transition-all hover:bg-default-100/80 dark:hover:bg-neutral-800/70">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 text-2xl shrink-0">
              <HiOutlineDevicePhoneMobile />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Current Device
              </h3>
              <p className="text-xs text-default-500 leading-relaxed">
                Sign out of your account on this browser session only.
              </p>
            </div>
          </div>

          <Button
            variant="flat"
            color="warning"
            size="sm"
            isLoading={isLoggingOut}
            isDisabled={isLoggingOutAll}
            onClick={handleLogout}
            startContent={!isLoggingOut && <HiOutlineArrowRightOnRectangle className="text-base" />}
            className="font-bold w-full h-9"
          >
            {isLoggingOut ? "Signing Out..." : "Sign Out (This Device)"}
          </Button>
        </div>

        {/* Log Out All Sessions */}
        <div className="flex flex-col justify-between gap-4 p-5 rounded-2xl bg-default-100/50 dark:bg-neutral-800/40 border border-default-200/50 dark:border-neutral-700/40 transition-all hover:bg-default-100/80 dark:hover:bg-neutral-800/70">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 text-2xl shrink-0">
              <HiOutlineShieldExclamation />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                All Devices & Sessions
              </h3>
              <p className="text-xs text-default-500 leading-relaxed">
                Sign out across all devices and immediately invalidate all tokens.
              </p>
            </div>
          </div>

          <Button
            variant="solid"
            color="danger"
            size="sm"
            isLoading={isLoggingOutAll}
            isDisabled={isLoggingOut}
            onClick={handleLogoutAll}
            startContent={!isLoggingOutAll && <HiOutlineShieldExclamation className="text-base" />}
            className="font-bold w-full h-9 shadow-md shadow-danger/20"
          >
            {isLoggingOutAll ? "Invalidating Sessions..." : "Sign Out Everywhere"}
          </Button>
        </div>
      </div>
    </div>
  );
}
