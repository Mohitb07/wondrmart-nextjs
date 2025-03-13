import Container from "@/common/Container";
import Checkout from "./components/CheckoutDetail";

export default function CheckoutPage() {
  return (
    <Container>
      <main className="p-3 space-y-5">
        <Checkout />
      </main>
    </Container>
  );
}
