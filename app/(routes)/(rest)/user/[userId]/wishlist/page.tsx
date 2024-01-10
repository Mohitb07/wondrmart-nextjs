import Container from "@/common/Container";

export const metadata = {
  title: "Your Wishlist",
  description: "Edit, remove or add to cart",
};

export default async function WishlistPage() {
  return (
    <Container>
      <main className="p-6 space-y-5">
        <h1 className="text-4xl font-bold">Your Wishlist</h1>
      </main>
    </Container>
  );
}
