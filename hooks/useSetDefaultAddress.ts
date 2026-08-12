import { setDefaultUserAddress } from "@/actions/setDefaultAddress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useSetDefaultAddress = () => {
  const qc = useQueryClient();
  const [addressId, setAddressId] = useState("");
  const mutation = useMutation({
    mutationFn: (addressId: string) => setDefaultUserAddress(addressId),
    onSuccess: () => {
      console.log("default address updated");
      qc.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: () => {
      console.error("Failed to set default address");
    },
  });

  return {
    ...mutation,
    addressId,
    setAddressId,
  };
};

export default useSetDefaultAddress;
