import { getCartItems } from "@/actions/getCartItems";
import { useAuth } from "@/context/AuthContext";
import { CartType, CustomError } from "@/types";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";

const useGetCart = () => {
  const { user, loading: isUserLoading } = useAuth();

  return useQuery<CartType, CustomError>({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    enabled: !!user && !isUserLoading,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
    onError: (err) => {
      console.error("Error fetching cart items:", err);
      const errors = err.response?.data?.errors || [];
      if (errors.length > 0 && errors[0]?.message) {
        toast(errors[0].message, {
          icon: (
            <div className="text-red-500">
              <MdErrorOutline className="text-2xl" />
            </div>
          ),
          duration: 3000,
        });
      }
    },
  });
};

export default useGetCart;
