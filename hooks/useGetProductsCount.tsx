import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getProductsCount } from "@/actions/getProductsCount";
import toast from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";

type Error = AxiosError<
  {
    errors: { message: string }[];
  },
  any
>;

const useGetProductsCount = (queryKey: string) => {
  const query = useQuery<{ count: number }, Error>({
    queryKey: ["productsCount", queryKey],
    queryFn: () => getProductsCount(queryKey),
    refetchOnWindowFocus: false,
    retry: 2,
    onError: (err) => {
      const errors = err.response?.data.errors || [];
      const msg = errors[0]?.message || "An error occurred";
      toast(msg, {
        icon: (
          <div className="text-red-500">
            <MdErrorOutline className="text-2xl" />
          </div>
        ),
        duration: 3000,
      });
    },
  });

  return {
    ...query,
  };
};

export default useGetProductsCount;
