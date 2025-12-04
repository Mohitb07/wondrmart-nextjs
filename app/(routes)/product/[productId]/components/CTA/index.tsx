"use client";

import { Button } from "@nextui-org/react";
import React from "react";
import useAddToCart from "@/hooks/useAddToCart";
import useUpdateQuantity from "@/hooks/useUpdateQty";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { debounce } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { CartType } from "@/types";
import useGetCart from "@/hooks/useGetCart";

type CTAProps = {
  cartQty: string;
  productId: string;
  price: string;
  cartId?: string;
};

const CTA: React.FC<CTAProps> = ({ productId, price, cartId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isLoading: isAdding } = useAddToCart();
  const [isCartQtyVisible, setIsCartQtyVisible] = React.useState(true);
  const { mutate: updateQuantity } = useUpdateQuantity();
  const { data: cart } = useGetCart();
  const cartQty =
    cart?.cart_items?.find((item) => item.product_id === productId)?.quantity ||
    "0";
  const formattedCartQty = Number(cartQty) || 0;
  const [quantity, setQuantity] = React.useState<number>(formattedCartQty);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    setQuantity(quantity + 1);
    mutate({ id: productId });
  };

  const onQuantityChange = (qty: number) => {
    console.log("fucntion called", qty);
    updateQuantity({
      product_id: productId,
      unit_amount: price,
      quantity: qty.toString(),
      cart_id: cartId,
    });
  };

  const onAddQty = () => {
    console.log("onAddQty called", formattedCartQty);
    const currentQty = formattedCartQty;
    const newQty = currentQty + 1;
    setQuantity(newQty);
    queryClient.setQueryData(["cartItems"], (oldCart: any) => {
      if (!oldCart) return oldCart;
      const updatedCart = { ...oldCart } as CartType;
      const item = updatedCart.cart_items.find(
        (item) => item.product_id === productId
      );
      if (item) {
        // NEED TO CHECK THE TYPE OF NEW QUANTITY DEFAULT WAS A NUMBER
        item.quantity = String(newQty);
      }
      return updatedCart;
    });

    if (currentQty === 4) {
      toast("You can only add up to 4 items", {
        icon: "👏",
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    const debounceFunction = debounce(onQuantityChange, 6000);
    debounceFunction(newQty);
  };

  const onRemoveQty = () => {
    const currentQty = formattedCartQty;
    setQuantity(currentQty - 1);
    if (currentQty > 0) {
      onQuantityChange(currentQty - 1);
    }
  };

  const onBuyNow = () => {
    setIsCartQtyVisible(false);
    mutate({ id: productId });
    setTimeout(() => {
      router.push("/cart");
    }, 1000);
  };

  return (
    <div className="gap-3 flex flex-col">
      {formattedCartQty > 0 && isCartQtyVisible ? (
        <div className="w-full flex justify-between items-center">
          <Button
            isIconOnly
            size="sm"
            color="primary"
            variant="faded"
            aria-label="increase quantity"
            style={{
              fontSize: "1.2rem",
            }}
            onClick={onRemoveQty}
          >
            -
          </Button>
          <span>{cartQty}</span>
          <Button
            isIconOnly
            size="sm"
            color="primary"
            variant="faded"
            aria-label="increase quantity"
            style={{
              fontSize: "1.2rem",
            }}
            onClick={onAddQty}
          >
            +
          </Button>
        </div>
      ) : (
        <form onSubmit={handleAddToCart} className="w-full">
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="solid"
            isLoading={isAdding}
            isDisabled={isAdding}
          >
            Add to Cart
          </Button>
        </form>
      )}
      <Button onClick={onBuyNow} color="primary" variant="bordered" fullWidth>
        Buy Now
      </Button>
    </div>
  );
};
export default CTA;
