"use client";

import Container from "@/common/Container";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/actions/getProducts";
import { Spinner } from "@nextui-org/react";
import { getCartItems } from "@/actions/getCartItems";
import useGetUser from "@/hooks/useGetUser";

export default function ProductsList() {
  const params = useSearchParams();
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", params.get("q") || ""],
    queryFn: () => getAllProducts(params.get("q") || ""),
  });
  const {
    data: cartItems,
    isInitialLoading: isCartItemsLoading,
    isError,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    enabled: !!user && !isUserLoading,
    onError: (err) => {
      console.error("Error fetching cart items", err);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] ">
        <Spinner color="primary" />
      </div>
    );
  }
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  let cartItemsIds: Record<string, string> = {};
  if (!isError && cartItems && cartItems.cart.length) {
    cartItems.cart[0].cart_items.map((item) => {
      cartItemsIds[item.product_id] = item.quantity.toString();
    });
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
            isInCartLoading={isCartItemsLoading}
            name={product.name}
            price={product.price}
            productId={product.product_id}
            cartQty={cartItemsIds[product.product_id] || "0"}
            cartId={cartItems?.cart[0]?.cart_id}
          />
        ))}
      </div>
    </Container>
  );
}
