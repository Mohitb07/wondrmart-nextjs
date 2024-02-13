"use client";

import Container from "@/common/Container";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/actions/getProducts";
import { Spinner } from "@nextui-org/react";

export default function ProductsList() {
  const params = useSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", params.get("q") || ""],
    queryFn: () => getAllProducts(params.get("q") || ""),
  });
  console.log("products list", data, isLoading, error);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] ">
        <Spinner color="primary"/>
      </div>
    );
  }
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  return (
    <Container>
      {/* <h1>Product list {params.get("q")}</h1> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-16 lg:gap-16 md:p-2 xl:grid-cols-6 xl:gap-5 xl:gap-x-10 md:justify-items-center">
        {data?.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            image_url={product.image_url}
            isInCartLoading={false}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </Container>
  );
}
