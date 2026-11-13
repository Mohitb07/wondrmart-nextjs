"use client";

import React from "react";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

type AccountCTAProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tag?: string;
  userId: string;
  navigateTo?: string;
  gradient?: string;
};

const AccountCTA: React.FC<AccountCTAProps> = ({
  icon,
  title = "",
  subtitle = "",
  tag,
  userId,
  navigateTo = "",
  gradient = "from-primary/10 via-primary/5 to-transparent",
}) => {
  return (
    <Link
      href={`/user/${userId}/${navigateTo}`}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-default-50/50 dark:bg-neutral-900/50 border border-default-200/60 dark:border-neutral-800/80 backdrop-blur-md shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 overflow-hidden"
    >
      {/* Subtle background glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          {/* Icon Box */}
          <div className="w-14 h-14 rounded-2xl bg-default-100 dark:bg-neutral-800 border border-default-200/50 dark:border-neutral-700/50 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>

          {tag && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-default-100 dark:bg-neutral-800/80 text-default-500 border border-default-200/40 dark:border-neutral-700/40">
              {tag}
            </span>
          )}
        </div>

        <div className="space-y-1.5 text-left">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-default-500 line-clamp-2 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="relative z-10 pt-4 mt-2 border-t border-default-200/40 dark:border-neutral-800/60 flex items-center justify-between text-xs font-bold text-default-400 group-hover:text-foreground transition-colors">
        <span>Manage</span>
        <HiOutlineArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-primary" />
      </div>
    </Link>
  );
};

export default AccountCTA;
