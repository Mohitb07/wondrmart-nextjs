import { AdvancedImage } from "@cloudinary/react";
import { formatPrice } from "@/lib/formatPrice";
import { cloudinaryImage } from "@/lib/cloudinaryImage";

import Link from "next/link";
import { Button, ButtonGroup } from "@nextui-org/react";

// import AddToCart from "../AddToCartBtn";

type ProductProps = {
  id: string;
  image_url: string;
  name: string;
  price: string;
  cartQty?: string;
  isInCartLoading: boolean;
  cartId?: string;
};

const ProductCard = ({
  id,
  image_url,
  name,
  price,
  cartQty,
  isInCartLoading,
  cartId,
}: ProductProps) => {
  const formattedPrice = formatPrice(Number(price));
  const formattedCartQty = Number(cartQty);

  const productImage = cloudinaryImage({
    imageUrl: image_url,
    height: 150,
    width: 150,
  });

  return (
    <div
      data-testid="product-card"
      className="max-h-[25rem] max-w-[13rem] md:w-[13rem] rounded-md border border-slate-700 overflow-hidden flex flex-col max-sm:pb-2"
    >
      <Link href={`/product/${id}`}>
        <div className="overflow-hidden h-[12rem] flex justify-center items-center bg-white">
          <AdvancedImage cldImg={productImage} />
        </div>
      </Link>
      <div className="px-2 md:p-3 flex-1 flex flex-col justify-between">
        <Link href={`/product/${id}`}>
          <div>
            <h2 className="line-clamp-2">{name}</h2>
          </div>
        </Link>
        <div className="flex items-center justify-between mt-[1rem]">
          <div>
            <h2 className="text-xs md:text-sm">{formattedPrice}</h2>
          </div>
          <div>
            <div className="w-[6rem] flex items-center justify-end text-[1rem] max-sm:text-sm">
              <button className="bg-[#BEF264] text-black font-bold rounded-tl-xl rounded-bl-xl px-3 py-1">
                -
              </button>
              <button disabled className="bg-[#BEF264] text-black font-bold py-1 w-6 text-center">
                1
              </button>
              <button className=" bg-[#BEF264] rounded-tr-xl rounded-br-xl px-3 text-black font-bold py-1 ">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
