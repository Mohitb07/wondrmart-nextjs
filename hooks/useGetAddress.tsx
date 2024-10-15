import { useQuery } from "@tanstack/react-query";

import { getAddress } from "@/actions/getAddress";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";
import { Address, AddressModes, CustomError } from "../types";
import { notFound } from "next/navigation";

const useGetAddress = (mode: AddressModes) => {
  const [addressId, setAddressId] = useState<string>("");

  const query = useQuery<Address, CustomError>({
    queryKey: ["address", addressId],
    queryFn: () => getAddress(addressId),
    enabled: mode === "edit" && Boolean(addressId),
    retry: 2,
    refetchOnWindowFocus: false,
    onError: (err) => {
      // console.log('error', err)
      // const errors = err.response?.data.errors || [];
      // toast(errors[0].message, {
      //   icon: (
      //     <div className="text-red-500">
      //       <MdErrorOutline className="text-2xl" />
      //     </div>
      //   ),
      //   duration: 3000,
      // });
    },
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
