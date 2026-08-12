import Container from "@/common/Container";
import CartDetail from "./components/CartDetail";
import { noindexRobots } from "@/lib/seo";

export const metadata = {
  title: "Your Shopping Cart",
  description: "Review and manage the items in your wondrMart shopping cart.",
  robots: noindexRobots,
};

const Cart = () => {
  return (
    <Container>
      <div className="p-3 md:py-10">
        <CartDetail />
      </div>
    </Container>
  );
};
export default Cart;
