"use client";

import Container from "@/common/Container";
import { useSearchParams } from "next/navigation";

export default function ProductsList() {
  console.log("products list");
  const params = useSearchParams();
  return (
    <Container>
      <h1>Product list {params.get("q")}</h1>
    </Container>
  );
}
