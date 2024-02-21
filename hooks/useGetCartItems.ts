import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { CartType } from "../types";
import { useAuthUser } from "./useAuthUser";
import { getCartItems } from "@/actions/getCartItems";
import useGetUser from "./useGetUser";

type Error = AxiosError;

export interface CartItemData {
  cart: CartType[];
}

const useGetCartItems = () => {
  const { data: user } = useGetUser();
  return useQuery<CartItemData, Error>({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    onError: (err: AxiosError) => {
      //   if (!!user) {
      //     toast({
      //       title: "Try again",
      //       description: "Unable to load cart items",
      //       status: "error",
      //       position: "top-right",
      //       isClosable: true,
      //     });
      //   }
    },
    enabled: !!user,
  });
};

export default useGetCartItems;
