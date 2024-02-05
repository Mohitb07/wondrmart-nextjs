"use client";

import Container from "@/common/Container";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  const pathname = usePathname();
  let pageTitle = "";
  const isAccountIndexPage = pathname.split("/").pop() === params.userId;
  const isAddressMode =
    pathname.includes("addresses") &&
    (pathname.split("/").pop() === "create" ||
      pathname.split("/").pop() === "edit");

  console.log("isAddressmode", isAddressMode);

  const formattedTitle =
    (pathname.split("/").pop() || "")[0].toUpperCase() +
    (pathname.split("/").pop() || "").substring(1);

  if (isAccountIndexPage) {
    pageTitle = "Your Account";
  } else if (isAddressMode) {
    pageTitle = `${formattedTitle} Address`;
  } else {
    pageTitle = `Your ${formattedTitle}`;
  }

  const paths = pathname.split("/").slice(1);
  const breadCrumbList = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 2).join("/")}`;
    console.log("path", path, index, href);
    const text = paths
      .filter((path) => path !== params.userId)
      .map((item) => item[0].toUpperCase() + item.substring(1))[index];
    return { href, text };
  });

  const filteredBreadCrumbList = breadCrumbList.filter((item) => item.text);

  return (
    <Container>
      <main className="p-6 space-y-5">
        <h1 className="text-4xl font-bold">{pageTitle}</h1>
        <Breadcrumbs size="lg">
          {filteredBreadCrumbList.map((breadcrumb, index) => {
            return (
              <BreadcrumbItem key={index} href={breadcrumb.href}>
                {breadcrumb.text}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
        {children}
      </main>
    </Container>
  );
}
