"use client";

import { getCartItems } from "@/actions/getCartItems";
import useUpdateQuantity from "@/hooks/useUpdateQty";
import { calculateCartPrice } from "@/utils/cartPrice";
import { Button, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CartItem from "./CartItem";
import CouponInput from "./Coupon";
import OrderSummary from "./Summary";
import useGetUser from "@/hooks/useGetUser";
import useRemoveCartItem from "@/hooks/useDeleteCartItem";

const CartDetail = () => {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });
  const { mutate: updateQuantityHandler } = useUpdateQuantity();
  const { mutate: removeCartItemHandler } = useRemoveCartItem();

  if (isLoading || isUserLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-[500px] ">
          <Spinner color="primary" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {JSON.stringify(isError)}</div>;
  }

  const cartItems = data?.cart[0]?.cart_items || [];
  let totalCartSum = calculateCartPrice(cartItems);
  return (
    <>
      <h1 className="text-2xl ml-2 md:ml-0 md:text-3xl font-bold my-2">
        {user?.username}&apos;s Cart
      </h1>
      {data.cart.length === 0 ? (
        <div className="text-xl text-center">Cart is empty</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10 md:gap-10 lg:gap-20">
          {/* left section */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-3">
              {cartItems.map((item) => (
                <CartItem
                  onUpdateQuantity={updateQuantityHandler}
                  onRemoveCartItem={removeCartItemHandler}
                  key={item.cart_item_id}
                  image_url={item.products.image_url}
                  product_id={item.product_id}
                  quantity={item.quantity}
                  title={item.products.name}
                  unit_amount={item.products.price}
                  total_amount={item.total_amount}
                  cart_id={item.cart_id}
                  cart_item_id={item.cart_item_id}
                />
              ))}
            </div>
          </div>
          {/* right section */}
          <div className="space-y-5 p-2">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Coupons</h2>
              <CouponInput />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Price Details</h2>
              <OrderSummary totalAmount={totalCartSum} />
            </div>
            <Button
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
