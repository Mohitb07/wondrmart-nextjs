"use client";

import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { HiOutlineLogout, HiOutlineShieldExclamation } from "react-icons/hi";
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
    <Card className="mt-8 p-2 border border-slate-800 bg-content1/50 shadow-sm">
      <CardHeader className="flex flex-col items-start gap-1 pb-2">
        <h2 className="text-xl font-bold text-foreground">
          Account & Session Security
        </h2>
        <p className="text-sm text-default-500">
          Manage your active login sessions and account sign-out options.
        </p>
      </CardHeader>
      <Divider className="my-2" />
      <CardBody className="gap-4">
        {/* Log Out Current Session */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-content2/40 border border-content3/30 transition-all hover:bg-content2/70">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-3 rounded-lg bg-danger/10 text-danger text-2xl flex-shrink-0">
              <HiOutlineLogout />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Log Out
              </h3>
              <p className="text-xs sm:text-sm text-default-500">
                Sign out of your account on this device.
              </p>
            </div>
          </div>
          <Button
            color="danger"
            variant="flat"
            isLoading={isLoggingOut}
            isDisabled={isLoggingOutAll}
            onClick={handleLogout}
            className="font-medium sm:w-auto w-full"
          >
            Log Out
          </Button>
        </div>

        {/* Log Out All Sessions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-content2/40 border border-content3/30 transition-all hover:bg-content2/70">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-3 rounded-lg bg-danger/10 text-danger text-2xl flex-shrink-0">
              <HiOutlineShieldExclamation />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Log Out All Sessions
              </h3>
              <p className="text-xs sm:text-sm text-default-500">
                Sign out across all devices and invalidate all active login sessions.
              </p>
            </div>
          </div>
          <Button
            color="danger"
            variant="solid"
            isLoading={isLoggingOutAll}
            isDisabled={isLoggingOut}
            onClick={handleLogoutAll}
            className="font-medium sm:w-auto w-full"
          >
            Log Out All Sessions
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
