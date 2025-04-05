"use client";

import useRemoveCartItem from "@/hooks/useDeleteCartItem";
import useGetCart from "@/hooks/useGetCart";
import useGetUser from "@/hooks/useGetUser";
import useUpdateQuantity from "@/hooks/useUpdateQty";
import NotFoundSVG from "@/public/not-found.svg";
import { calculateCartPrice } from "@/utils/cartPrice";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import CartItem from "./CartItem";
import CouponInput from "./Coupon";
import OrderSummary from "./Summary";

const CartDetail = () => {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const {
    data: cart,
    isInitialLoading: isCartLoading,
    isError,
    error,
  } = useGetCart();
  const { mutate: updateQuantityHandler } = useUpdateQuantity();
  const { mutate: removeCartItemHandler } = useRemoveCartItem();

  if (isCartLoading || isUserLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-[500px] ">
          <Spinner color="primary" />
        </div>
      </div>
    );
  }

  if (isError) {
    throw error;
  }

  const userCart = cart?.cart_items || [];
  let totalCartSum = calculateCartPrice(userCart).toString();
  return (
    <>
      <h1 className="text-2xl md:ml-0 md:text-3xl font-bold my-2">
        {user?.username}&apos;s Cart
      </h1>
      {userCart.length === 0 ? (
        <div className="flex justify-center items-center h-[500px] flex-col">
          <Image
            src={NotFoundSVG}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "30%" }}
            alt="404"
            priority
          />
          <div className="text-xl text-center">Cart is empty</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10 md:gap-10 lg:gap-20">
          {/* left section */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-3">
              {userCart.map((item) => (
                <CartItem
                  onUpdateQuantity={updateQuantityHandler}
                  onRemoveCartItem={removeCartItemHandler}
                  key={item.cart_item_id}
                  image_url={item.product.image_url}
                  product_id={item.product_id}
                  quantity={item.quantity}
                  title={item.product.name}
                  unit_amount={item.product.price}
                  total_amount={item.total_amount}
                  cart_id={item.cart_id}
                  cart_item_id={item.cart_item_id}
                />
              ))}
            </div>
          </div>
          {/* right section */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Coupons</h2>
              <CouponInput />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Price Details</h2>
              <OrderSummary
                totalAmount={totalCartSum}
                quantity={userCart.length}
              />
            </div>
            <Button
              as={Link}
              href="/checkout"
              color="primary"
              className="mt-3"
              variant="shadow"
              size="lg"
              fullWidth
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default CartDetail;
