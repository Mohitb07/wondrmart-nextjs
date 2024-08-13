import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CartType } from "../types";
import { addQuantity } from "@/actions/updateQty";

type CartItemData = CartType | undefined;

const useUpdateQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      addQuantity(
        data.product_id,
        data.unit_amount,
        data.quantity,
        data.cart_id
      ),
    onMutate: async (data: any) => {
      console.log("data getting", data);
      await queryClient.cancelQueries({ queryKey: ["cartItems"] });
      const previousCartItems: CartItemData = queryClient.getQueryData([
        "cartItems",
      ]);
      const clonned = structuredClone(previousCartItems);
      console.log("clonned", clonned);
      if (clonned) {
        for (let i = 0; i < clonned.cart_items.length; i++) {
          if (clonned.cart_items[i].product_id === data.product_id) {
            clonned.cart_items[i].quantity = data.quantity;
            clonned.cart_items[i].total_amount = (
              Number(data.quantity) * Number(data.unit_amount)
            ).toString();
          }
        }
      }
      console.log("previousCartItems", previousCartItems);
      console.log("updated checking", clonned);
      queryClient.setQueryData(["cartItems"], clonned);
      return { previousCartItems };
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (err: any, data, context: any) => {
      console.log("inside error", context.previousCartItems);
      queryClient.setQueryData(["cartItems"], context.previousCartItems);

      //   toast({
      //     title: "Try again",
      //     description: "Unable to update the quantity",
      //     status: "error",
      //     position: "top-right",
      //     isClosable: true,
      //   });
    },
  });
};

export default useUpdateQuantity;
