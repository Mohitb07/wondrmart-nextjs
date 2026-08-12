import { getCartCount } from "@/actions/getCartCount";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type Error = AxiosError;

const useGetCartCount = () => {
  const { user } = useAuth();
  const userId = user?.customer_id ?? user?.id;

  return useQuery<number, Error>({
    queryKey: ["cartCount", userId],
    queryFn: getCartCount,
    enabled: !!userId,
  });
};

export default useGetCartCount;
