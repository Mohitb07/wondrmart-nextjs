"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { HiDocumentArrowDown } from "react-icons/hi2";
import toast from "react-hot-toast";
import { downloadOrderInvoice } from "@/actions/downloadInvoice";

type DownloadInvoiceButtonProps = {
  orderId: string;
  className?: string;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  size?: "sm" | "md" | "lg";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
};

const DownloadInvoiceButton: React.FC<DownloadInvoiceButtonProps> = ({
  orderId,
  className = "",
  variant = "bordered",
  size = "md",
  color = "default",
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!orderId || isDownloading) return;

    setIsDownloading(true);
    const toastId = toast.loading("Generating invoice PDF...");

    try {
      await downloadOrderInvoice(orderId);
      toast.success("Invoice downloaded successfully!", { id: toastId });
    } catch (error: any) {
      console.error("Failed to download invoice:", error);
      const message =
        error?.message || "Failed to download invoice. Please try again.";
      toast.error(message, { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      isLoading={isDownloading}
      onClick={handleDownload}
      startContent={!isDownloading && <HiDocumentArrowDown className="text-lg" />}
      className={`font-medium transition-all ${className}`}
    >
      {isDownloading ? "Downloading..." : "Download Invoice"}
    </Button>
  );
};

export default DownloadInvoiceButton;
