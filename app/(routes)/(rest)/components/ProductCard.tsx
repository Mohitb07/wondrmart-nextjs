"use client";

import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from "@cloudinary/react";
import { formatPrice } from "@/utils/formatPrice";
import { cloudinaryImage } from "@/utils/cloudinaryImage";

import Link from "next/link";
import { Button, ButtonGroup } from "@nextui-org/react";
import useAddToCart from "@/hooks/useAddToCart";
import useUpdateQuantity from "@/hooks/useUpdateQty";

// import AddToCart from "../AddToCartBtn";

type ProductProps = {
  id: string;
  image_url: string;
  name: string;
  price: string;
  cartQty?: string;
  isInCartLoading: boolean;
  cartId?: string;
  productId: string;
};

const ProductCard = ({
  id,
  image_url,
  name,
  price,
  cartQty,
  productId,
  isInCartLoading,
  cartId,
}: ProductProps) => {
  const { mutate, isLoading: isAdding } = useAddToCart();
  const { mutate: updateQuantity } = useUpdateQuantity();
  const formattedPrice = formatPrice(Number(price));
  const formattedCartQty = Number(cartQty);

  const productImage = cloudinaryImage({
    imageUrl: image_url,
    height: 150,
    width: 150,
  });

  const handleAddToCart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ id: productId, price });
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
      // toast({
      //   title: "Stock Limit",
      //   description: "You cannot add more of this item",
      //   status: "warning",
      //   position: "bottom",
      //   isClosable: true,
      // });
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

  return (
    <div
      data-testid="product-card"
      // className="max-h-[25rem] max-w-[13rem] md:w-[13rem] rounded-md border border-slate-700 overflow-hidden flex flex-col max-sm:pb-2"
      className="card max-h-[25rem] max-w-[13rem] md:w-[13rem] rounded-md border border-slate-700 overflow-hidden flex flex-col max-sm:pb-2"
    >
      <Link href={`/product/${id}`}>
        <div className="overflow-hidden h-[12rem] flex justify-center items-center bg-white">
          <AdvancedImage
            cldImg={productImage}
            // plugins={[placeholder({ mode: "blur" })]}
          />
        </div>
      </Link>
      <div className="px-2 py-1 md:p-3 flex-1 flex flex-col justify-between">
        <Link href={`/product/${id}`}>
          <div>
            <h2 className="line-clamp-1 text-sm">{name}</h2>
          </div>
        </Link>
        <div className="flex items-center justify-between mt-[1rem] flex-wrap">
          <div>
            <h2 className="text-sm">{formattedPrice}</h2>
          </div>
          <div>
            <div className="flex items-center justify-end text-[1rem] max-sm:text-sm gap-2 w-[6rem]">
              {/* <button className="bg-[#BEF264] text-black font-bold rounded-tl-xl rounded-bl-xl px-3 py-1">
                -
              </button> */}
              {/* <button disabled className="bg-[#BEF264] text-black font-bold py-1 w-6 text-center">
                1
              </button>
              <button className=" bg-[#BEF264] rounded-tr-xl rounded-br-xl px-3 text-black font-bold py-1 ">
                +
              </button> */}
              {formattedCartQty > 0 ? (
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
                  <span>{formattedCartQty}</span>
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
                    size="sm"
                    color="primary"
                    variant="faded"
                    isLoading={isAdding}
                    disabled={isAdding}
                  >
                    Add
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
