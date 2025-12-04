"use client";

import useAddToCart from "@/hooks/useAddToCart";
import useUpdateQuantity from "@/hooks/useUpdateQty";
import { debounce } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import ProductServices from "../../Services";
import useGetCart from "@/hooks/useGetCart";
import { useQueryClient } from "@tanstack/react-query";
import { CartType } from "@/types";

type CardCTAProps = {
  cartQty: string;
  productId: string;
  price: string;
  cartId?: string;
};

const CardCTA: React.FC<CardCTAProps> = ({ productId, price, cartId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: cart } = useGetCart(); // Use React Query to always get the lates

  // console.log("formatted cart qty", formattedCartQty);
  const { mutate, isLoading: isAdding } = useAddToCart();
  const [isCartQtyVisible, setIsCartQtyVisible] = React.useState(true);
  const { mutate: updateQuantity } = useUpdateQuantity();

  const cartQty =
    cart?.cart_items?.find((item) => item.product_id === productId)?.quantity ||
    "0";
  const formattedCartQty = Number(cartQty) || 0;
  const [quantity, setQuantity] = React.useState<number>(formattedCartQty);

  console.log("cart qty getting", cartQty);

  const handleAddToCart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuantity(quantity + 1);
    mutate({ id: productId });
  };

  const onQuantityChange = (qty: number) => {
    console.log("now updating", qty);
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
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex items-start gap-2 justify-center">
        <ProductServices />
      </CardHeader>
      <Divider className="my-1" />
      <CardBody className="overflow-visible py-2">
        <div className="gap-3 flex flex-col">
          {Number(cartQty) > 0 && isCartQtyVisible ? (
            <div className="w-full flex justify-between items-center">
              <Button
                isIconOnly
                size="md"
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
                size="md"
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
            <form onSubmit={handleAddToCart}>
              <Button
                type="submit"
                color="primary"
                isLoading={isAdding}
                isDisabled={isAdding}
                variant="solid"
                fullWidth
              >
                Add to Cart
              </Button>
            </form>
          )}
          <Button
            onClick={onBuyNow}
            color="primary"
            variant="bordered"
            fullWidth
          >
            Buy Now
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default CardCTA;
