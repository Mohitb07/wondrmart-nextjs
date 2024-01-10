import Container from "@/common/Container";

export const metadata = {
  title: "Your Orders",
  description: "Track, return, or buy things again",
};

export default function OrdersPage() {
  return (
    <Container>
      <main className="p-6 space-y-5">
        <h1 className="text-4xl font-bold">Your Orders</h1>
      </main>
    </Container>
  );
}
