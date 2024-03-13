import { useMutation } from "@tanstack/react-query";

import { AddressFormData } from "@/types";
import { usePathname } from "next/navigation";
import { updateAddress } from "@/actions/updateAddress";

const useUpdateAddress = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").slice(0, -1);
  const url = paths.join("/");
  return useMutation({
    mutationFn: (data: AddressFormData) => {
      return updateAddress({
        apartment: data.apartment,
        area: data.area,
        city: data.city,
        state: data.state,
        country: data.country,
        isDefault: data.isDefault,
        mobile: data.mobile,
        name: data.name,
        pinCode: data.pinCode,
      });
    },
    onSuccess: (data, variables) => {
      window.location.href = url;
    },
    onError: (error, variables, context) => {},
  });
};

export default useUpdateAddress;
