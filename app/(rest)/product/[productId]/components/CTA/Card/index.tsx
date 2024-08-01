"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Divider,
} from "@nextui-org/react";
import ProductServices from "../../Services";
import useAddToCart from "@/hooks/useAddToCart";
import useUpdateQuantity from "@/hooks/useUpdateQty";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type CardCTAProps = {
  cartQty: string;
  productId: string;
  price: string;
  cartId?: string;
};

const CardCTA: React.FC<CardCTAProps> = ({
  cartQty,
  productId,
  price,
  cartId,
}) => {
  const router = useRouter();
  const { mutate, isLoading: isAdding } = useAddToCart();
  const [isCartQtyVisible, setIsCartQtyVisible] = React.useState(true);
  const { mutate: updateQuantity } = useUpdateQuantity();
  const formattedCartQty = Number(cartQty);

  const handleAddToCart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ id: productId });
  };

  const onQuantityChange = (qty: number) => {
    updateQuantity({
      product_id: productId,
      unit_amount: price,
      quantity: qty.toString(),
      cart_id: cartId,
    });
  };

  const onAddQty = () => {
    const currentQty = formattedCartQty;
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
    onQuantityChange(currentQty + 1);
  };
  const onRemoveQty = () => {
    const currentQty = formattedCartQty;
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
          {formattedCartQty > 0 && isCartQtyVisible ? (
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
              <span>{formattedCartQty}</span>
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
