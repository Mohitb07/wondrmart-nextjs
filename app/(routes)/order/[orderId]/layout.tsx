import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { noindexRobots } from "@/lib/seo";
import Container from "@/common/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Order Status",
  description: "Check the status of your wondrMart order.",
  robots: noindexRobots,
};

export default function OrderVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      {/* 65px -> 4rem height of the navbar (4x16) = 64 + 1px (border-bottom) = 65px */}
      <div className="h-[calc(100vh-65px)] flex items-center justify-center lg:items-start lg:py-[4rem]">
        <div className="flex justify-center items-center flex-col space-y-4 mb-[50%]">
          {children}
        </div>
      </div>
    </Container>
  );
}
