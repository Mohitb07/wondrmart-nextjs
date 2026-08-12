import { UIProvider } from "@/providers/NextUIProvider";
import { ReactQueryProvider } from "@/providers/ReactQuery";
import type { Metadata } from "next";
import { noindexRobots, siteConfig } from "@/lib/seo";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthNavbar from "./components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Account`,
    template: `%s | ${siteConfig.name}`,
  },
  description: "Sign in or create your wondrMart account to access orders, wishlist, and exclusive deals.",
  robots: noindexRobots,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthProvider>
            <UIProvider>
              <AuthNavbar />
              {children}
            </UIProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
