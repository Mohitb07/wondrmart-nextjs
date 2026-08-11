import { removeUserAddress } from "@/actions/removeUserAddress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useRemoveAddress = () => {
  const qc = useQueryClient();
  const [addressId, setAddressId] = useState("");
  const mutation = useMutation({
    mutationFn: (addressId: string) => removeUserAddress(addressId),
    onSuccess: () => {
      console.log("address removed");
      qc.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: () => {
      console.error("Address removal Something went wrong");
    },
  });

  return {
    ...mutation,
    addressId,
    setAddressId,
  };
};

export default useRemoveAddress;
