"use client";

import { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
} from "@nextui-org/react";
import NextLink from "next/link";

import useGetUser from "@/hooks/useGetUser";
import { useLogOut } from "@/hooks/useLogout";

import { usePathname } from "next/navigation";
import CartCount from "./components/CartCount";
import { BrandLogo } from "./Logo";

export default function StyledNavbar({ token }: { token: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logOut } = useLogOut();
  const { data: user, status, isLoading } = useGetUser();
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Top Deals",
      href: "/",
    },
    {
      name: "Categories",
      href: "/categories",
    },
    {
      name: "Top Sellers",
      href: "/topseller",
    },
  ];

  let content = null;
  if (isLoading && !!token) {
    content = <Skeleton className="flex rounded-full w-10 h-10" />;
  } else if (status === "success") {
    content = (
      <>
        <CartCount />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={user.username}
              size="sm"
              src={user.avatar}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile-data"
              className="h-14 gap-2"
              textValue="Profile Data"
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.email}</p>
            </DropdownItem>
            <DropdownItem key="profile">
              <Link
                as={NextLink}
                className="w-full"
                color="foreground"
                href={`/user/${user.customer_id}`}
              >
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem key="cart">
              <Link
                as={NextLink}
                className="w-full"
                color="foreground"
                href="/cart"
              >
                Cart
              </Link>
            </DropdownItem>
            <DropdownItem key="orders">
              <Link
                className="w-full"
                color="foreground"
                href={`/user/${user.customer_id}/orders`}
              >
                Orders
              </Link>
            </DropdownItem>
            <DropdownItem
              className="w-full"
              onClick={logOut}
              key="logout"
              color="danger"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </>
    );
  } else {
    content = (
      <>
        <NavbarItem className="hidden lg:flex">
          <Link as={NextLink} href="/auth/signin">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={NextLink}
            color="primary"
            href="/auth/signup"
            variant="shadow"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </>
    );
  }

  return (
    <Navbar
      maxWidth="2xl"
      onMenuOpenChange={setIsMenuOpen}
      className="border-b border-slate-800"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <BrandLogo />
          <Link href="/" className="font-bold">
            wondrMart
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            isActive={pathname === item.href}
            key={`${item.name}-${index}`}
          >
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end"></NavbarContent>
      {content}
      <NavbarMenu className="flex justify-center gap-10">
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item.name}-${index}`}
            className="w-full text-center"
          >
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              className="p-8 w-full flex justify-center"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
