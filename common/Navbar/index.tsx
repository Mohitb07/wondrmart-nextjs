"use client";

import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import NextLink from "next/link";

import { AcmeLogo } from "./Logo";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function StyledNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, isLoading } = useAuthUser();

  const menuItems = ["Profile", "Cart", "Orders", "Log Out"];

  let authStateContent = null;

  if (isLoading) {
    authStateContent = (
      <NavbarContent justify="end">
        <Spinner />
      </NavbarContent>
    );
  } else if (user) {
    authStateContent = (
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
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    );
  } else {
    authStateContent = (
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
            variant="solid"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
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
          <AcmeLogo />
          <Link href="/" className="font-bold text-inherit">
            wondrMart
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Orders
          </Link>
        </NavbarItem>
      </NavbarContent>
      {authStateContent}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
