import { getCartCount } from "@/actions/getCartCount";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type Error = AxiosError;

const useGetCartCount = () => {
  return useQuery<number, Error>({
    queryKey: ["cartCount"],
    queryFn: getCartCount,
    onError: (err: AxiosError) => {
      //   toast({
      //     title: "Try again",
      //     description: "Unable to load cart",
      //     status: "error",
      //     position: "top-right",
      //     isClosable: true,
      //   });
      console.log("Error in get cart count", err);
    },
  });
};

export default useGetCartCount;
