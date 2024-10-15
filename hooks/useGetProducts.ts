import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getAllProducts } from "@/actions/getProducts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CustomError, Product } from "../types";

const useGetProducts = (queryKey: string, page: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = useQuery<Product[], CustomError>({
    queryKey: ["products", queryKey, page],
    queryFn: () => getAllProducts(queryKey, page),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    ...query,
    onPageChange,
  };
};

export default useGetProducts;
