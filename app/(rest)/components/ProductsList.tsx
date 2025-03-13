"use client";

import Container from "@/common/Container";
import useGetCart from "@/hooks/useGetCart";
import useGetProducts from "@/hooks/useGetProducts";
import useGetProductsCount from "@/hooks/useGetProductsCount";
import NotFoundSVG from "@/public/not-found.svg";
import { Pagination, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { Suspense } from "react";

const LIMIT = 12;

export default function ProductsList() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";

  const {
    data,
    isLoading,
    isError: isProductListError,
    error: productListError,
    isPreviousData,
    onPageChange,
  } = useGetProducts(query, page);

  const { data: productsCount, isLoading: isCountLoading } =
    useGetProductsCount(query);

  const {
    data: cart,
    isInitialLoading: isCartItemsLoading,
    isError: isCartError,
  } = useGetCart();
  const isProductListFound = data && data.length > 0;

  if (isProductListError) throw productListError;

  let userCart = cart?.cart_items || [];
  let cartItemsIds: Record<string, string> = {};
  if (!isCartError && !!cart) {
    userCart.map((item) => {
      cartItemsIds[item.product_id] = item.quantity.toString();
    });
  }
  let totalPages = 0;
  if (!!productsCount && productsCount.count) {
    totalPages = Math.ceil(productsCount.count / LIMIT);
  }

  return (
    <Container>
      <Suspense>
        <div
          className={`grid grid-cols-2 ${
            isPreviousData && "opacity-60"
          } md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-16 lg:gap-16 md:p-2 xl:grid-cols-6 xl:gap-5 xl:gap-x-10 md:justify-items-center`}
        >
          {!isLoading &&
            !!data &&
            data.map((product) => (
              <ProductCard
                key={product.product_id}
                id={product.product_id}
                image_url={product.image_url}
                isInCartLoading={isCartItemsLoading}
                // isLoading={!!!data && !isProductListError && isRefetching}
                isLoading={false}
                name={product.name}
                price={product.price}
                productId={product.product_id}
                cartQty={cartItemsIds[product.product_id] || "0"}
                cartId={cart?.cart_id}
              />
            ))}
        </div>
      </Suspense>
      {isLoading && (
        <div className="flex justify-center items-center h-[500px]">
          <Spinner label="Loading..." color="primary" />
        </div>
      )}
      {!isProductListFound && !isLoading && (
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
          {query ? (
            <h2 className="text-2xl">No product found for {query}</h2>
          ) : (
            <h2 className="text-2xl">No products found</h2>
          )}
        </div>
      )}
      <div className="flex justify-center items-center my-4">
        {isCountLoading
          ? null
          : isProductListFound && (
              <Pagination
                showControls
                total={totalPages}
                initialPage={parseInt(page || "1")}
                onChange={onPageChange}
              />
            )}
      </div>
    </Container>
  );
}
