import Navbar from "@/common/Navbar";
import { UIProvider } from "@/providers/NextUIProvider";
import { ReactQueryProvider } from "@/providers/ReactQuery";
import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";
import { Inter } from "next/font/google";

import CustomNotification from "@/common/Notification";
import { AuthProvider } from "@/context/AuthContext";
import TopLoaderProvider from "@/providers/TopBarLoader";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  ...defaultMetadata,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TopLoaderProvider>
          <ReactQueryProvider>
            <AuthProvider>
              <UIProvider>
                <Navbar />
                {children}
                <CustomNotification />
              </UIProvider>
            </AuthProvider>
          </ReactQueryProvider>
        </TopLoaderProvider>
      </body>
    </html>
  );
}
