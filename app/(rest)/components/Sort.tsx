"use client";

import { Select, Selection, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const sortList = [
  { key: "price", label: "Price" },
  { key: "discount", label: "Discount" },
  { key: "rating", label: "Rating" },
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "name", label: "Name" },
];

export default function SortProducts() {
  const params = new URLSearchParams(window.location.search);

  const [value, setValue] = useState(params.get("sort") || "newest");
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(window.location.search);
    const value = e.target.value;
    if (!value) {
      newParams.delete("sort");
      router.push(`${pathname}?${newParams.toString()}`);
      setValue(value);
      return;
    }
    newParams.set("sort", value);
    router.push(`${pathname}?${newParams.toString()}`);
    setValue(value);
  };

  return (
    <Select
      className="max-w-[8rem]"
      size="sm"
      label="Sort by:"
      labelPlacement="inside"
      variant="flat"
      onChange={(e) => handleSelectionChange(e)}
      defaultSelectedKeys={[value]}
    >
      {sortList.map((el) => (
        <SelectItem key={el.key}>{el.label}</SelectItem>
      ))}
    </Select>
  );
}
