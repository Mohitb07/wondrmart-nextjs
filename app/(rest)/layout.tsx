import Navbar from "@/common/Navbar";
import { UIProvider } from "@/providers/NextUIProvider";
import { ReactQueryProvider } from "@/providers/ReactQuery";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import CustomNotification from "@/common/Notification";
import TopLoaderProvider from "@/providers/TopBarLoader";
import "../globals.css";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "wondrMart",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = cookies();
  const token = store.get("accessToken")?.value || "";
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TopLoaderProvider>
          <ReactQueryProvider>
            <UIProvider>
              <Navbar token={token} />
              {children}
              <CustomNotification />
            </UIProvider>
          </ReactQueryProvider>
        </TopLoaderProvider>
      </body>
    </html>
  );
}
