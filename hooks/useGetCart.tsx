import { getCartItems } from "@/actions/getCartItems";
import { CartType, CustomError } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";

const useGetCart = () => {
  return useQuery<CartType, CustomError>({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    enabled: Cookies.get("accessToken") ? true : false,
    refetchOnWindowFocus: false,
    onError: (err) => {
      const errors = err.response?.data.errors || [];
      toast(errors[0].message, {
        icon: (
          <div className="text-red-500">
            <MdErrorOutline className="text-2xl" />
          </div>
        ),
        duration: 3000,
      });
    },
  });
};

export default useGetCart;
