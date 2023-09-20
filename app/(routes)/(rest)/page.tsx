import Container from "@/common/Container";
import Search from "@/common/Search";
import ProductsList from "./components/ProductsList";

export default async function Home() {
  console.log("home");
  return (
    <Container>
      <main className="p-6">
        <div className="space-y-5">
          <h1 className="text-4xl font-bold">Products</h1>
          <Search />
          <ProductsList/>
        </div>
      </main>
    </Container>
  );
}
