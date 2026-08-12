import { getUserOrders } from "@/actions/getOrders";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type Error = AxiosError<
  {
    errors: { message: string };
  },
  any
>;

const useGetUserOrders = (userId: string) => {
  const { user, loading: isUserLoading } = useAuth();

  const query = useQuery<Order[], Error>({
    queryKey: ["userOrders", userId],
    queryFn: () => getUserOrders(userId),
    enabled: !!userId && !!user && !isUserLoading,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
  });

  return {
    ...query,
  };
};

export default useGetUserOrders;
