import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthUser } from "./useAuthUser";
import { addToCart } from "@/actions/addToCart";

const useAddToCart = () => {
  const { user } = useAuthUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => addToCart(data.id),
    onSuccess: (data, variables) => {
      console.log("data success", data);
      console.log("data var", variables);
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (error, variables, context) => {
      if (!!user) {
        // toast({
        //   title: "Try again",
        //   description: "Unable to add item to cart",
        //   status: "error",
        //   position: "top-right",
        //   isClosable: true,
        // });
        console.error("error", error);
      }
    },
  });
};

export default useAddToCart;
