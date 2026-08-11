import { getUserOrders } from "@/actions/getOrders";
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
  const query = useQuery<Order[], Error>({
    queryKey: ["userOrders", userId],
    queryFn: () => getUserOrders(userId),
  });

  return {
    ...query,
  };
};

export default useGetUserOrders;
