import { deleteCartItem } from "@/actions/deleteCartItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type RemoveCartItemMutationData = { cartId: string; cartItemId: string };

const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RemoveCartItemMutationData) =>
      deleteCartItem(data.cartId, data.cartItemId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (err: any) => {
      //   toast({
      //     title: "Try again",
      //     description: "Unable to remove cart item",
      //     status: "error",
      //     position: "top-right",
      //     isClosable: true,
      //   });
      console.error(err);
    },
  });
};

export default useRemoveCartItem;
