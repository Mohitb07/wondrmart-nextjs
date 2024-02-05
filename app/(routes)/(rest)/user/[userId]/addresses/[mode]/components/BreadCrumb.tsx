"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type BreadCrumbProps = {
  mode?: string;
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({ mode }) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem onClick={handleClick}>Your Addresses</BreadcrumbItem>
      <BreadcrumbItem>{mode === "create" ? "Add" : "Edit"}</BreadcrumbItem>
    </Breadcrumbs>
  );
};
export default BreadCrumb;
