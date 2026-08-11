import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { addToCart } from "@/actions/addToCart";
import { CartType } from "@/types";
import toast from "react-hot-toast";

const useAddToCart = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!user) {
        router.push("/auth/signin");
        throw new Error("UNAUTHENTICATED");
      }
      return addToCart(data.id);
    },
    onMutate: async (data: any) => {
      if (!user) {
        router.push("/auth/signin");
        throw new Error("UNAUTHENTICATED");
      }
      await queryClient.cancelQueries({ queryKey: ["cartItems"] });
      const previousCartItems: CartType | null =
        queryClient.getQueryData(["cartItems"]) || null;
      console.log("previousCartItems", previousCartItems);
      
      let clonned = previousCartItems ? (structuredClone(previousCartItems) as CartType) : null;
      let newCart = {
        cart_id: clonned?.cart_id || "",
        status: clonned?.status || "active",
        customer_id: clonned?.customer_id || user?.customer_id || "",
        cart_items: [
          ...(clonned?.cart_items || []),
          {
            quantity: 1,
            product_id: data.id,
            total_amount: data.price,
          },
        ],
      };
      console.log("newCart", newCart);
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
    },
  });
};

export default useAddToCart;
