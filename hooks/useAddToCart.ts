import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addToCart } from "@/actions/addToCart";
import { CartType } from "@/types";
import useGetUser from "./useGetUser";
import toast from "react-hot-toast";

const useAddToCart = () => {
  const { data: user } = useGetUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => addToCart(data.id),
    onMutate: async (data: any) => {
      await queryClient.cancelQueries({ queryKey: ["cartItems"] });
      const previousCartItems: CartType | null =
        queryClient.getQueryData(["cartItems"]) || null;
      console.log("previousCartItems", previousCartItems);
      let newCart;
      try {
        if (!!previousCartItems?.cart_items) {
          console.log("inside if");
          let clonned;
          clonned = structuredClone(previousCartItems);
          newCart = {
            cart_id: clonned.cart_id,
            status: clonned.status,
            customer_id: clonned.customer_id,
            cart_items: [
              ...clonned.cart_items,
              {
                quantity: 1,
                product_id: data.id,
                total_amount: data.price,
              },
            ],
          };
        } else {
          console.log("inside if else");
          newCart = {
            cart_id: "",
            status: "active",
            customer_id: user?.customer_id,
            cart_items: [
              {
                quantity: 1,
                product_id: data.id,
                total_amount: data.price,
              },
            ],
          };
        }
      } catch (error) {
        console.error("Error cloning cart items:", error);
        return { previousCartItems };
      }
      queryClient.setQueryData(["cartItems"], newCart);
      return { previousCartItems };
    },
    onSuccess: (data, variables) => {
      console.log("data success", data);
      console.log("data var", variables);
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(["cartItems"], context.previousCartItems);
      if (!!user) {
        toast.error("Unable to add to cart", {
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        console.error("error", error);
      }
    },
  });
};

export default useAddToCart;
