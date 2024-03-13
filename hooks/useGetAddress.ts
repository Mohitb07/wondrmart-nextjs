import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Address, AddressModes, User } from "../types";
import { getAddress } from "@/actions/getAddress";
import { useState } from "react";

type Error = AxiosError;

const useGetAddress = (mode: AddressModes) => {
  const [addressId, setAddressId] = useState<string>("");

  const query = useQuery<Address, Error>({
    queryKey: ["address", addressId],
    queryFn: () => getAddress(addressId),
    enabled: mode === "edit" && Boolean(addressId),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const handleAddress = (id: string) => {
    setAddressId(id);
  };

  return {
    ...query,
    handleAddress,
    addressId,
  };
};

export default useGetAddress;
