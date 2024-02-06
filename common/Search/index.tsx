"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

import { debounce } from "@/utils/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const customPlaceholder = [
  "wondrMart",
  "food",
  "electronics",
  "fashion",
  "home & kitchen",
  "health & beauty",
  "baby products",
  "sports & fitness",
  "automotive & industrial",
  "books & stationery",
  "gaming",
  "computing",
  "pet supplies",
  "garden & outdoors",
  "other categories",
];
const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [placeholder, setPlaceholder] = useState(customPlaceholder[0]);
  const [isChanging, setIsChanging] = useState(false);
  const [search, setSearch] = useState(""); // search query [TODO: implement search functionality]
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const calculatePlaceholder = () => {
      let i = 0;
      interval = setInterval(() => {
        setIsChanging(true);
        setTimeout(() => {
          i = (i + 1) % customPlaceholder.length;
          setPlaceholder(customPlaceholder[i]);
          setIsChanging(false);
        }, 500); // half of interval time to sync fade-out and fade-in
      }, 2000);
    };
    calculatePlaceholder();
    return () => clearInterval(interval);
  }, []);

  const fetchData = (query: string) => {
    if (!query.length) {
      return router.push(`${pathname}`);
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", query);
    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedSearch = useCallback(debounce(fetchData, 500), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    debouncedSearch(query);
  };

  return (
    <div className="flex items-center justify-center my-3 md:my-0">
      <div
        role="searchbox"
        tabIndex={0}
        className={`flex items-center bg-zinc-800 rounded-md px-3 w-full mx-3 md:mx-0 md:w-2/3 transition-all duration-300 ease-in-out ${
          isFocused
            ? "ring-2 ring-zinc-500 ring-offset-2 ring-offset-zinc-800"
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
            bg-zinc-800 outline-none p-3
            `}
        />
      </div>
    </div>
  );
};
export default Search;

// placeholder:opacity-100 placeholder:transition-all placeholder:duration-1000 placeholder:ease-in-out
