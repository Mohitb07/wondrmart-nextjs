import Container from "@/common/Container";
import Checkout from "./components/CheckoutDetail";
import { noindexRobots } from "@/lib/seo";

export const metadata = {
  title: "Checkout",
  description: "Complete your purchase securely on wondrMart.",
  robots: noindexRobots,
};


export default function CheckoutPage() {
  return (
    <Container>
      <main className="p-3 space-y-5">
        <Checkout />
      </main>
    </Container>
  );
}
