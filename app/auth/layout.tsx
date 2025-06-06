import { UIProvider } from "@/providers/NextUIProvider";
import { ReactQueryProvider } from "@/providers/ReactQuery";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthNavbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "wondrMart | Auth",
  description: "Generated by create next app",
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
          <UIProvider>
            <AuthNavbar />
            {children}
          </UIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
