"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const sortList = [
  { key: "newest", label: "Newest" },
  { key: "price", label: "Price: Low To High" },
  { key: "price-desc", label: "Price: High To Low" },
  { key: "name", label: "Name" },
  { key: "oldest", label: "Oldest" },
];

export default function SortProducts({ sortby }: { sortby: string }) {
  const [value, setValue] = useState(sortby || "newest");
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(window.location.search);
    const value = e.target.value;

    if (!value) {
      newParams.delete("sort");
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
      setValue(value);
    } else {
      newParams.set("sort", value);
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
      setValue(value);
    }
  };

  return (
    <Select
      className="max-w-[10rem] lg:max-w-[14rem]"
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
