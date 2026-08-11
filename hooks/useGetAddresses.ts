import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getAddresses } from "@/actions/getAddresses";
import { Address } from "../types";
import { useState } from "react";

type Error = AxiosError;

const useGetAddresses = () => {

  const query = useQuery<Address[], Error>({
    queryKey: ["addresses"],
    queryFn: async () => getAddresses(),
    onError: (error) => {
      console.log("error", error);
    },
  });

  return {
    ...query,
  };
};

export default useGetAddresses;
