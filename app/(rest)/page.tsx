import Container from "@/common/Container";
import Search from "@/common/Search";
import { dehydrate, Hydrate } from "@tanstack/react-query";

import { getAllProducts } from "@/actions/getProducts";
import { getProductsCount } from "@/actions/getProductsCount";
import getQueryClient from "./components/getQueryClient";
import ProductsList from "./components/ProductsList";
import Banner from "./components/Banner";
import Theme from "@/common/Theme";

type HomeProps = {
  searchParams: {
    q: string;
    page: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { q, page } = searchParams;
  const queryClient = getQueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["products"],
  //   queryFn: () => getAllProducts(q || "", page || "1"),
  // });
  await queryClient.prefetchQuery({
    queryKey: ["productsCount", q || ""],
    queryFn: () => getProductsCount(q || ""),
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <div className="wrapper">
        <Banner />
        <Container styles="search-container">
          <Search />
        </Container>
      </div>
      <div>
        <Container>
          <main className="p-6 space-y-5 py-12">
            <h1 className="text-4xl font-bold">Top Deals</h1>
            <ProductsList />
          </main>
        </Container>
      </div>
    </Hydrate>
  );
}
