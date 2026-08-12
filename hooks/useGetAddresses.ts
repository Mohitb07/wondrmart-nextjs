import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getAddresses } from "@/actions/getAddresses";
import { useAuth } from "@/context/AuthContext";
import { Address } from "../types";

type Error = AxiosError;

const useGetAddresses = () => {
  const { user, loading: isUserLoading } = useAuth();

  const query = useQuery<Address[], Error>({
    queryKey: ["addresses"],
    queryFn: async () => getAddresses(),
    enabled: !!user && !isUserLoading,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return {
    ...query,
  };
};

export default useGetAddresses;
