"use client";

import Container from "@/common/Container";
import useGetCart from "@/hooks/useGetCart";
import useGetProducts from "@/hooks/useGetProducts";
import useGetProductsCount from "@/hooks/useGetProductsCount";
import NotFoundSVG from "@/public/not-found.svg";
import { CartItem } from "@/types";
import { Pagination, Skeleton, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

const LIMIT = 12;

export default function ProductsList() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const sortby = searchParams.get("sort") || "newest";
  const page = searchParams.get("page") || "1";
  console.log("render", query, sortby, page);

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
    isPreviousData,
    onPageChange,
  } = useGetProducts(query, page, sortby);

  const { data: productsCount, isLoading: isCountLoading } =
    useGetProductsCount(query);

  const {
    data: cart,
    isInitialLoading: isCartLoading,
    isError: isCartError,
  } = useGetCart();

  if (isProductsError) throw productsError;

  const cartItems = mapCartItems(cart?.cart_items || []);
  const totalPages = calculateTotalPages(productsCount?.count || 0);

  return (
    <Container>
      <div className={`${isPreviousData && "opacity-60"} products-grid`}>
        {!isProductsLoading &&
          products?.map((product) => (
            <ProductCard
              key={product.product_id}
              id={product.product_id}
              image_url={product.image_url}
              isInCartLoading={isCartLoading}
              isLoading={false}
              name={product.name}
              price={product.price}
              productId={product.product_id}
              cartQty={cartItems[product.product_id] || "0"}
              cartId={cart?.cart_id}
            />
          ))}
      </div>

      {isProductsLoading && (
        <div className="flex justify-center items-center h-[500px]">
          <Spinner label="Loading..." color="primary" />
        </div>
      )}
      {!products?.length && !isProductsLoading && (
        <div className="flex justify-center items-center h-[500px] flex-col">
          <Image
            src={NotFoundSVG}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "30%" }}
            alt="404"
            priority
          />
          <h2 className="text-2xl">
            {query ? `No product found for ${query}` : "No products found"}
          </h2>
        </div>
      )}
      <div className="flex justify-center items-center my-4">
        {!!products && products.length > 0 && (
          <Skeleton isLoaded={!isProductsLoading && !isCountLoading}>
            <Pagination
              isCompact
              showControls
              total={totalPages}
              initialPage={parseInt(page)}
              onChange={onPageChange}
            />
          </Skeleton>
        )}
      </div>
    </Container>
  );
}

function mapCartItems(cartItems: CartItem[]) {
  return cartItems.reduce((acc, item) => {
    acc[item.product_id] = item.quantity.toString();
    return acc;
  }, {} as Record<string, string>);
}

function calculateTotalPages(count: number) {
  return Math.ceil(count / LIMIT);
}
