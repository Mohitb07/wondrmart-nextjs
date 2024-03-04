import Container from "@/common/Container";
import Search from "@/common/Search";
import { dehydrate, Hydrate } from "@tanstack/react-query";

import { getAllProducts } from "@/actions/getProducts";
import { getProductsCount } from "@/actions/getProductsCount";
import getQueryClient from "./components/getQueryClient";
import ProductsList from "./components/ProductsList";

type HomeProps = {
  searchParams: {
    q: string;
    page: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { q, page } = searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", q || "", page || "1"],
    queryFn: () => getAllProducts(q || "", page || "1"),
  });
  await queryClient.prefetchQuery({
    queryKey: ["productsCount", q || ""],
    queryFn: () => getProductsCount(q || ""),
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
