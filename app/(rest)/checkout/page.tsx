import { getCartItems } from "@/actions/getCartItems";
import Container from "@/common/Container";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../components/getQueryClient";
import Checkout from "./components/CheckoutDetail";

export default function CheckoutPage() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <Container>
        <main className="p-6 space-y-5">
          <Checkout />
        </main>
      </Container>
    </Hydrate>
  );
}
