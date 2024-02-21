"use client";

import React from "react";

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
  Spinner,
} from "@nextui-org/react";
import NextLink from "next/link";

import useGetUser from "@/hooks/useGetUser";
import { useLogOut } from "@/hooks/useLogout";
import { usePathname } from "next/navigation";
import { AcmeLogo } from "./Logo";

export default function StyledNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { logOut } = useLogOut();
  const { data: user, status } = useGetUser();
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Products",
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
          <AcmeLogo />
          <Link href="/" className="font-bold text-inherit">
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
      {status === "loading" ? (
        <NavbarContent justify="end">
          <Spinner color="primary" />
        </NavbarContent>
      ) : status === "success" ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={user.username}
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="profile">
                <Link
                  as={NextLink}
                  className="w-full"
                  color="foreground"
                  href="/user/123"
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
                <Link className="w-full" color="foreground" href="/orders">
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
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
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
        </NavbarContent>
      )}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              className="w-full"
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
