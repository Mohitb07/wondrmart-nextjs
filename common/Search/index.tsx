"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { debounce } from "@/utils/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SEARCH_FIELD_CUSTOM_PLACEHOLDERS } from "@/constants";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [placeholder, setPlaceholder] = useState(
    SEARCH_FIELD_CUSTOM_PLACEHOLDERS[0]
  );
  const [isChanging, setIsChanging] = useState(false);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const calculatePlaceholder = () => {
      let i = 0;
      interval = setInterval(() => {
        setIsChanging(true);
        setTimeout(() => {
          i = (i + 1) % SEARCH_FIELD_CUSTOM_PLACEHOLDERS.length;
          setPlaceholder(SEARCH_FIELD_CUSTOM_PLACEHOLDERS[i]);
          setIsChanging(false);
        }, 500); // half of interval time to sync fade-out and fade-in
      }, 2000);
    };
    calculatePlaceholder();
    return () => clearInterval(interval);
  }, []);

  const updateSearchUrl = (query: string) => {
    if (!query.length) {
      return router.push(`${pathname}`);
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", query);
    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedSearch = useCallback(debounce(updateSearchUrl, 500), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    debouncedSearch(query);
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
        <BsSearch />
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={search}
          onChange={handleChange}
          type="search"
          placeholder={`Search ${placeholder}`}
          className={`w-full
            ${
              isChanging
                ? "placeholder:-translate-y-10 placeholder:opacity-10 placeholder:transition-all placeholder:duration-1000 placeholder:ease-in-out"
                : "placeholder:translate-y-0 placeholder:opacity-100 placeholder:transition-all placeholder:duration-1000 placeholder:ease-in-out"
            }
            bg-zinc-900 outline-none p-3
            `}
        />
      </div>
    </div>
  );
};
export default Search;

// placeholder:opacity-100 placeholder:transition-all placeholder:duration-1000 placeholder:ease-in-out
