import Container from "@/common/Container";
import Search from "@/common/Search";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { getProductsCount } from "@/actions/getProductsCount";
import getQueryClient from "./components/getQueryClient";
import ProductsList from "./components/ProductsList";
import Banner from "./components/Banner";
import SortProducts from "./components/Sort";

type HomeProps = {
  searchParams: {
    q: string;
    page: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { q = "" } = searchParams;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["productsCount", q],
    queryFn: () => getProductsCount(q),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className="wrapper">
        <Banner />
        <Container styles="search-container">
          <Search />
        </Container>
      </div>
      <div>
        <Container>
          <main className="p-3 space-y-5 py-12">
            <div className="flex items-baseline">
              <h1 className="text-4xl font-bold mr-auto">Top Deals</h1>
              <SortProducts />
            </div>
            <ProductsList />
          </main>
        </Container>
      </div>
    </Hydrate>
  );
}
