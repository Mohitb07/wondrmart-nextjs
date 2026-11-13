import type { Metadata } from "next";
import { noindexRobots } from "@/lib/seo";
import Container from "@/common/Container";

export const metadata: Metadata = {
  title: "Order Status | WondrMart",
  description: "Check the status of your WondrMart order.",
  robots: noindexRobots,
};

export default function OrderVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className="min-h-[calc(100vh-80px)] py-8 sm:py-12 md:py-16 flex items-center justify-center">
        <div className="w-full max-w-xl">
          {children}
        </div>
      </div>
    </Container>
  );
}