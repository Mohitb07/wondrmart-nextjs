"use client";

import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { debounce } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SEARCH_FIELD_CUSTOM_PLACEHOLDERS } from "@/constants";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animState, setAnimState] = useState<"idle" | "exit" | "enter-prepare">("idle");
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Phase 1: Slide current text up and fade out
      setAnimState("exit");

      // Phase 2: After 300ms fade-out, update text and prepare at bottom
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % SEARCH_FIELD_CUSTOM_PLACEHOLDERS.length);
        setAnimState("enter-prepare");

        // Phase 3: Immediately slide in from bottom to center
        setTimeout(() => {
          setAnimState("idle");
        }, 30);
      }, 300);
    }, 3500); // 3.5s interval for a calm, subtle transition

    return () => clearInterval(interval);
  }, []);

  const debouncedSearch = React.useMemo(
    () =>
      debounce((query: string) => {
        const params = new URLSearchParams(window.location.search);
        if (!query.length) {
          params.delete("q");
        } else {
          params.set("q", query);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }, 300),
    [pathname, router]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    debouncedSearch(val);
  };

  return (
    <div className="flex items-center justify-center my-3 md:my-0 relative">
      <div
        role="searchbox"
        tabIndex={0}
        className={`flex items-center bg-zinc-900 rounded-md px-3 w-full mx-3 md:mx-0 md:w-2/3 transition-all duration-300 ease-in-out ${
          isFocused
            ? "ring-2 ring-zinc-500 ring-offset-2 ring-offset-zinc-900"
            : ""
        }`}
      >
        <BsSearch className="text-zinc-400 flex-shrink-0" />
        <div className="relative flex-1 flex items-center min-w-0">
          {/* Subtle animated placeholder overlay when search input is empty */}
          {!search && (
            <div className="absolute left-3 pointer-events-none text-zinc-500 text-sm overflow-hidden h-6 flex items-center select-none">
              <span
                className={`transform inline-block ${
                  animState === "exit"
                    ? "-translate-y-3 opacity-0 transition-all duration-300 ease-in"
                    : animState === "enter-prepare"
                    ? "translate-y-3 opacity-0 transition-none"
                    : "translate-y-0 opacity-100 transition-all duration-300 ease-out"
                }`}
              >
                Search {SEARCH_FIELD_CUSTOM_PLACEHOLDERS[placeholderIndex]}
              </span>
            </div>
          )}

          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={search}
            onChange={handleChange}
            type="search"
            aria-label="Search products"
            className="w-full bg-zinc-900 outline-none p-3 text-sm text-zinc-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
