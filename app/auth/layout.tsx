import type { Metadata } from "next";
import { noindexRobots, siteConfig } from "@/lib/seo";
import AuthNavbar from "./components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Account`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Sign in or create your wondrMart account to access orders, wishlist, and exclusive deals.",
  robots: noindexRobots,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthNavbar />
      {children}
    </>
  );
}

