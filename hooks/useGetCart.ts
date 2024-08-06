import { getCartItems } from "@/actions/getCartItems";
import { CartType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const useGetCart = () => {
  return useQuery<CartType>({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    enabled: Cookies.get("accessToken") ? true : false,
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error("Error fetching cart items", err);
    },
  });
};

export default useGetCart;
