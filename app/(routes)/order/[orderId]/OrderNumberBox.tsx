"use client";

import { useState } from "react";
import { HiOutlineDocumentDuplicate, HiCheck } from "react-icons/hi2";

export function OrderNumberBox({ orderId }: { orderId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="inline-flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-default-100/80 dark:bg-neutral-800/70 border border-default-200/80 dark:border-neutral-700/60 shadow-sm text-left">
      <div>
        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-default-400 font-medium block">
          Order number
        </span>
        <span className="text-xs sm:text-sm font-semibold font-mono text-foreground">
          {orderId}
        </span>
      </div>
      <button
        onClick={handleCopy}
        type="button"
        title="Copy order number"
        className="p-1.5 rounded-lg text-default-400 hover:text-foreground hover:bg-default-200/60 dark:hover:bg-neutral-700/60 transition-colors focus:outline-none"
      >
        {copied ? (
          <HiCheck className="text-base text-emerald-500" />
        ) : (
          <HiOutlineDocumentDuplicate className="text-base" />
        )}
      </button>
    </div>
  );
}