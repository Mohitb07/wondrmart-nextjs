"use client";

import { getAllProducts } from "@/actions/getProducts";
import { getProductsCount } from "@/actions/getProductsCount";
import Container from "@/common/Container";
import useGetCart from "@/hooks/useGetCart";
import NotFoundSVG from "@/public/not-found.svg";
import { Pagination } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

const LIMIT = 10;

export default function ProductsList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const page = searchParams.get("page");
  const {
    data,
    error: productListError,
    isPreviousData,
    isError: isProductListError,
    isLoading,
    isRefetching,
    status,
    fetchStatus,
    isFetched,
    isFetchedAfterMount,
    isInitialLoading,
    isFetching,
    isStale,
  } = useQuery({
    queryKey: ["products", query || "", page || "1"],
    queryFn: () => getAllProducts(query || "", page || "1"),
    keepPreviousData: false, // whether to show previous data while fetching new data or show the skeleton
    refetchOnWindowFocus: false,
  });
  console.log("isRefetching", isRefetching);
  console.log("isFetching", isFetching);
  console.log("isStale", isStale);
  console.log("isInitialLoading", isInitialLoading);
  console.log("isFetched", isFetched);
  console.log("isFetchedAfterMount", isFetchedAfterMount);
  console.log("fetchStatus", fetchStatus);
  console.log("status", status);
  console.log("isLoading", isLoading);
  console.log('-------------------------------')

  const {
    data: productsCount,
    isLoading: isCountLoading,
    isError: isProductCountError,
    error: productCountError,
  } = useQuery({
    queryKey: ["productsCount", query || ""],
    queryFn: () => getProductsCount(query || ""),
    refetchOnWindowFocus: false,
  });
  const {
    data: cart,
    isInitialLoading: isCartItemsLoading,
    isError: isCartError,
    error: cartError,
  } = useGetCart();
  const isProductListFound = data && data.length > 0;

  // Need to handle error
  if (isProductListError || isProductCountError || isCartError) {
    return (
      <div>
        Error:{" "}
        {JSON.stringify(productListError || productCountError || cartError)}
      </div>
    );
  }
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

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Container>
      <div
        className={`grid grid-cols-2 ${
          isPreviousData && "opacity-60"
        } md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-16 lg:gap-16 md:p-2 xl:grid-cols-6 xl:gap-5 xl:gap-x-10 md:justify-items-center`}
      >
        {data?.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            image_url={product.image_url}
            isInCartLoading={isCartItemsLoading}
            // isLoading={!!!data && !isProductListError && isRefetching}
            isLoading={fetchStatus === 'fetching'}
            name={product.name}
            price={product.price}
            productId={product.product_id}
            cartQty={cartItemsIds[product.product_id] || "0"}
            cartId={cart?.cart_id}
          />
        ))}
      </div>
      {!isProductListFound && (
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
                initialPage={1}
                onChange={onPageChange}
              />
            )}
      </div>
    </Container>
  );
}
