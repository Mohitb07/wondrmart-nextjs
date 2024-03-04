"use client";

import Container from "@/common/Container";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/actions/getProducts";
import { Pagination, Spinner } from "@nextui-org/react";
import { getCartItems } from "@/actions/getCartItems";
import useGetUser from "@/hooks/useGetUser";
import { getProductsCount } from "@/actions/getProductsCount";
import Image from "next/image";
import NotFoundSVG from "@/public/not-found.svg";
import Cookies from "js-cookie";

const LIMIT = 10;

export default function ProductsList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const page = searchParams.get("page");
  const {
    data,
    isLoading,
    error,
    isPreviousData,
    isError: isProductListError,
    isFetching,
    isInitialLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["products", query || "", page || "1"],
    queryFn: () => getAllProducts(query || "", page || "1"),
    keepPreviousData: false, // whether to show previous data while fetching new data or show the skeleton
    refetchOnWindowFocus: false,
  });

  console.log('isLoading', isFetching, isInitialLoading, isRefetching)
  
  const { data: productsCount, isLoading: isCountLoading } = useQuery({
    queryKey: ["productsCount", query || ""],
    queryFn: () => getProductsCount(query || ""),
    refetchOnWindowFocus: false,
  });

  const {
    data: cartItems,
    isInitialLoading: isCartItemsLoading,
    isError,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    enabled: Cookies.get("accessToken") ? true : false,
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error("Error fetching cart items", err);
    },
  });
  console.log('data', data?.length)
  const isProductListFound = data && data.length > 0;

  if (isProductListError) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  let cartItemsIds: Record<string, string> = {};
  if (!isError && cartItems && cartItems.cart.length) {
    cartItems.cart[0].cart_items.map((item) => {
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
            isLoading={isFetching || isRefetching}
            name={product.name}
            price={product.price}
            productId={product.product_id}
            cartQty={cartItemsIds[product.product_id] || "0"}
            cartId={cartItems?.cart[0]?.cart_id}
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
