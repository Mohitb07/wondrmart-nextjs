import Container from "@/common/Container";
import Search from "@/common/Search";
import { dehydrate, Hydrate } from "@tanstack/react-query";

import ProductsList from "./components/ProductsList";
import getQueryClient from "./components/getQueryClient";
import { getAllProducts } from "@/actions/getProducts";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", ""],
    queryFn: () => getAllProducts(""),
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <Container>
        <main className="p-6 space-y-5">
          <h1 className="text-4xl font-bold">Products</h1>
          <Search />
          <ProductsList />
        </main>
      </Container>
    </Hydrate>
  );
}
