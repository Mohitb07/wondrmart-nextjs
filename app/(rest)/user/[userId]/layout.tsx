"use client";

import Container from "@/common/Container";
import useGetUser from "@/hooks/useGetUser";
import { BreadcrumbItem, Breadcrumbs, Skeleton } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  const pathname = usePathname();
  const { data: user, isLoading } = useGetUser();
  let pageTitle = "";
  const isAccountIndexPage = pathname.split("/").pop() === params.userId;
  const isAddressMode =
    pathname.includes("addresses") &&
    (pathname.split("/").pop() === "create" ||
      pathname.split("/").pop() === "edit");
  const isOrderDetailPage =
    pathname.includes("orders") &&
    pathname.split("/").pop() !== "orders" &&
    pathname.split("/").pop()?.length !== 0;

  const formattedTitle =
    (pathname.split("/").pop() || "")[0].toUpperCase() +
    (pathname.split("/").pop() || "").substring(1);

  if (isAccountIndexPage) {
    pageTitle = `${user?.username}'s Account`;
  } else if (isAddressMode) {
    pageTitle = `${formattedTitle} Address`;
  } else if (isOrderDetailPage) {
    pageTitle = `Order Detail`;
  } else {
    pageTitle = `Your ${formattedTitle}`;
  }

  const paths = pathname.split("/").slice(1);
  const breadCrumbList = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 2).join("/")}`;
    const text = paths
      .filter((path) => path !== params.userId)
      .map((item) => (isOrderDetailPage && index === 2) ? item : item[0].toUpperCase() + item.substring(1))[index];
    return { href, text };
  });

  const filteredBreadCrumbList = breadCrumbList.filter((item) => item.text);

  return (
    <Container>
      <main className="p-6 space-y-5">
        <Skeleton isLoaded={!isLoading} className="inline-block rounded-lg">
          <h1 className="text-4xl font-bold">{pageTitle}</h1>
        </Skeleton>
        <Breadcrumbs size="lg">
          {filteredBreadCrumbList.map((breadcrumb, index) => (
            <BreadcrumbItem key={index} href={breadcrumb.href}>
              {breadcrumb.text}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
        {children}
      </main>
    </Container>
  );
}
