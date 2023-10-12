"use client";

import Container from "@/common/Container";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  console.log("products list");
  const params = useSearchParams();
  return (
    <Container>
      {/* <h1>Product list {params.get("q")}</h1> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-16 lg:gap-16 md:p-2 xl:grid-cols-6 xl:gap-5 xl:gap-x-10 md:justify-items-center">
        <ProductCard
          id="123"
          image_url="fasfd"
          isInCartLoading={false}
          name="watch se"
          price="200"
        />
        <ProductCard
          id="123"
          image_url="fasfd"
          isInCartLoading={false}
          name="watch se fadffffffffffffffffffffffffffffffff"
          price="200"
        />
        <ProductCard
          id="123"
          image_url="fasfd"
          isInCartLoading={false}
          name="watch se"
          price="200"
        />
        <ProductCard
          id="123"
          image_url="fasfd"
          isInCartLoading={false}
          name="watch se"
          price="200"
        />
        <ProductCard
          id="123"
          image_url="fasfd"
          isInCartLoading={false}
          name="watch se"
          price="200"
        />
        <ProductCard
          id="123"
          image_url="fasfd"
          isInCartLoading={false}
          name="watch se"
          price="200"
        />
        <ProductCard
          id="123"
          image_url="fasfd"
          isInCartLoading={false}
          name="watch se"
          price="200"
        />
        <ProductCard
          id="123"
          image_url="fasfd"
          isInCartLoading={false}
          name="watch se"
          price="200"
        />
      </div>
    </Container>
  );
}
