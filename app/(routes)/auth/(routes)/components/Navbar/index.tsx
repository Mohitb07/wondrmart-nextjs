"use client"

import { AcmeLogo } from "@/common/Navbar/Logo";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";

export default function AuthNavbar() {
  return (
    <Navbar className="border-b border-slate-800">
      <NavbarBrand>
        <AcmeLogo />
        <Link href="/" className="font-bold text-inherit">wondrMart</Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      </NavbarContent>
    </Navbar>
  );
}
